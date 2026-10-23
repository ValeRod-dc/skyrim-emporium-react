# Proyecto de Fullstack EA2 con React js
Realizado por:
- Arturo Ayala
- Valeria Rodríguez
- Cristóbal Zúñiga

# Estructura final

# Accesos de demostración

- Administrador: `vale.rodrigueza@duoc.cl` / `1234567`
- Vendedor: `vendedor@duoc.cl` / `123456`
- Cliente: `ejemplo@gmail.com` / `123456`

Para finalizar una compra es necesario iniciar sesión. Puedes agregar productos a la bolsa antes de entrar; la bolsa se conserva al iniciar sesión.

El panel restringe las vistas según el tipo de usuario. Como este proyecto es una demostración frontend, las cuentas y la sesión se guardan en el navegador; no se deben usar estas credenciales ni este mecanismo en producción.

## Módulos administrativos

El administrador puede gestionar productos, categorías, usuarios, órdenes y boletas; revisar stock crítico y reportes; y actualizar su perfil. El vendedor tiene acceso limitado a productos y órdenes. Los cambios administrativos se conservan en el almacenamiento local del navegador.

Las cuentas de demostración y los cambios guardados localmente son solo para pruebas; no reemplazan una API ni una base de datos.

```text
skyrim-emporium-react/
├── public/
│   └── assets/img/...
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   │   ├── inventario.js
│   │   ├── usuarios.js
│   │   └── regiones.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useCart.js
│   ├── utils/
│   │   ├── validaciones.js
│   │   └── formatos.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── cart/
│   │   │   ├── CartDrawer.jsx
│   │   │   └── CartIcon.jsx
│   │   ├── catalog/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductModal.jsx
│   │   │   ├── CatalogoGrid.jsx
│   │   │   └── CatalogoFilters.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       └── FormField.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── GremioPage.jsx
│   │   ├── ProductoDetallePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegistroPage.jsx
│   │   ├── NosotrosPage.jsx
│   │   ├── BlogsPage.jsx
│   │   ├── ContactoPage.jsx
│   │   └── admin/
│   │       ├── AdminLayout.jsx
│   │       ├── AdminHomePage.jsx
│   │       ├── ProductosAdminPage.jsx
│   │       ├── UsuariosAdminPage.jsx
│   │       ├── OrdenesAdminPage.jsx
│   │       └── NuevoProductoPage.jsx
│   └── tests/
│       ├── setup.js
│       ├── ProductCard.test.jsx
│       ├── Button.test.jsx
│       ├── CartContext.test.jsx
│       ├── Navbar.test.jsx
│       └── LoginPage.test.jsx
├── karma.conf.js
├── webpack.test.config.js
├── .babelrc
└── package.json
```
