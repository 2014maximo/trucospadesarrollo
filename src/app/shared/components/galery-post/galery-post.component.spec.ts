import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleryPostComponent } from './galery-post.component';

describe('GaleryPostComponent', () => {
  let component: GaleryPostComponent;
  let fixture: ComponentFixture<GaleryPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleryPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleryPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
