# Alke-Wallet

Alke Wallet es una aplicación web de billetera digital que simula las funcionalidades bancarias esenciales. Permite a los usuarios visualizar su saldo, realizar depósitos, transferir dinero a contactos y revisar su historial de movimientos.

El proyecto está construido con un enfoque **Mobile First**, utilizando **Bootstrap 4** para la maquetación responsiva y **jQuery** para la lógica del lado del cliente y manipulación del DOM. La persistencia de datos se maneja a través de **LocalStorage**.

## Para ver el código fuente en GITHUB, ingrese aquí ---> https://github.com/victoriamunozrobles-bot/Alke-Wallet.git

## Para ver la página web en GIT PAGES, ingrese aquí ---> https://victoriamunozrobles-bot.github.io/Alke-Wallet/

Debes ingresar un correo electrónico válido y una contraseña cualquiera de ocho dígitos o más.

## 🚀 Tecnologías Utilizadas

- **HTML5:** Estructura semántica.
- **CSS3:** Estilos personalizados y gradientes.
- **Bootstrap 4.6:** Framework para diseño responsivo, sistema de grillas, modales y componentes de UI.
- **JavaScript (ES6):** Lógica de negocio.
- **jQuery 3.6:** Manipulación del DOM, manejo de eventos y selectores simplificados.
- **FontAwesome 5:** Iconografía.
- **LocalStorage:** Almacenamiento de datos en el navegador (saldo, transacciones y contactos).

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura modular separando vistas, estilos y lógica:

```text
alke-wallet/
│
├── index.html              # Pantalla de Inicio de Sesión (Login)
├── styles/
│   └── style.css          # Estilos personalizados (Glassmorphism, colores, etc.)
├── js/
│   ├── login.js            # Lógica de validación de usuario
│   ├── menu.js             # Lógica del dashboard principal
│   ├── deposit.js          # Funcionalidad de depósitos
│   ├── sendmoney.js        # Lógica de transferencias y gestión de contactos
│   └── transactions.js     # Historial de movimientos y filtros
├── pages/
│   ├── menu.html           # Menú Principal (Dashboard)
│   ├── deposit.html        # Pantalla de Depósito
│   ├── sendmoney.html      # Pantalla de Enviar Dinero
│   └── transactions.html   # Pantalla de Movimientos
└── icon-wallet.png         # Favicon
```
