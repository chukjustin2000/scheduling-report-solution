import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ReportComponentsPage, ReportDeleteDialog, ReportUpdatePage } from './report.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Report e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let reportComponentsPage: ReportComponentsPage;
  let reportUpdatePage: ReportUpdatePage;
  let reportDeleteDialog: ReportDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Reports', async () => {
    await navBarPage.goToEntity('report');
    reportComponentsPage = new ReportComponentsPage();
    await browser.wait(ec.visibilityOf(reportComponentsPage.title), 5000);
    expect(await reportComponentsPage.getTitle()).to.eq('shedulingSolutionApp.report.home.title');
    await browser.wait(ec.or(ec.visibilityOf(reportComponentsPage.entities), ec.visibilityOf(reportComponentsPage.noResult)), 1000);
  });

  it('should load create Report page', async () => {
    await reportComponentsPage.clickOnCreateButton();
    reportUpdatePage = new ReportUpdatePage();
    expect(await reportUpdatePage.getPageTitle()).to.eq('shedulingSolutionApp.report.home.createOrEditLabel');
    await reportUpdatePage.cancel();
  });

  it('should create and save Reports', async () => {
    const nbButtonsBeforeCreate = await reportComponentsPage.countDeleteButtons();

    await reportComponentsPage.clickOnCreateButton();

    await promise.all([
      reportUpdatePage.setNameInput('name'),
      reportUpdatePage.occurenceModeSelectLastOption(),
      reportUpdatePage.setOneOffScheduleInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      reportUpdatePage.setTimeFromScheduleInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      reportUpdatePage.setTimeToScheduleInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      reportUpdatePage.setTimeNextScheduleInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      reportUpdatePage.setDocumentInput(absolutePath),
      reportUpdatePage.setDescriptionInput('description')
    ]);

    expect(await reportUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await reportUpdatePage.getOneOffScheduleInput()).to.contain(
      '2001-01-01T02:30',
      'Expected oneOffSchedule value to be equals to 2000-12-31'
    );
    expect(await reportUpdatePage.getTimeFromScheduleInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timeFromSchedule value to be equals to 2000-12-31'
    );
    expect(await reportUpdatePage.getTimeToScheduleInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timeToSchedule value to be equals to 2000-12-31'
    );
    expect(await reportUpdatePage.getTimeNextScheduleInput()).to.contain(
      '2001-01-01T02:30',
      'Expected timeNextSchedule value to be equals to 2000-12-31'
    );
    expect(await reportUpdatePage.getDocumentInput()).to.endsWith(
      fileNameToUpload,
      'Expected Document value to be end with ' + fileNameToUpload
    );
    expect(await reportUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');

    await reportUpdatePage.save();
    expect(await reportUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await reportComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Report', async () => {
    const nbButtonsBeforeDelete = await reportComponentsPage.countDeleteButtons();
    await reportComponentsPage.clickOnLastDeleteButton();

    reportDeleteDialog = new ReportDeleteDialog();
    expect(await reportDeleteDialog.getDialogTitle()).to.eq('shedulingSolutionApp.report.delete.question');
    await reportDeleteDialog.clickOnConfirmButton();

    expect(await reportComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
