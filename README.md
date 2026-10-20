# Proyecto de Fullstack EA2 con React js
Realizado por:
- Arturo Ayala
- Valeria Rodríguez
- Cristóbal Zúñiga

# Estructura final
```
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

