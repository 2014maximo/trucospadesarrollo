import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevCategoryHeaderComponent } from './dev-category-header.component';

describe('DevCategoryHeaderComponent', () => {
  let component: DevCategoryHeaderComponent;
  let fixture: ComponentFixture<DevCategoryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevCategoryHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevCategoryHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
