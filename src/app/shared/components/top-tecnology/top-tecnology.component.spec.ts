import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTecnologyComponent } from './top-tecnology.component';

describe('TopTecnologyComponent', () => {
  let component: TopTecnologyComponent;
  let fixture: ComponentFixture<TopTecnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTecnologyComponent]
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
