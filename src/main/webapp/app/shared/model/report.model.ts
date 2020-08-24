import { Moment } from 'moment';
import { IRecipient } from 'app/shared/model/recipient.model';
import { OccurenceMode } from 'app/shared/model/enumerations/occurence-mode.model';

export interface IReport {
  id?: string;
  name?: string;
  occurenceMode?: OccurenceMode;
  oneOffSchedule?: Moment;
  timeFromSchedule?: Moment;
  timeToSchedule?: Moment;
  timeNextSchedule?: Moment;
  documentContentType?: string;
  document?: any;
  description?: string;
  recipients?: IRecipient[];
}

export class Report implements IReport {
  constructor(
    public id?: string,
    public name?: string,
    public occurenceMode?: OccurenceMode,
    public oneOffSchedule?: Moment,
    public timeFromSchedule?: Moment,
    public timeToSchedule?: Moment,
    public timeNextSchedule?: Moment,
    public documentContentType?: string,
    public document?: any,
    public description?: string,
    public recipients?: IRecipient[]
  ) {}
}
