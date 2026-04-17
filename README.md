# 🚀 FocusFlow

FocusFlow es una aplicación de productividad que unifica tareas, hábitos, modo focus y estadísticas en un solo dashboard.

Desarrollada como parte de una prueba técnica tipo *vibe coding*, usando React, TypeScript y Tailwind CSS con apoyo de herramientas de IA durante todo el proceso.

---

## 🧠 El problema

En el día a día es habitual usar múltiples herramientas separadas para organizarse: una app para tareas, otra para hábitos, otra para temporizadores. Eso fragmenta el flujo de trabajo y hace que pierdas contexto constantemente.

---

## 💡 La solución

FocusFlow centraliza todo en una sola interfaz:

- Gestión de tareas con categorías, favoritos y estados
- Seguimiento de hábitos con sistema de rachas
- Modo Focus tipo Pomodoro
- Dashboard con estadísticas de productividad

---

## ⚙️ Tecnologías

- React + TypeScript
- Vite
- Tailwind CSS
- React Context — estado global
- Lucide React — iconos

---

## 🚀 Cómo ejecutarlo en local

```bash
git clone https://github.com/MariaVictoriaZ/smart-task-prioritizer.git
cd smart-task-manager
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en el navegador.

---

## 📊 Funcionalidades

**Tasks**
- Crear, completar y eliminar tareas
- Marcar como favoritas
- Categorías: Personal, Work, Study

**Habits**
- Crear hábitos y marcarlos como completados cada día
- Sistema de racha (streak) con contador visual

**Focus Mode**
- Temporizador Pomodoro de 25 minutos
- Start, Stop y Reset
- Contador de sesiones completadas conectado al estado global

**Stats**
- Métricas globales de tareas, hábitos y sesiones de focus
- Dashboard con KPIs en tiempo real

---

## 🧩 Prompt Log

### Prompt 1 — Estructura base y AppContext

> "Crea la estructura base de una app React + TypeScript + Vite + Tailwind llamada FocusFlow. Necesito un AppContext con React Context que gestione en un solo estado global: tareas con título, categoría, completada, favorita. Hábitos con nombre y array de fechas completadas, y sesiones modo focus estilo Pomodoro. Dame solo el contexto y el layout base con sidebar, sin lógica todavía."

**Por qué funcionó:** La primera vez que lo intenté sin especificar "sin lógica todavía", la IA generó los componentes con estado local cada uno. Luego las estadísticas no podían leer datos de tareas ni hábitos. Pedir primero solo el contexto global me ahorró rehacer la arquitectura entera a mitad del proyecto.

---

### Prompt 2 — HabitTracker con racha

> "Crea el componente HabitTracker en TypeScript. Cada hábito tiene un array de fechas ISO en las que se completó. Necesito una función que calcule la racha actual. Si hoy no está en el array pero ayer sí, la racha sigue activa. Si hay un hueco de más de un día, se rompe. Usa iconos para darle vida y muestra el número de días."

**Por qué funcionó:** Describir el caso concreto que me fallaba ("si hoy no está pero ayer sí, la racha sigue") fue suficiente para que lo resolviera bien desde el primer intento. Sin ese detalle, generaba una función que parecía correcta pero mostraba racha 0 cada mañana aunque el día anterior estuviera completado.

---

### Prompt 3 — FocusMode con Pomodoro

> "Añade un componente FocusMode con un temporizador Pomodoro de 25 minutos. Start, Stop y Reset. Cuando el temporizador llega a 0, incrementa el contador de focus sessions en el AppContext. Usa useEffect para el intervalo y límpialo correctamente para evitar memory leaks."

**Por qué funcionó:** Sin la frase "límpialo para evitar memory leaks", la primera versión creaba un intervalo nuevo cada vez que pulsabas Start sin borrar el anterior y el timer se aceleraba. También fue clave conectarlo al AppContext desde el prompt: si no, el contador de sesiones vivía en estado local y las estadísticas globales no se enteraban de nada.

---

### Prompt 4 — Rediseño visual tipo SaaS

> "Rediseña el dashboard de FocusFlow para que tenga un estilo mas moderno, cards con borde sutil, los titulos un poco mas grandes y con cards limpias. Usa los colores de la paleta. Usa solo clases de Tailwind. No toques la lógica ni el AppContext, solo el JSX y los nombres de clases. Si ves algo que mejorarías en la lógica, dímelo en un comentario al final pero no lo cambies."

**Por qué funcionó:** La restricción "no toques la lógica, solo JSX y clases" fue lo más importante. Versiones anteriores sin esa frase me rompían funcionalidad mientras aplicaban estilos. El añadido de "si ves mejoras dímelo pero no las apliques" fue un descubrimiento: la IA se quedaba en su carril y además me daba sugerencias útiles para después.

---

## 📌 Reflexión

La IA actuó como copiloto durante todo el proceso: yo definía qué construir y cómo, ella aceleraba la ejecución. Lo más valioso que aprendí fue que la calidad del output depende directamente de la precisión del prompt — cuanto más concreto el problema, mejor la solución.

**Mejoras futuras:**
- Persistencia con localStorage o base de datos
- Gráficas más avanzadas en estadísticas
- Autenticación de usuarios
- Historial completo de hábitos y sesiones
