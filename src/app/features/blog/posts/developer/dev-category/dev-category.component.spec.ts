import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevCategoryComponent } from './dev-category.component';

describe('DevCategoryComponent', () => {
  let component: DevCategoryComponent;
  let fixture: ComponentFixture<DevCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
