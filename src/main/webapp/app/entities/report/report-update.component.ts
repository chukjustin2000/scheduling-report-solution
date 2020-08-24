import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IReport, Report } from 'app/shared/model/report.model';
import { ReportService } from './report.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-report-update',
  templateUrl: './report-update.component.html'
})
export class ReportUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    occurenceMode: [],
    oneOffSchedule: [],
    timeFromSchedule: [],
    timeToSchedule: [],
    timeNextSchedule: [],
    document: [null, []],
    documentContentType: [],
    description: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected reportService: ReportService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ report }) => {
      if (!report.id) {
        const today = moment().startOf('day');
        report.oneOffSchedule = today;
        report.timeFromSchedule = today;
        report.timeToSchedule = today;
        report.timeNextSchedule = today;
      }

      this.updateForm(report);
    });
  }

  updateForm(report: IReport): void {
    this.editForm.patchValue({
      id: report.id,
      name: report.name,
      occurenceMode: report.occurenceMode,
      oneOffSchedule: report.oneOffSchedule ? report.oneOffSchedule.format(DATE_TIME_FORMAT) : null,
      timeFromSchedule: report.timeFromSchedule ? report.timeFromSchedule.format(DATE_TIME_FORMAT) : null,
      timeToSchedule: report.timeToSchedule ? report.timeToSchedule.format(DATE_TIME_FORMAT) : null,
      timeNextSchedule: report.timeNextSchedule ? report.timeNextSchedule.format(DATE_TIME_FORMAT) : null,
      document: report.document,
      documentContentType: report.documentContentType,
      description: report.description
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('shedulingSolutionApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const report = this.createFromForm();
    if (report.id !== undefined) {
      this.subscribeToSaveResponse(this.reportService.update(report));
    } else {
      this.subscribeToSaveResponse(this.reportService.create(report));
    }
  }

  private createFromForm(): IReport {
    return {
      ...new Report(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      occurenceMode: this.editForm.get(['occurenceMode'])!.value,
      oneOffSchedule: this.editForm.get(['oneOffSchedule'])!.value
        ? moment(this.editForm.get(['oneOffSchedule'])!.value, DATE_TIME_FORMAT)
        : undefined,
      timeFromSchedule: this.editForm.get(['timeFromSchedule'])!.value
        ? moment(this.editForm.get(['timeFromSchedule'])!.value, DATE_TIME_FORMAT)
        : undefined,
      timeToSchedule: this.editForm.get(['timeToSchedule'])!.value
        ? moment(this.editForm.get(['timeToSchedule'])!.value, DATE_TIME_FORMAT)
        : undefined,
      timeNextSchedule: this.editForm.get(['timeNextSchedule'])!.value
        ? moment(this.editForm.get(['timeNextSchedule'])!.value, DATE_TIME_FORMAT)
        : undefined,
      documentContentType: this.editForm.get(['documentContentType'])!.value,
      document: this.editForm.get(['document'])!.value,
      description: this.editForm.get(['description'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReport>>): void {
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
}
