import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAdapterComponent } from './image-adapter.component';

describe('ImageAdapterComponent', () => {
  let component: ImageAdapterComponent;
  let fixture: ComponentFixture<ImageAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageAdapterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
