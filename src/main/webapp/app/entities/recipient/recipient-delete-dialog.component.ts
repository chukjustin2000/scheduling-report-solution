import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecipient } from 'app/shared/model/recipient.model';
import { RecipientService } from './recipient.service';

@Component({
  templateUrl: './recipient-delete-dialog.component.html'
})
export class RecipientDeleteDialogComponent {
  recipient?: IRecipient;

  constructor(protected recipientService: RecipientService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.recipientService.delete(id).subscribe(() => {
      this.eventManager.broadcast('recipientListModification');
      this.activeModal.close();
    });
  }
}
