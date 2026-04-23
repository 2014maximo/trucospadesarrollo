import { TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FallbackTranslatePipe } from './fallback-translate.pipe';

describe('FallbackTranslatePipe', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    }).compileComponents();
  });

  it('create an instance', () => {
    const translate = TestBed.inject(TranslateService);
    const pipe = new FallbackTranslatePipe(translate);
    expect(pipe).toBeTruthy();
  });
});
