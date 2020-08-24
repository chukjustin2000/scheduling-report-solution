import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IReport } from 'app/shared/model/report.model';

type EntityResponseType = HttpResponse<IReport>;
type EntityArrayResponseType = HttpResponse<IReport[]>;

@Injectable({ providedIn: 'root' })
export class ReportService {
  public resourceUrl = SERVER_API_URL + 'api/reports';

  constructor(protected http: HttpClient) {}

  create(report: IReport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(report);
    return this.http
      .post<IReport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(report: IReport): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(report);
    return this.http
      .put<IReport>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IReport>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IReport[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(report: IReport): IReport {
    const copy: IReport = Object.assign({}, report, {
      oneOffSchedule: report.oneOffSchedule && report.oneOffSchedule.isValid() ? report.oneOffSchedule.toJSON() : undefined,
      timeFromSchedule: report.timeFromSchedule && report.timeFromSchedule.isValid() ? report.timeFromSchedule.toJSON() : undefined,
      timeToSchedule: report.timeToSchedule && report.timeToSchedule.isValid() ? report.timeToSchedule.toJSON() : undefined,
      timeNextSchedule: report.timeNextSchedule && report.timeNextSchedule.isValid() ? report.timeNextSchedule.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.oneOffSchedule = res.body.oneOffSchedule ? moment(res.body.oneOffSchedule) : undefined;
      res.body.timeFromSchedule = res.body.timeFromSchedule ? moment(res.body.timeFromSchedule) : undefined;
      res.body.timeToSchedule = res.body.timeToSchedule ? moment(res.body.timeToSchedule) : undefined;
      res.body.timeNextSchedule = res.body.timeNextSchedule ? moment(res.body.timeNextSchedule) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((report: IReport) => {
        report.oneOffSchedule = report.oneOffSchedule ? moment(report.oneOffSchedule) : undefined;
        report.timeFromSchedule = report.timeFromSchedule ? moment(report.timeFromSchedule) : undefined;
        report.timeToSchedule = report.timeToSchedule ? moment(report.timeToSchedule) : undefined;
        report.timeNextSchedule = report.timeNextSchedule ? moment(report.timeNextSchedule) : undefined;
      });
    }
    return res;
  }
}
