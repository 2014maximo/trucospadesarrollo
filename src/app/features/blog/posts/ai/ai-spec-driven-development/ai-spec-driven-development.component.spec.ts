import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiSpecDrivenDevelopmentComponent } from './ai-spec-driven-development.component';

describe('AiSpecDrivenDevelopmentComponent', () => {
  let component: AiSpecDrivenDevelopmentComponent;
  let fixture: ComponentFixture<AiSpecDrivenDevelopmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiSpecDrivenDevelopmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiSpecDrivenDevelopmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
