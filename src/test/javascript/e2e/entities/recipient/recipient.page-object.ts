import { element, by, ElementFinder } from 'protractor';

export class RecipientComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-recipient div table .btn-danger'));
  title = element.all(by.css('jhi-recipient div h2#page-heading span')).first();
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

export class RecipientUpdatePage {
  pageTitle = element(by.id('jhi-recipient-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  emailInput = element(by.id('field_email'));
  addressInput = element(by.id('field_address'));
  phoneInput = element(by.id('field_phone'));

  reportSelect = element(by.id('field_report'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setAddressInput(address: string): Promise<void> {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput(): Promise<string> {
    return await this.addressInput.getAttribute('value');
  }

  async setPhoneInput(phone: string): Promise<void> {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput(): Promise<string> {
    return await this.phoneInput.getAttribute('value');
  }

  async reportSelectLastOption(): Promise<void> {
    await this.reportSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async reportSelectOption(option: string): Promise<void> {
    await this.reportSelect.sendKeys(option);
  }

  getReportSelect(): ElementFinder {
    return this.reportSelect;
  }

  async getReportSelectedOption(): Promise<string> {
    return await this.reportSelect.element(by.css('option:checked')).getText();
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

export class RecipientDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-recipient-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-recipient'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
