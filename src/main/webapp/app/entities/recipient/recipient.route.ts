import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRecipient, Recipient } from 'app/shared/model/recipient.model';
import { RecipientService } from './recipient.service';
import { RecipientComponent } from './recipient.component';
import { RecipientDetailComponent } from './recipient-detail.component';
import { RecipientUpdateComponent } from './recipient-update.component';

@Injectable({ providedIn: 'root' })
export class RecipientResolve implements Resolve<IRecipient> {
  constructor(private service: RecipientService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRecipient> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((recipient: HttpResponse<Recipient>) => {
          if (recipient.body) {
            return of(recipient.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Recipient());
  }
}

export const recipientRoute: Routes = [
  {
    path: '',
    component: RecipientComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'shedulingSolutionApp.recipient.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: RecipientDetailComponent,
    resolve: {
      recipient: RecipientResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'shedulingSolutionApp.recipient.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: RecipientUpdateComponent,
    resolve: {
      recipient: RecipientResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'shedulingSolutionApp.recipient.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: RecipientUpdateComponent,
    resolve: {
      recipient: RecipientResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'shedulingSolutionApp.recipient.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
