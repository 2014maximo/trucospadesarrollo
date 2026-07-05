import { resolverIconoCategoria } from './categories.helper';
import { CATEGORIES } from './constants/categories.constant';
import { CategoriesPageModel } from '../../models/categories-page.model';

describe('resolverIconoCategoria', () => {

  it('devuelve cadena vacía si no hay categoría', () => {
    expect(resolverIconoCategoria('', 'dark')).toBe('');
    expect(resolverIconoCategoria('   ', 'dark')).toBe('');
  });

  it('en modo dark devuelve iconLight (ícono claro sobre fondo oscuro)', () => {
    const ruta = resolverIconoCategoria('ai', 'dark');
    expect(ruta).toBe('assets/img/categorias/ia-white.png');
  });

  it('en modo light devuelve iconDark (ícono oscuro sobre fondo claro)', () => {
    const ruta = resolverIconoCategoria('ai', 'light');
    expect(ruta).toBe('assets/img/categorias/ia-dark.png');
  });

  it('es insensible a mayúsculas/minúsculas', () => {
    expect(resolverIconoCategoria('AI', 'dark')).toBe('assets/img/categorias/ia-white.png');
    expect(resolverIconoCategoria('Angular', 'light')).toBe('assets/img/categorias/angular.png');
  });

  it('para categorías con un solo PNG devuelve el mismo recurso en ambos modos', () => {
    expect(resolverIconoCategoria('android', 'dark')).toBe('assets/img/categorias/android.png');
    expect(resolverIconoCategoria('android', 'light')).toBe('assets/img/categorias/android.png');
  });

  it('usa fallback por convención si la categoría no está en la constante', () => {
    expect(resolverIconoCategoria('desconocida', 'dark'))
      .toBe('assets/img/categorias/desconocida-white.png');
    expect(resolverIconoCategoria('desconocida', 'light'))
      .toBe('assets/img/categorias/desconocida-dark.png');
  });

  it('acepta una lista de categorías personalizada', () => {
    const custom: CategoriesPageModel[] = [
      Object.assign(new CategoriesPageModel(), {
        iconDark: 'assets/dark.png',
        iconLight: 'assets/light.png',
        nameCategorie: 'custom',
        state: 'active',
        linkCategory: '/blog/custom'
      } as Partial<CategoriesPageModel> as CategoriesPageModel)
    ];
    expect(resolverIconoCategoria('custom', 'dark', custom)).toBe('assets/light.png');
    expect(resolverIconoCategoria('custom', 'light', custom)).toBe('assets/dark.png');
  });

  it('cubre todas las categorías de CATEGORIES sin ruta vacía', () => {
    for (const cat of CATEGORIES) {
      const dark = resolverIconoCategoria(cat.nameCategorie, 'dark');
      const light = resolverIconoCategoria(cat.nameCategorie, 'light');
      expect(dark).toBeTruthy();
      expect(light).toBeTruthy();
    }
  });
});