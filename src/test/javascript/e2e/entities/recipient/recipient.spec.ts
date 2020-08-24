import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RecipientComponentsPage, RecipientDeleteDialog, RecipientUpdatePage } from './recipient.page-object';

const expect = chai.expect;

describe('Recipient e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let recipientComponentsPage: RecipientComponentsPage;
  let recipientUpdatePage: RecipientUpdatePage;
  let recipientDeleteDialog: RecipientDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Recipients', async () => {
    await navBarPage.goToEntity('recipient');
    recipientComponentsPage = new RecipientComponentsPage();
    await browser.wait(ec.visibilityOf(recipientComponentsPage.title), 5000);
    expect(await recipientComponentsPage.getTitle()).to.eq('shedulingSolutionApp.recipient.home.title');
    await browser.wait(ec.or(ec.visibilityOf(recipientComponentsPage.entities), ec.visibilityOf(recipientComponentsPage.noResult)), 1000);
  });

  it('should load create Recipient page', async () => {
    await recipientComponentsPage.clickOnCreateButton();
    recipientUpdatePage = new RecipientUpdatePage();
    expect(await recipientUpdatePage.getPageTitle()).to.eq('shedulingSolutionApp.recipient.home.createOrEditLabel');
    await recipientUpdatePage.cancel();
  });

  it('should create and save Recipients', async () => {
    const nbButtonsBeforeCreate = await recipientComponentsPage.countDeleteButtons();

    await recipientComponentsPage.clickOnCreateButton();

    await promise.all([
      recipientUpdatePage.setNameInput('name'),
      recipientUpdatePage.setEmailInput('email'),
      recipientUpdatePage.setAddressInput('address'),
      recipientUpdatePage.setPhoneInput('phone'),
      recipientUpdatePage.reportSelectLastOption()
    ]);

    expect(await recipientUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await recipientUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await recipientUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await recipientUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');

    await recipientUpdatePage.save();
    expect(await recipientUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await recipientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Recipient', async () => {
    const nbButtonsBeforeDelete = await recipientComponentsPage.countDeleteButtons();
    await recipientComponentsPage.clickOnLastDeleteButton();

    recipientDeleteDialog = new RecipientDeleteDialog();
    expect(await recipientDeleteDialog.getDialogTitle()).to.eq('shedulingSolutionApp.recipient.delete.question');
    await recipientDeleteDialog.clickOnConfirmButton();

    expect(await recipientComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
