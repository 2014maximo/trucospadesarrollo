import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { TopTecnologyComponent } from './top-tecnology.component';

describe('TopTecnologyComponent', () => {
  let component: TopTecnologyComponent;
  let fixture: ComponentFixture<TopTecnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTecnologyComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTecnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
