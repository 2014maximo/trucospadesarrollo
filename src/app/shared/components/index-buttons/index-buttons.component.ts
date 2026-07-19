import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { INDEX_BUTTONS_DEV_SITES } from '../../../features/blog/posts/developer/dev-sites/constants/index-buttons.constant';
import { IndexButtonsModel } from '../../models/index-buttons.model';
import { ContentIndexComponent } from '../content-index/content-index.component';
import { IndiceDeContenidosModel } from '../../models/indice.model';

@Component({
  selector: 'app-index-buttons',
  imports: [CommonModule, ContentIndexComponent],
  templateUrl: './index-buttons.component.html',
  styleUrl: './index-buttons.component.css'
})
export class IndexButtonsComponent {

  @Input() categories: IndexButtonsModel[] = INDEX_BUTTONS_DEV_SITES;

  selectedCategory: any = null;
  currentSlideIndex = 0;
  isAnimating = false;

  get indiceItems(): IndiceDeContenidosModel[] {
    return this.categories.map(cat => {
      const item = new IndiceDeContenidosModel();
      item.nombre = cat.name;
      item.colorFondo = cat.individualStyle.backgroundColor;
      item.color = cat.individualStyle.textColor;
      item.estado = 'activo';
      item.rutaInterna = cat.id;
      return item;
    });
  }

  selectCategory(category: any): void {
    if (this.selectedCategory?.id === category.id) return;

    this.isAnimating = true;
    setTimeout(() => {
      this.selectedCategory = category;
      this.currentSlideIndex = 0;
      this.isAnimating = false;
    }, 300);
  }

  onItemSelected(indice: IndiceDeContenidosModel): void {
    const category = this.categories.find(c => c.id === indice.rutaInterna);
    if (category) {
      this.selectCategory(category);
    }
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
