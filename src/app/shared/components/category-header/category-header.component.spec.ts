import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { CategoryHeaderComponent } from './category-header.component';

describe('CategoryHeaderComponent', () => {
  let component: CategoryHeaderComponent;
  let fixture: ComponentFixture<CategoryHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryHeaderComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryHeaderComponent);
    component = fixture.componentInstance;
    component.nombreCategoria = 'angular';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
