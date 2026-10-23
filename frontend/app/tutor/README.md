# 📱 Módulo Tutor - BA Protege+

Este directorio contiene la arquitectura, las pantallas y los componentes dedicados al **rol de tutor (adulto responsable)** para la gestión, vinculación y monitoreo de los dispositivos protegidos.

---

## 🗺️ Estructura de Pantallas (`app/tutor/`)

* **`dashboard.tsx`**: Pantalla principal con saludo, métricas consolidadas de bloqueo y accesos directos al flujo de gestión.
* **`devices.tsx`**: Listado de dispositivos vinculados con indicadores de estado (`active` / `pending`) y botón para dar de alta un nuevo dispositivo.
* **`add-device.tsx`**: Formulario de registro de dispositivo protegido. Incluye:
  * Selección de imagen de perfil (preparado para `expo-image-picker`).
  * Asignación de nombre.
  * Selector nativo de **Fecha de nacimiento** con calendario (`DateTimePicker`).
* **`device-success.tsx`**: Pantalla de confirmación tras la creación del perfil. Presenta las instrucciones paso a paso para la instalación en el celular del menor y muestra de forma destacada el **PIN de 4 dígitos**.
* **`device-detail.tsx`**: Vista individual de un dispositivo con resumen de protección activa, métricas (Edad y Webs bloqueadas esta semana) y registro detallado de la actividad reciente.
* **`GreetingHeader.tsx`** (Actualizado): Cabecera de bienvenida optimizada para ser flexible, permitiendo configurar subtítulos personalizados (como "¡Qué bueno tenerte de vuelta!") e indicadores visuales opcionales para utilizar en el Dashboard del tutor.

---

## 🧩 Componentes Utilizados

El módulo hace uso de los componentes del UI Kit localizados en `src/components/`:
* **`AppHeader`**: Cabecera unificada con botón de retorno (`←`).
* **`BottomNavigation`**: Barra de navegación fija con los 4 accesos directos principales (**Home**, **Dispositivos**, **Historial**, **Configuración**).
* **`RestrictionSummaryCard`**: Tarjeta con métricas dinámicas de estado y contadores.
* **`DeviceItem`** / **`AddDeviceButton`**: Elementos de lista y acciones de alta.
* **`AppInput`** / **`AppButton`**: Entradas de formulario y botones de acción.

---

## 📦 Dependencias Específicas del Módulo

* **`@react-native-community/datetimepicker`**: Utilizado en `add-device.tsx` para el selector de fecha nativo en Android e iOS.
* **`(Notas y preparativos)`**: Preparado para utilizar expo-image-picker en la selección de fotos de perfil desde la galería.

---

## 🔌 Puntos de Integración (Backend)

Cada pantalla cuenta con bloques marcados como `TODO BACKEND` que indican dónde realizar las solicitudes HTTP, enviar los datos empaquetados en `FormData` (fechas e imágenes) y sincronizar el historial de eventos en tiempo real.