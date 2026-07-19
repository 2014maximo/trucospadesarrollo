import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { IndexButtonsComponent } from './index-buttons.component';

describe('IndexButtonsComponent', () => {
  let component: IndexButtonsComponent;
  let fixture: ComponentFixture<IndexButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexButtonsComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
