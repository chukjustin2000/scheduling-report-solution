import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRecipient } from 'app/shared/model/recipient.model';

type EntityResponseType = HttpResponse<IRecipient>;
type EntityArrayResponseType = HttpResponse<IRecipient[]>;

@Injectable({ providedIn: 'root' })
export class RecipientService {
  public resourceUrl = SERVER_API_URL + 'api/recipients';

  constructor(protected http: HttpClient) {}

  create(recipient: IRecipient): Observable<EntityResponseType> {
    return this.http.post<IRecipient>(this.resourceUrl, recipient, { observe: 'response' });
  }

  update(recipient: IRecipient): Observable<EntityResponseType> {
    return this.http.put<IRecipient>(this.resourceUrl, recipient, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IRecipient>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecipient[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
