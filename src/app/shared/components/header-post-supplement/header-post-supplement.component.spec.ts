import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPostSupplementComponent } from './header-post-supplement.component';

describe('HeaderPostSupplementComponent', () => {
  let component: HeaderPostSupplementComponent;
  let fixture: ComponentFixture<HeaderPostSupplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderPostSupplementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPostSupplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
