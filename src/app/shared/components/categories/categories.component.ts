import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIES } from './constants/categories.constant';
import { CategoriesPageModel } from '../../models/categories-page.model';

@Component({
	selector: 'app-categories',
	imports: [RouterLink],
	templateUrl: './categories.component.html',
	styleUrl: './categories.component.css'
})
export class CategoriesComponent {
	public categories = CATEGORIES;

	get chunkedCategories(): CategoriesPageModel[][] {
		const active = this.categories.filter(c => c.state === 'active');
		const result: CategoriesPageModel[][] = [];
		for (let i = 0; i < active.length; i += 4) {
			result.push(active.slice(i, i + 4));
		}
		return result;
	}
}
