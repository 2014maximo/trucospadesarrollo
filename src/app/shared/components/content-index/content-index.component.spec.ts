import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentIndexComponent } from './content-index.component';

describe('ContentIndexComponent', () => {
  let component: ContentIndexComponent;
  let fixture: ComponentFixture<ContentIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
