import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INDEX_BUTTONS_DEV_SITES } from '../../../features/blog/posts/developer/dev-sites/constants/index-buttons.constant';
import { IndexButtonsModel } from '../../models/index-buttons.model';

@Component({
  selector: 'app-index-buttons',
  imports: [CommonModule],
  templateUrl: './index-buttons.component.html',
  styleUrl: './index-buttons.component.css'
})
export class IndexButtonsComponent {

  @Input() categories: IndexButtonsModel[] = INDEX_BUTTONS_DEV_SITES;

  selectedCategory: any = null;
  currentSlideIndex = 0;
  isAnimating = false;

  selectCategory(category: any): void {
    if (this.selectedCategory?.id === category.id) return;

    // Reset index y aplicarle pequeña animación
    this.isAnimating = true;
    setTimeout(() => {
      this.selectedCategory = category;
      this.currentSlideIndex = 0;
      this.isAnimating = false;
    }, 300); // 300ms para que coincida con la transición en CSS
  }

  nextSlide(): void {
    if (!this.selectedCategory) return;
    if (this.currentSlideIndex < this.selectedCategory.resources.length - 1) {
      this.currentSlideIndex++;
    } else {
      this.currentSlideIndex = 0;
    }
  }

  prevSlide(): void {
    if (!this.selectedCategory) return;
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
    } else {
      this.currentSlideIndex = this.selectedCategory.resources.length - 1;
    }
  }

  setSlide(index: number): void {
    this.currentSlideIndex = index;
  }

}
