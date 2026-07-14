# Configurar el backend del formulario de contacto (WordPress)

El formulario reutilizable de Angular (`app-contact-form`, usado en `footer-home` y en
`about/contact-me`) hace `POST` a:

- Dev: `/wp-json/trucos/v1/contact` (vía proxy de Angular, ver `proxy.conf.json`)
- Producción: `https://api.trucospadesarrollo.com/wp-json/trucos/v1/contact`

Ese endpoint **no existe todavía en tu WordPress** — hay que agregarlo. El código ya
está listo en [`wordpress-contact-form-endpoint.php`](./wordpress-contact-form-endpoint.php).

## 1. Instalar el endpoint

1. Copia `wordpress-contact-form-endpoint.php` a `wp-content/mu-plugins/trucos-contact-form.php`
   en tu hosting (crea la carpeta `mu-plugins` si no existe; los archivos ahí se activan
   automáticamente, sin pasar por "Plugins" en el admin).
2. Si tu correo real es distinto al que usamos (`alexmunoz@trucospadesarrollo.com`),
   edita la constante `TRUCOS_CONTACT_DEST_EMAIL` al inicio del archivo.
3. Si el dominio de Vercel cambia o usas un dominio de preview distinto, agrega esa URL
   a `TRUCOS_CONTACT_ALLOWED_ORIGINS` (si no, el navegador bloqueará la petición por CORS).

## 2. Asegurar que el correo se entregue (importante)

Dijiste que no has probado si `wp_mail()` funciona en tu hosting. Es el punto que más
frecuentemente falla: muchos hostings compartidos bloquean o marcan como spam los
correos enviados con la función `mail()` nativa de PHP, que es lo que usa `wp_mail()`
por defecto.

Recomendación: instala el plugin **WP Mail SMTP** (por Awesome Motive) y configúralo con
un proveedor real:

- **Gmail/Google Workspace SMTP** (rápido si ya tienes una cuenta de Google) — requiere
  crear una "contraseña de aplicación" en tu cuenta de Google.
- **SendGrid / Mailgun / Brevo** (tienen niveles gratuitos, pensados para envío
  transaccional) — más confiable a largo plazo que Gmail SMTP.

Sin esto, es probable que `wp_mail()` falle silenciosamente o que el correo llegue a spam.
El endpoint ya está preparado para ese caso: si `wp_mail()` devuelve `false`, el mensaje
igual queda guardado en la base de datos (verás la respuesta
`"Mensaje guardado, pero el correo no pudo enviarse."`), así que no se pierde información
aunque el correo falle.

## 3. Dónde ver los mensajes guardados

Cada envío se guarda como un Custom Post Type privado. Aparecerá en el menú lateral de
wp-admin como **"Contacto (web)"**. No es público ni se expone por la REST API general,
solo lo ves tú como administrador.

## 4. Verificar que funciona

Una vez subido el archivo:

```bash
curl -X POST https://api.trucospadesarrollo.com/wp-json/trucos/v1/contact \
  -H "Content-Type: application/json" \
  -d '{"email":"prueba@example.com","comentarios":"Mensaje de prueba","website":""}'
```

Deberías recibir `{"success":true}` y ver:
1. Un nuevo mensaje en wp-admin → "Contacto (web)".
2. Un correo en `alexmunoz@trucospadesarrollo.com` (o el que hayas configurado).

Si el `curl` devuelve `404`, el endpoint no se registró (revisa que el archivo esté en
`mu-plugins` y que no tenga errores de sintaxis — un error fatal de PHP puede tumbar el
sitio, así que pruébalo primero en un entorno de staging si tienes uno).

## 5. Anti-spam incluido

El endpoint ya incluye:
- **Honeypot**: un campo oculto (`website`) que el formulario de Angular nunca llena;
  si llega con contenido, se asume que es un bot y se descarta en silencio.
- **Rate limiting**: máximo 5 envíos cada 10 minutos por IP.

No requieren configuración adicional de tu parte.
