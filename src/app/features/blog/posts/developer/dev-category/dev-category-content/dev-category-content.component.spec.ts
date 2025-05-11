import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevCategoryContentComponent } from './dev-category-content.component';

describe('DevCategoryContentComponent', () => {
  let component: DevCategoryContentComponent;
  let fixture: ComponentFixture<DevCategoryContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevCategoryContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevCategoryContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
