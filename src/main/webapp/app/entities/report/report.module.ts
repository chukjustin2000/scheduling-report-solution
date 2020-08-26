import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShedulingSolutionSharedModule } from 'app/shared/shared.module';
import { ReportComponent } from './report.component';
import { ReportDetailComponent } from './report-detail.component';
import { ReportUpdateComponent } from './report-update.component';
import { ReportDeleteDialogComponent } from './report-delete-dialog.component';
import { reportRoute } from './report.route';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [ShedulingSolutionSharedModule, RouterModule.forChild(reportRoute), NgSelectModule],
  declarations: [ReportComponent, ReportDetailComponent, ReportUpdateComponent, ReportDeleteDialogComponent],
  entryComponents: [ReportDeleteDialogComponent]
})
export class ShedulingSolutionReportModule {}
