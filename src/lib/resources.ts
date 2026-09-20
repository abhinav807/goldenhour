export type ResourceCategory = "WEB DEVELOPMENT" | "GAME DEVELOPMENT" | "TEMPLATES & DOCS";

export type Resource = {
  id: string;
  category: string;
  track: ResourceCategory;
  title: string;
  description: string;
  command: string;
  url: string;
};

export const resources: Resource[] = [
  { id: "vite-react", category: "FRONTEND", track: "WEB DEVELOPMENT", title: "Vite + React", description: "Start a fast React project with a clean development loop.", command: "npm create vite@latest my-app -- --template react-ts", url: "https://vite.dev/guide/" },
  { id: "nextjs", category: "FULL-STACK", track: "WEB DEVELOPMENT", title: "Next.js", description: "Build a full-stack React app with routing and server features.", command: "npx create-next-app@latest my-app", url: "https://nextjs.org/docs" },
  { id: "tailwind", category: "STYLING", track: "WEB DEVELOPMENT", title: "Tailwind CSS", description: "Compose responsive interfaces with utility-first CSS.", command: "npm install tailwindcss @tailwindcss/vite", url: "https://tailwindcss.com/docs" },
  { id: "shadcn", category: "UI LIBRARY", track: "WEB DEVELOPMENT", title: "shadcn/ui", description: "Use accessible, editable UI primitives in your own codebase.", command: "npx shadcn@latest init", url: "https://ui.shadcn.com/docs" },
  { id: "framer-gsap", category: "ANIMATION", track: "WEB DEVELOPMENT", title: "Motion tools", description: "Add purposeful interaction with Motion or GSAP.", command: "npm install motion gsap", url: "https://motion.dev/docs" },
  { id: "three-r3f", category: "3D GRAPHICS", track: "WEB DEVELOPMENT", title: "Three.js / R3F", description: "Create 3D scenes and interactive browser graphics.", command: "npm install three @react-three/fiber", url: "https://threejs.org/docs/" },
  { id: "supabase", category: "DATABASE", track: "WEB DEVELOPMENT", title: "Supabase", description: "Add a hosted database, auth and storage to a prototype.", command: "npm install @supabase/supabase-js", url: "https://supabase.com/docs" },
  { id: "firebase", category: "BACKEND", track: "WEB DEVELOPMENT", title: "Firebase", description: "Connect a web build to hosted services and realtime data.", command: "npm install firebase", url: "https://firebase.google.com/docs" },
  { id: "zustand", category: "STATE", track: "WEB DEVELOPMENT", title: "Zustand", description: "Keep client state small, readable and easy to change.", command: "npm install zustand", url: "https://zustand.docs.pmnd.rs/" },
  { id: "tanstack", category: "DATA", track: "WEB DEVELOPMENT", title: "TanStack Query", description: "Handle server state, caching and async data cleanly.", command: "npm install @tanstack/react-query", url: "https://tanstack.com/query/latest/docs" },
  { id: "vercel", category: "HOSTING", track: "WEB DEVELOPMENT", title: "Vercel", description: "Deploy a web project and share a live demo quickly.", command: "npm i -g vercel && vercel", url: "https://vercel.com/docs" },
  { id: "netlify", category: "HOSTING", track: "WEB DEVELOPMENT", title: "Netlify", description: "Publish static and frontend projects with a simple workflow.", command: "npm install -g netlify-cli && netlify deploy", url: "https://docs.netlify.com/" },
  { id: "godot", category: "ENGINE", track: "GAME DEVELOPMENT", title: "Godot", description: "Build 2D or 3D games with an open-source engine.", command: "godot --editor project.godot", url: "https://docs.godotengine.org/" },
  { id: "unity", category: "ENGINE", track: "GAME DEVELOPMENT", title: "Unity", description: "Prototype a playable world with a widely used game engine.", command: "# Open your project in Unity Hub", url: "https://docs.unity.com/" },
  { id: "phaser", category: "2D ENGINE", track: "GAME DEVELOPMENT", title: "Phaser", description: "Make browser games with a focused JavaScript game framework.", command: "npm install phaser", url: "https://phaser.io/learn" },
  { id: "kaboom", category: "2D ENGINE", track: "GAME DEVELOPMENT", title: "Kaboom.js", description: "Create small, expressive games with a beginner-friendly API.", command: "npm install kaboom", url: "https://kaboomjs.com/" },
  { id: "readme", category: "SUBMISSION", track: "TEMPLATES & DOCS", title: "README.md template", description: "Explain the problem, build, stack and demo for judges.", command: "touch README.md", url: "https://www.makeareadme.com/" },
  { id: "github", category: "REPOSITORY", track: "TEMPLATES & DOCS", title: "GitHub setup guide", description: "Create a public repository and keep your work easy to review.", command: "git init && git add . && git commit -m \"init\"", url: "https://docs.github.com/en/get-started" },
  { id: "submit", category: "CHECKLIST", track: "TEMPLATES & DOCS", title: "How to submit", description: "Use the official project submission requirements as your final checklist.", command: "# Verify repo, README.md, demo link", url: "#register" },
  { id: "codecrafters", category: "LEARNING", track: "TEMPLATES & DOCS", title: "CodeCrafters", description: "Practice by building real tools from first principles.", command: "# Explore the CodeCrafters learning tracks", url: "https://codecrafters.io" },
];
