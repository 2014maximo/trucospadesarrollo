# Guía paso a paso para crear un post en el blog

---

## 1. Definir el tema del post
Elige el tema principal sobre el que vas a escribir. Teniendo en cuenta SEO, crearle un título ubicable en buscadores.  
**Ejemplo:** "Cómo integrar Firebase Hosting en un proyecto Angular".

## 2. Crear el archivo del post
Crear el componente dentro de la carpeta de la categoría en cuestion  
**Ejemplo:** `ng g c features/blog/posts/developer/nombre-post`


## 4. Agregar referencia en el archivo de ruta para acceder al post en:
`features/blog/developer/developer.routes.ts`
**path: 'extra-money',**
**loadComponent: () => import('./dev-extra-money/dev-extra-money.component')**
**.then(m => m.DevExtraMoneyComponent)**

## 3. Agregar uuid generado de:
https://fusionauth.io/dev-tools/uuid-generator
En el archivo constante de posts:
`features/blog/constants/posts/categoria en cuestión.constant.ts`
- **id: '27df71a4-6654-4349-9481-06f93c3639d6',**

## 4. Agregar nombre del post en los archivos de idiomas:
`assets/i18n/en.json`
`assets/i18n/es.json`
`assets/i18n/fr.json`


## 5. Revisar y guardar
Lee el post para corregir errores y asegurarte de que la información sea clara.

## 6. Publicar el post
Sube el archivo al repositorio y despliega el blog para que el nuevo post esté disponible.

