# Netflix Style App - Verifarma

Bienvenido a tu app favorita de películas!

Este proyecto es una aplicación web construida con **Vue.js** y **Nuxt** que permite a los usuarios:
- Iniciar sesión.
- Ver una lista de películas disponibles.
- Consultar detalles de cada película.

---

## 🚀 Características
- **Responsive Design**: Inspirado en plataformas como Netflix, Prime Video y, en particular, Mercado Play (de Mercado Libre).
- **Accesibilidad**: Optimizado para usuarios con discapacidades visuales.
- **Consumo de API**: Interacción con la API de OMDb para mostrar datos sobre películas y series, y MockAPI.io para logueo y creación de usuarios.
- **Dockerizado**: Ejecuta la aplicación fácilmente en cualquier entorno.

---

## 🔧 Tecnologías utilizadas
- **Vue.js**: Framework principal para la interfaz de usuario.
- **Nuxt**: Framework basado en Vue.js.
- **Pinia**: Manejo de estados.
- **Quasar**: Estilos y componentes UI.
- **Docker**: Contenedor para facilitar el despliegue.

---

## 📦 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:
- **Node.js** (v18 o superior)
- **Docker** (opcional, si deseas ejecutar la aplicación en un contenedor)

---

## 🚀 Instalación

1. Clona este repositorio:
git clone https://github.com/tu-usuario/tu-repositorio.git
cd tu-repositorio

2. Instala las dependencias:
npm install

3. Ejecuta la app en modo desarrollo:
npm run dev

4. Accede en tu navegador:
http://localhost:3000

## 🐳 Ejecutar con Docker
1. Construir la imagen Docker:
docker build -t netflix-style-app .

2. Ejecutar el contenedor:
docker run -p 3000:3000 netflix-style-app

3. Accede en tu navegador:
http://localhost:3000

---

## 📖 Estructura del proyecto
.
├── components/           # Componentes reutilizables
│   ├── Header.vue        # Barra de navegación principal
│   ├── MovieCard.vue     # Componente para mostrar información básica de una película
│   └── MovieCarousel.vue # Carrusel para mostrar múltiples películas
├── apis/                 # Módulos Typescript que se encargan de manejar solicituds HTPP hacia los servicios
│   ├── authApi.ts        # Lógica para la autenticación y creación de usuarios (MockAPI.io)
│   └── moviesApi.ts      # Lógica para interactuar con la API de OMDb y obtener datos de películas
├── plugins/              # Plugins para extender funcionalidades
│   └── quasar.js         # Configuración de Quasar, incluyendo Quasar Notify
├── pages/                # Vistas principales
│   ├── movies/           # Páginas relacionadas con las películas
│   │   ├── [id].vue      # Página de detalle de una película específica
│   │   └── index.vue     # Página de listado de películas
│   └── index.vue         # Página de inicio de sesión
├── stores/               # Manejo de estado con Pinia
│   ├── OMDbStore.js      # Almacena y gestiona datos relacionados con las películas y la API OMDb
│   └── UsersStore.js     # Maneja datos del usuario y autenticación
├── assets/               # Recursos estáticos y estilos personalizados
│   ├── notfound.jpg      # Imagen mostrada en caso de error o recurso no encontrado
│   └── quasar-variables  # Variables personalizadas de Quasar para temas y estilos
├── Dockerfile            # Configuración para contenedores Docker
└── nuxt.config.js        # Configuración principal de Nuxt

---

👨‍💻 Autor
Hector Mirko Osiska
https://www.linkedin.com/in/osiskamirko/
