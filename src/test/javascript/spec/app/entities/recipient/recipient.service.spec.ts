import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecipientService } from 'app/entities/recipient/recipient.service';
import { IRecipient, Recipient } from 'app/shared/model/recipient.model';

describe('Service Tests', () => {
  describe('Recipient Service', () => {
    let injector: TestBed;
    let service: RecipientService;
    let httpMock: HttpTestingController;
    let elemDefault: IRecipient;
    let expectedResult: IRecipient | IRecipient[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RecipientService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new Recipient('ID', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('123').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Recipient', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new Recipient()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Recipient', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            email: 'BBBBBB',
            address: 'BBBBBB',
            phone: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Recipient', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            email: 'BBBBBB',
            address: 'BBBBBB',
            phone: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Recipient', () => {
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
