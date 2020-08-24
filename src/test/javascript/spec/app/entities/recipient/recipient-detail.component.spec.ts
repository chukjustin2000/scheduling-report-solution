import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShedulingSolutionTestModule } from '../../../test.module';
import { RecipientDetailComponent } from 'app/entities/recipient/recipient-detail.component';
import { Recipient } from 'app/shared/model/recipient.model';

describe('Component Tests', () => {
  describe('Recipient Management Detail Component', () => {
    let comp: RecipientDetailComponent;
    let fixture: ComponentFixture<RecipientDetailComponent>;
    const route = ({ data: of({ recipient: new Recipient('123') }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ShedulingSolutionTestModule],
        declarations: [RecipientDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RecipientDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecipientDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load recipient on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.recipient).toEqual(jasmine.objectContaining({ id: '123' }));
      });
    });
  });
});
