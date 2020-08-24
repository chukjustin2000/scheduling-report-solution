import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ShedulingSolutionTestModule } from '../../../test.module';
import { RecipientUpdateComponent } from 'app/entities/recipient/recipient-update.component';
import { RecipientService } from 'app/entities/recipient/recipient.service';
import { Recipient } from 'app/shared/model/recipient.model';

describe('Component Tests', () => {
  describe('Recipient Management Update Component', () => {
    let comp: RecipientUpdateComponent;
    let fixture: ComponentFixture<RecipientUpdateComponent>;
    let service: RecipientService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShedulingSolutionTestModule],
        declarations: [RecipientUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RecipientUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecipientUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipientService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Recipient('123');
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Recipient();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
