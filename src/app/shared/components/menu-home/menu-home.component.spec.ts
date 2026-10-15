import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { MenuHomeComponent } from './menu-home.component';

describe('MenuHomeComponent', () => {
  let component: MenuHomeComponent;
  let fixture: ComponentFixture<MenuHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuHomeComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
