# Fusionia Gaming Store

Tienda web de componentes y productos para gaming, oficina y uso diario. Permite explorar un catálogo, consultar fichas técnicas y preparar un pedido para enviarlo por WhatsApp.

## Lenguajes y tecnologías

| Tecnología | Uso en el proyecto |
| --- | --- |
| **HTML5** | Estructura de la tienda, fichas de productos mediante elementos `dialog` y páginas de privacidad y términos. |
| **CSS3** | Diseño adaptable a celulares y computadores, Flexbox, Grid, animaciones y estilos de la tienda. |
| **JavaScript nativo (Vanilla JS)** | Catálogo dinámico, filtros por categoría, carrusel, fichas y gestión del carrito. |
| **Web Storage API (`localStorage`)** | Guarda los identificadores y cantidades del carrito en el navegador. |
| **API del DOM y MutationObserver** | Actualiza el contenido de la interfaz y los enlaces del carrusel. |
| **Google Fonts** | Tipografías Space Grotesk y Barlow Condensed. |
| **SVG, PNG, WebP y JPG** | Iconos, fotografías de productos y recortes con fondo transparente. |
| **Enlaces de WhatsApp (`wa.me`)** | Preparan consultas y pedidos con los productos seleccionados. |
| **Git y GitHub** | Control de versiones y almacenamiento del código fuente. |
| **Alojamiento estático** | Publicación de los archivos de `dist`; la configuración de alojamiento está en `.openai/hosting.json`. |

El sitio utiliza HTML, CSS y JavaScript directamente, sin un framework de interfaz ni un proceso de compilación. La versión actual no incluye servidor de aplicación, base de datos, cuentas de clientes ni una pasarela de pagos integrada.

## Funcionalidades

- Catálogo con categorías de tarjetas de video, sillas gamer, procesadores, tarjetas madres y periféricos.
- Carrusel automático con cambios cada tres segundos y controles manuales.
- Fichas con fotografías, características, especificaciones y stock disponible.
- Carrito persistente en el navegador con cantidades, eliminación de productos y total en pesos chilenos.
- Preparación de pedidos y consultas por WhatsApp; el usuario decide si envía el mensaje.
- Diseño adaptable a celulares y computadores, con soporte para preferencias de movimiento reducido.
- Páginas de políticas de privacidad y términos y condiciones.

Los productos identificados como demostración conservan precios referenciales. El stock está definido en el catálogo y no se sincroniza con un sistema de inventario. Agregar al carrito no reserva unidades ni procesa pagos.

## Estructura

```text
.
├── README.md
├── .openai/
│   └── hosting.json          # Configuración de alojamiento estático
└── dist/
    ├── index.html            # Página principal de la tienda
    ├── style.css             # Estilos compartidos y diseño adaptable
    ├── app.js                # Catálogo, imágenes, filtros y carrusel
    ├── product.js            # Fichas de productos y presentación del stock
    ├── cart.js               # Carrito, almacenamiento local y pedido por WhatsApp
    ├── privacidad.html       # Políticas de privacidad
    ├── terminos.html          # Términos y condiciones
    └── assets/               # Imágenes de los productos
```

## Ejecutar en tu equipo

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Falkoncqb/tienda-fusionia.git
   cd tienda-fusionia
   ```

2. Abre `dist/index.html` en un navegador moderno. No es necesario instalar dependencias ni compilar el proyecto.

Para trabajar con un origen local estable y comprobar la persistencia del carrito, también puedes servir `dist` con un servidor HTTP estático. Si tienes Python instalado:

```bash
python -m http.server 8000 --directory dist
```

Luego abre [la tienda local](http://localhost:8000). Python es una herramienta opcional para esta vista previa; no forma parte de la aplicación.

Las tipografías externas y los enlaces a WhatsApp necesitan conexión a Internet. El comportamiento de `localStorage` al abrir archivos directamente puede variar según el navegador; utiliza el servidor local para probar el carrito.

## Actualizar el catálogo

- **Nombre, categoría, precio, descripción y stock:** modifica el arreglo `products` de `dist/app.js`.
- **Fotografía del producto:** agrega el archivo a `dist/assets/` y actualiza su referencia en `dist/app.js` y `dist/product.js`.
- **Ficha técnica y contenido detallado:** edita `dist/product.js`.
- **Diseño, animaciones y versión móvil:** edita `dist/style.css`.
- **Contenido legal:** edita `dist/privacidad.html` y `dist/terminos.html`.

La información y las imágenes se mantienen en archivos del proyecto. Para que una actualización se vea en la tienda publicada, hay que publicar nuevamente los archivos de `dist` en el alojamiento correspondiente.

## Comprobación básica

Con Node.js instalado, puedes revisar la sintaxis de los archivos JavaScript:

```bash
node --check dist/app.js
node --check dist/product.js
node --check dist/cart.js
```

Node.js es opcional para esta comprobación; no es necesario para usar la tienda. Completa la revisión en el navegador verificando el carrusel, los filtros, las fichas, el carrito, los enlaces y la vista celular.

## Contacto

**Fustersoto SPA · Fusionia**

RUT: 78.488.464-3

Correo: [contacto@fusionia.cl](mailto:contacto@fusionia.cl)

WhatsApp: [+56 9 6627 4175](https://wa.me/56966274175)
