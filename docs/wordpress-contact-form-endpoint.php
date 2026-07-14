<?php
/**
 * Plugin Name: Trucos Contact Form Endpoint
 * Description: Endpoint REST para el formulario de contacto del sitio Angular (footer-home y about/contact-me). Guarda cada mensaje como un Custom Post Type ("Mensajes de contacto" en wp-admin) y envía una notificación por correo con wp_mail().
 * Version: 1.0.0
 *
 * INSTALACIÓN
 * -----------
 * Sube este archivo tal cual a wp-content/mu-plugins/trucos-contact-form.php
 * (las carpetas "mu-plugins" se activan solas, sin pasar por el listado de plugins).
 * Si tu instalación no tiene esa carpeta, créala junto a wp-content/plugins.
 *
 * Alternativa: pégalo al final del functions.php de tu theme (funciona igual,
 * pero mu-plugins es más robusto porque no depende de qué theme esté activo).
 *
 * Ver docs/wordpress-contact-form-setup.md para más contexto y pasos de verificación.
 */

if (!defined('ABSPATH')) {
    exit;
}

define('TRUCOS_CONTACT_DEST_EMAIL', 'alexmunoz@trucospadesarrollo.com');

define('TRUCOS_CONTACT_ALLOWED_ORIGINS', [
    'https://www.trucospadesarrollo.com',
    'https://trucospadesarrollo.com',
    'http://localhost:4200',
    'http://localhost:4300',
]);

/**
 * 1. Custom Post Type para guardar los mensajes.
 * No es público ni se expone por REST: solo sirve para verlos en wp-admin.
 */
add_action('init', function () {
    register_post_type('trucos_contact', [
        'label' => 'Mensajes de contacto',
        'labels' => [
            'name' => 'Mensajes de contacto',
            'singular_name' => 'Mensaje de contacto',
            'menu_name' => 'Contacto (web)',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-email-alt',
        'supports' => ['title', 'editor'],
        'capability_type' => 'post',
        'show_in_rest' => false,
    ]);
});

/**
 * 2. CORS acotado SOLO a esta ruta (no se toca el resto de la REST API de WordPress).
 */
add_action('rest_api_init', function () {
    add_filter('rest_pre_serve_request', function ($value, $result, $request) {
        if (strpos($request->get_route(), '/trucos/v1/contact') === 0) {
            trucos_contact_send_cors_headers();
        }
        return $value;
    }, 10, 3);
});

function trucos_contact_send_cors_headers(): void {
    $origin = get_http_origin();
    if ($origin && in_array($origin, TRUCOS_CONTACT_ALLOWED_ORIGINS, true)) {
        header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        header('Vary: Origin');
    }
}

// Preflight (OPTIONS) antes de que WordPress procese la ruta.
add_action('init', function () {
    $uri = $_SERVER['REQUEST_URI'] ?? '';
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS' && strpos($uri, '/wp-json/trucos/v1/contact') !== false) {
        trucos_contact_send_cors_headers();
        status_header(200);
        exit;
    }
});

/**
 * 3. Ruta REST pública: POST /wp-json/trucos/v1/contact
 */
add_action('rest_api_init', function () {
    register_rest_route('trucos/v1', '/contact', [
        'methods' => 'POST',
        'callback' => 'trucos_handle_contact_submission',
        'permission_callback' => '__return_true',
        'args' => [
            'email' => ['required' => true],
            'comentarios' => ['required' => true],
            'website' => ['required' => false],
        ],
    ]);
});

function trucos_handle_contact_submission(WP_REST_Request $request) {
    // Honeypot anti-spam: un humano nunca completa este campo (está oculto en el CSS).
    // Si viene relleno, es un bot: respondemos "éxito" falso sin guardar ni enviar nada.
    $honeypot = trim((string) $request->get_param('website'));
    if ($honeypot !== '') {
        return new WP_REST_Response(['success' => true], 200);
    }

    // Rate limiting básico por IP: máximo 5 envíos cada 10 minutos.
    $ip = trucos_contact_get_client_ip();
    $rate_key = 'trucos_contact_rl_' . md5($ip);
    $count = (int) get_transient($rate_key);
    if ($count >= 5) {
        return new WP_REST_Response(
            ['success' => false, 'message' => 'Demasiados intentos. Intenta de nuevo más tarde.'],
            429
        );
    }
    set_transient($rate_key, $count + 1, 10 * MINUTE_IN_SECONDS);

    $email = sanitize_email((string) $request->get_param('email'));
    $comentarios = sanitize_textarea_field((string) $request->get_param('comentarios'));

    if (!is_email($email) || mb_strlen($comentarios) < 5) {
        return new WP_REST_Response(['success' => false, 'message' => 'Datos inválidos.'], 400);
    }

    // Guardar en la base de datos de WordPress (visible en wp-admin > Contacto (web)).
    $post_id = wp_insert_post([
        'post_type' => 'trucos_contact',
        'post_title' => sprintf('%s — %s', $email, current_time('mysql')),
        'post_content' => $comentarios,
        'post_status' => 'private',
    ], true);

    if (is_wp_error($post_id)) {
        return new WP_REST_Response(['success' => false, 'message' => 'No se pudo guardar el mensaje.'], 500);
    }

    update_post_meta($post_id, 'trucos_contact_email', $email);
    update_post_meta($post_id, 'trucos_contact_ip', $ip);

    // Enviar la notificación por correo. El "Reply-To" apunta al visitante,
    // así que responder el correo le llega directo a él.
    $subject = 'Nuevo mensaje de contacto — trucospadesarrollo.com';
    $body = "Has recibido un nuevo mensaje desde el formulario de contacto:\n\n"
        . "Email: {$email}\n\n"
        . "Mensaje:\n{$comentarios}\n";
    $headers = [
        'Content-Type: text/plain; charset=UTF-8',
        'Reply-To: ' . $email,
    ];

    $sent = wp_mail(TRUCOS_CONTACT_DEST_EMAIL, $subject, $body, $headers);

    if (!$sent) {
        // El mensaje ya quedó guardado aunque el correo falle: no se pierde información.
        return new WP_REST_Response(
            ['success' => true, 'message' => 'Mensaje guardado, pero el correo no pudo enviarse.'],
            200
        );
    }

    return new WP_REST_Response(['success' => true], 200);
}

function trucos_contact_get_client_ip(): string {
    foreach (['HTTP_X_FORWARDED_FOR', 'HTTP_CLIENT_IP', 'REMOTE_ADDR'] as $key) {
        if (!empty($_SERVER[$key])) {
            $parts = explode(',', $_SERVER[$key]);
            return trim($parts[0]);
        }
    }
    return '0.0.0.0';
}
