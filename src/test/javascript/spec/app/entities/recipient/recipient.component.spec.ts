import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { ShedulingSolutionTestModule } from '../../../test.module';
import { RecipientComponent } from 'app/entities/recipient/recipient.component';
import { RecipientService } from 'app/entities/recipient/recipient.service';
import { Recipient } from 'app/shared/model/recipient.model';

describe('Component Tests', () => {
  describe('Recipient Management Component', () => {
    let comp: RecipientComponent;
    let fixture: ComponentFixture<RecipientComponent>;
    let service: RecipientService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShedulingSolutionTestModule],
        declarations: [RecipientComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc'
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc'
                })
              )
            }
          }
        ]
      })
        .overrideTemplate(RecipientComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecipientComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipientService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Recipient('123')],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.recipients && comp.recipients[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Recipient('123')],
            headers
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.recipients && comp.recipients[0]).toEqual(jasmine.objectContaining({ id: '123' }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
