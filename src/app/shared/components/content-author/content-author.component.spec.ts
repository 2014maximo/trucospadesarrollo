import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAuthorComponent } from './content-author.component';

describe('ContentAuthorComponent', () => {
  let component: ContentAuthorComponent;
  let fixture: ComponentFixture<ContentAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
