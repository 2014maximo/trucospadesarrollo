import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevIasComponent } from './dev-ias.component';

describe('DevIasComponent', () => {
  let component: DevIasComponent;
  let fixture: ComponentFixture<DevIasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevIasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevIasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
