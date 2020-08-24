import { IReport } from 'app/shared/model/report.model';

export interface IRecipient {
  id?: string;
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  report?: IReport;
}

export class Recipient implements IRecipient {
  constructor(
    public id?: string,
    public name?: string,
    public email?: string,
    public address?: string,
    public phone?: string,
    public report?: IReport
  ) {}
}
