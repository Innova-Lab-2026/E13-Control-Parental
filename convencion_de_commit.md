## 📌 Convenciones de Commits

Este proyecto utiliza [Conventional Commits](https://www.conventionalcommits.org/). El formato estándar para los mensajes de commit es el siguiente:

`<tipo>: <descripción breve>`

A continuación se detallan los tipos permitidos:

| Tipo | Descripción | Ejemplo |
| :--- | :--- | :--- |
| **`feat`** | Una nueva característica para el usuario. | `feat: agrega autenticación con Google` |
| **`fix`** | Arregla un bug que afecta al usuario. | `fix: corrige el error de validación en el formulario` |
| **`perf`** | Cambios que mejoran el rendimiento del sitio. | `perf: optimiza la carga de imágenes en la galería` |
| **`build`** | Cambios en el sistema de build, tareas de despliegue o instalación. | `build: actualiza las dependencias de producción` |
| **`ci`** | Cambios en la integración continua. | `ci: añade pipeline de GitHub Actions para tests` |
| **`docs`** | Cambios en la documentación (README, guías, etc.). | `docs: actualiza la guía de instalación` |
| **`refactor`** | Refactorización del código (no añade características ni corrige bugs). | `refactor: simplifica la lógica del hook de autenticación` |
| **`style`** | Cambios de formato, tabulaciones, espacios o puntos y coma (no afectan la lógica). | `style: formatea el código con Prettier` |
| **`test`** | Añade tests nuevos o corrige los existentes. | `test: añade pruebas unitarias para el carrito de compras` |