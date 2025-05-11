import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstDescriptionBlockComponent } from './first-description-block.component';

describe('FirstDescriptionBlockComponent', () => {
  let component: FirstDescriptionBlockComponent;
  let fixture: ComponentFixture<FirstDescriptionBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstDescriptionBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirstDescriptionBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
