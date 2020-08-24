import { element, by, ElementFinder } from 'protractor';

export class ReportComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-report div table .btn-danger'));
  title = element.all(by.css('jhi-report div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ReportUpdatePage {
  pageTitle = element(by.id('jhi-report-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  occurenceModeSelect = element(by.id('field_occurenceMode'));
  oneOffScheduleInput = element(by.id('field_oneOffSchedule'));
  timeFromScheduleInput = element(by.id('field_timeFromSchedule'));
  timeToScheduleInput = element(by.id('field_timeToSchedule'));
  timeNextScheduleInput = element(by.id('field_timeNextSchedule'));
  documentInput = element(by.id('file_document'));
  descriptionInput = element(by.id('field_description'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setOccurenceModeSelect(occurenceMode: string): Promise<void> {
    await this.occurenceModeSelect.sendKeys(occurenceMode);
  }

  async getOccurenceModeSelect(): Promise<string> {
    return await this.occurenceModeSelect.element(by.css('option:checked')).getText();
  }

  async occurenceModeSelectLastOption(): Promise<void> {
    await this.occurenceModeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setOneOffScheduleInput(oneOffSchedule: string): Promise<void> {
    await this.oneOffScheduleInput.sendKeys(oneOffSchedule);
  }

  async getOneOffScheduleInput(): Promise<string> {
    return await this.oneOffScheduleInput.getAttribute('value');
  }

  async setTimeFromScheduleInput(timeFromSchedule: string): Promise<void> {
    await this.timeFromScheduleInput.sendKeys(timeFromSchedule);
  }

  async getTimeFromScheduleInput(): Promise<string> {
    return await this.timeFromScheduleInput.getAttribute('value');
  }

  async setTimeToScheduleInput(timeToSchedule: string): Promise<void> {
    await this.timeToScheduleInput.sendKeys(timeToSchedule);
  }

  async getTimeToScheduleInput(): Promise<string> {
    return await this.timeToScheduleInput.getAttribute('value');
  }

  async setTimeNextScheduleInput(timeNextSchedule: string): Promise<void> {
    await this.timeNextScheduleInput.sendKeys(timeNextSchedule);
  }

  async getTimeNextScheduleInput(): Promise<string> {
    return await this.timeNextScheduleInput.getAttribute('value');
  }

  async setDocumentInput(document: string): Promise<void> {
    await this.documentInput.sendKeys(document);
  }

  async getDocumentInput(): Promise<string> {
    return await this.documentInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ReportDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-report-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-report'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
