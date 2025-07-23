# Task Management Dashboard

## Project Overview
A modern, responsive task management dashboard built with **React 19*, **TypeScript*, and **Vite*. It offers a clean UI, clean drag-and-drop task organization, theme toggling, and intuitive filters for task status (completed, pending, and overdue).

This project is designed for both desktop and mobile usage, using scalable architecture and developer-friendly tools.



## Features

- *Dashboard Overview* – High-level insights at a glance.
- *Task CRUD* – Add, update, and delete tasks with ease.
- *Dark/Light Theme Toggle* – Smooth switch with next-themes.
- *Due Date Picker* – Clean date selection via react-day-picker.
- *Analytics* – Visual summaries using Recharts.
- *Mobile-Responsive Sidebar* – Collapse/expand logic included.
- *Drag & Drop Sorting* – Powered by @dnd-kit.



## Tech Stack & Architectural Decisions

- Frontend: React 19 + TypeScript + Vite

*Chosen for its modern and performant approach to building scalable UIs.*

*React 19 introduces concurrent features (use, startTransition) and better error handling.*

*TypeScript adds static typing, improving maintainability and reducing runtime bugs.*

*Vite provides instant startup, fast HMR, and optimized builds out of the box.*




- Styling: Tailwind CSS

*Enables utility-first styling with consistency and speed.*

*Encourages responsive design directly in the markup, reducing CSS bloat.*



- UI Library: Shadcn/ui + Lucide Icons

*Shadcn/ui provides accessible, theme-aware, customizable components built on Radix UI.*

*Lucide offers beautiful and consistent open-source SVG icons.*



- State Management & Routing: React Hooks + React Router

*Leveraged for managing component state and SPA navigation with simplicity and flexibility.*

*Encourages modular and declarative architecture.*



- Date Handling: date-fns

*Lightweight and modern library for manipulating dates with immutable and functional methods.*

*Preferred over Moment.js due to bundle size and performance.*



- Charts: Recharts

*Declarative charting library built with React components.*

*Ideal for dashboards and visualizing business metrics in a customizable way.*



- Animations: Framer Motion

*Provides production-ready animations and transitions.*

*Chosen for its integration with React and support for complex gesture-based interactions.*



- Drag & Drop: @dnd-kit

*Modular, accessible, and extensible drag-and-drop toolkit.*

*Preferred over react-beautiful-dnd for better performance and flexibility.*



- Testing: Vitest

*Seamless integration with Vite.*

*Reliable unit testing with minimal configuration, leveraging Vite’s native environment.*



- Theme Management: next-themes

*Enables seamless light/dark mode switching.*

*Syncs with system preference and supports client-side hydration handling.*



- Notifications: sonner

*Lightweight and customizable toast notifications for user feedback and alerts.*



- Data Storage: LocalStorage

*Used for persisting data (e.g., theme, tasks, preferences) between sessions.*

*Eliminates the need for backend in MVP while maintaining state consistency.*



## Trade-Offs

Throughout development, key architectural and tooling decisions were made to strike a balance between performance, simplicity, and long-term maintainability. Below are some of the trade-offs considered:

- Vite over Next.js

*Vite was chosen for its superior development speed, instant HMR, and simplified tooling. While Next.js offers built-in SSR, routing, and API handling, it introduces more complexity and slower startup times. Since this project is a client-side dashboard with no server-rendered content, Vite was a more optimal fit.*


- Tailwind CSS over CSS Modules

*Tailwind CSS enables rapid UI development with utility classes and responsive design directly in the markup. This improves development speed and enforces consistency.*


- Vitest over Jest for Testing

*Vitest was selected due to its native compatibility with Vite, faster test execution, and a lightweight configuration that integrates seamlessly with modern frontend stacks. While Jest has a more established ecosystem, the trade-off was accepting a smaller (but growing) community in exchange for a faster and more streamlined developer experience.*


## Installation & Setup

### Prerequisites
Ensure you have the following tools installed:
- **Node.js** (v18 or higher)
- **Git**

### Clone the repo
```
git clone https://github.com/your-username/task-management-dashboard.git
cd task-management-dashboard
```

### Install dependencies
```
npm install
```

### Start development server
```
npm run dev

```



## Running Tests

### Run all tests
npm run test

### Watch mode
npm run test:watch



## Project Structure

```
src/
├── assets/             # Static files like images, fonts, icons
├── components/         # Reusable UI components
│   ├── ui/             # Shadcn UI components (button, input, etc.)
│   └── shared/         # Custom shared components (Navbar, AppSidebar)
├── context/            # Task context provider
├── hooks/              # Custom hooks (e.g., useLocalStorage, useTheme)
├── pages/              # Route-based pages
├── App.tsx             # Route definitions using React Router
├── lib/                # Utility functions and helpers
├── services/           # API service functions or data handling logic
├── types/              # Global TypeScript types and interfaces
├── styles/             # Global styles and Tailwind config
├── data/               # Local static JSON or mock data
├── tests/              # Unit and component tests (Vitest + Testing Library)
└── main.tsx            # Application entry point
```



## Contribution:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo.git
2. Create a new feature branch:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/branch-name
3. Commit your changes:
   ```bash
   git add .
   git commit -m "Added feature description"
4. Push your changes:
   ```bash
   git push origin feature/branch-name
5. Open a pull request (PR) for review.
