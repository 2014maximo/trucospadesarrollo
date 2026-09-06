import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { IndexButtonsComponent } from './index-buttons.component';

describe('IndexButtonsComponent', () => {
  let component: IndexButtonsComponent;
  let fixture: ComponentFixture<IndexButtonsComponent>;
  let scrollIntoViewSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexButtonsComponent, TranslateModule.forRoot()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    scrollIntoViewSpy = spyOn(Element.prototype, 'scrollIntoView').and.stub();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to the carousel after selecting a category', fakeAsync(() => {
    const item = component.indiceItems[0];

    component.onItemSelected(item);
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();
    tick();

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
  }));

  it('should not render the category title before selecting a category', () => {
    const title: HTMLElement = fixture.nativeElement.querySelector('.carousel-category-title');

    expect(title).toBeNull();
  });

  it('should render the selected category name above the carousel', fakeAsync(() => {
    const item = component.indiceItems[0];

    component.onItemSelected(item);
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();
    tick();

    const title: HTMLElement = fixture.nativeElement.querySelector('.carousel-category-title');

    expect(title).withContext('the category title should be rendered').toBeTruthy();
    expect(title?.tagName.toLowerCase()).toBe('h3');
    expect(title?.textContent?.trim()).toBe(component.selectedCategory.name);
  }));

  it('should scroll to the carousel when the already active category is pressed', fakeAsync(() => {
    const item = component.indiceItems[0];

    component.onItemSelected(item);
    fixture.detectChanges();
    tick(300);
    fixture.detectChanges();
    tick();
    scrollIntoViewSpy.calls.reset();

    component.onItemSelected(item);
    fixture.detectChanges();

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' });
  }));
});
