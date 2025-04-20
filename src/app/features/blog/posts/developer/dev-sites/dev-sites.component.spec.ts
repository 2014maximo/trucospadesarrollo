import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevSitesComponent } from './dev-sites.component';

describe('DevSitesComponent', () => {
  let component: DevSitesComponent;
  let fixture: ComponentFixture<DevSitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevSitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
