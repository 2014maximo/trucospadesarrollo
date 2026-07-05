import { Theme } from '../../services/theme.service';
import { CategoriesPageModel } from '../../models/categories-page.model';
import { CATEGORIES } from './constants/categories.constant';

/**
 * Resuelve la ruta del ícono de una categoría según el tema activo.
 *
 * - En modo `dark` se usa el ícono claro (`iconLight`) porque los fondos son
 *   oscuros; en modo `light` se usa el ícono oscuro (`iconDark`).
 * - La búsqueda por `nameCategorie` es case-insensitive.
 * - Si la categoría no existe en `categories`, se construye un fallback por
 *   convención de nombre: `assets/img/categorias/${nombre}-${suffix}.png`
 *   (replica el comportamiento histórico de `GaleryPostComponent`).
 */
export function resolverIconoCategoria(
  categoria: string,
  theme: Theme,
  categories: CategoriesPageModel[] = CATEGORIES,
): string {
  const nombreNormalizado = (categoria ?? '').trim().toLowerCase();

  if (!nombreNormalizado) {
    return '';
  }

  const encontrada = categories.find(
    c => c.nameCategorie.toLowerCase() === nombreNormalizado
  );

  if (encontrada) {
    return theme === 'dark' ? encontrada.iconLight : encontrada.iconDark;
  }

  const sufijo = theme === 'dark' ? 'white' : 'dark';
  return `assets/img/categorias/${nombreNormalizado}-${sufijo}.png`;
}