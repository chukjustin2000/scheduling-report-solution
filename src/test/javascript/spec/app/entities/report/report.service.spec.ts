import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ReportService } from 'app/entities/report/report.service';
import { IReport, Report } from 'app/shared/model/report.model';
import { OccurenceMode } from 'app/shared/model/enumerations/occurence-mode.model';

describe('Service Tests', () => {
  describe('Report Service', () => {
    let injector: TestBed;
    let service: ReportService;
    let httpMock: HttpTestingController;
    let elemDefault: IReport;
    let expectedResult: IReport | IReport[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ReportService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Report(
        'ID',
        'AAAAAAA',
        OccurenceMode.ONEOFF,
        currentDate,
        currentDate,
        currentDate,
        currentDate,
        'image/png',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            oneOffSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeFromSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeToSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeNextSchedule: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Report', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            oneOffSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeFromSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeToSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeNextSchedule: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            oneOffSchedule: currentDate,
            timeFromSchedule: currentDate,
            timeToSchedule: currentDate,
            timeNextSchedule: currentDate
          },
          returnedFromService
        );

        service.create(new Report()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Report', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            occurenceMode: 'BBBBBB',
            oneOffSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeFromSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeToSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeNextSchedule: currentDate.format(DATE_TIME_FORMAT),
            document: 'BBBBBB',
            description: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            oneOffSchedule: currentDate,
            timeFromSchedule: currentDate,
            timeToSchedule: currentDate,
            timeNextSchedule: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Report', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            occurenceMode: 'BBBBBB',
            oneOffSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeFromSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeToSchedule: currentDate.format(DATE_TIME_FORMAT),
            timeNextSchedule: currentDate.format(DATE_TIME_FORMAT),
            document: 'BBBBBB',
            description: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            oneOffSchedule: currentDate,
            timeFromSchedule: currentDate,
            timeToSchedule: currentDate,
            timeNextSchedule: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Report', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
