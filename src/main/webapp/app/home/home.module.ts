import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShedulingSolutionSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ShedulingSolutionSharedModule, RouterModule.forChild([HOME_ROUTE]), NgSelectModule, FormsModule],
  declarations: [HomeComponent]
})
export class ShedulingSolutionHomeModule {}
