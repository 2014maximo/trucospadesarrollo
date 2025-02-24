import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgInstalationComponent } from './ng-instalation.component';

describe('NgInstalationComponent', () => {
  let component: NgInstalationComponent;
  let fixture: ComponentFixture<NgInstalationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgInstalationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgInstalationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
