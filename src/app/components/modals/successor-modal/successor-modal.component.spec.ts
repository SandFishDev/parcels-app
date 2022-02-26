import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessorModalComponent } from './successor-modal.component';

describe('SuccessorModalComponent', () => {
  let component: SuccessorModalComponent;
  let fixture: ComponentFixture<SuccessorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
