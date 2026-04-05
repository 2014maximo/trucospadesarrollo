import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTextComponent } from './block-text.component';

describe('BlockTextComponent', () => {
  let component: BlockTextComponent;
  let fixture: ComponentFixture<BlockTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
