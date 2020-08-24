import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.ShedulingSolutionReportModule)
      },
      {
        path: 'recipient',
        loadChildren: () => import('./recipient/recipient.module').then(m => m.ShedulingSolutionRecipientModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ShedulingSolutionEntityModule {}
