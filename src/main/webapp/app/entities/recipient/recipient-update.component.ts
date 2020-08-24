import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRecipient, Recipient } from 'app/shared/model/recipient.model';
import { RecipientService } from './recipient.service';
import { IReport } from 'app/shared/model/report.model';
import { ReportService } from 'app/entities/report/report.service';

@Component({
  selector: 'jhi-recipient-update',
  templateUrl: './recipient-update.component.html'
})
export class RecipientUpdateComponent implements OnInit {
  isSaving = false;
  reports: IReport[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    email: [],
    address: [],
    phone: [],
    report: []
  });

  constructor(
    protected recipientService: RecipientService,
    protected reportService: ReportService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ recipient }) => {
      this.updateForm(recipient);

      this.reportService.query().subscribe((res: HttpResponse<IReport[]>) => (this.reports = res.body || []));
    });
  }

  updateForm(recipient: IRecipient): void {
    this.editForm.patchValue({
      id: recipient.id,
      name: recipient.name,
      email: recipient.email,
      address: recipient.address,
      phone: recipient.phone,
      report: recipient.report
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const recipient = this.createFromForm();
    if (recipient.id !== undefined) {
      this.subscribeToSaveResponse(this.recipientService.update(recipient));
    } else {
      this.subscribeToSaveResponse(this.recipientService.create(recipient));
    }
  }

  private createFromForm(): IRecipient {
    return {
      ...new Recipient(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      email: this.editForm.get(['email'])!.value,
      address: this.editForm.get(['address'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      report: this.editForm.get(['report'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRecipient>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IReport): any {
    return item.id;
  }
}
