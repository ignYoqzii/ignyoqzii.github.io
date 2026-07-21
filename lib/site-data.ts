export const profile = {
  name: "yoqzii",
  firstName: "yoqzii",
  logo: "/logo.png",
  role: "Software Engineering Student",
  location: "Quebec, Canada",
  tagline: "Engineering clarity into every line of code.",
  email: "lvsqyo4@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/ignYoqzii" },
    { label: "YouTube", href: "https://www.youtube.com/@ignYoqzii" },
    { label: "Discord", href: "https://discordapp.com/users/937500438700376104" },
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  intro:
    "I'm a software engineering student and designer who loves building things that feel smooth, fast, and intentional. I move between code, UI, and systems with the same curiosity I bring to gaming, cars, and science. Always trying to understand how things work and how to make them better.",
  details:
    "I care about clean interfaces, responsive interactions, and the small details that make software feel human. Whether I'm designing a workflow tool or optimizing a gaming setup, I’m drawn to clarity, motion, and systems that just make sense. I like building things that reduce friction, tools that feel effortless, fast, and enjoyable to use.",
  facts: [
    { label: "Experience", value: "3+ years" },
    { label: "Projects shipped", value: "6" },
    { label: "Based in", value: "Quebec, Canada" },
    {
      label: "Availability",
      value: "In internship at Alstom Transport Canada Inc",
    },
  ],
  skills: [
    "Python",
    "C++",
    "C#",
    "ARM",
    "LaTeX",
    "AI/ML",
    "Git/GitHub",
    "Video Editing",
    "SQL",
    "Power Apps",
  ],
};

export const education = [
  {
    school: "Cégep de La Pocatière",
    degree: "DEC, Sciences de la nature",
    period: "2023 - 2025",
    detail:
      "Built a strong foundation in mathematics, physics, and scientific reasoning. This is the base that shaped my curiosity for engineering and problem‑solving.",
  },
  {
    school: "Université Laval",
    degree: "Baccalauréat, Génie logiciel",
    period: "2025 - 2029",
    detail:
      "Focused on software engineering, clean system design, and building reliable, human‑centered digital experiences.",
  },
];

export type Project = {
  title: string;
  description: string;
  year: string;
  tags: string[];
  image: string;
  href: string;
};

export const projects: Project[] = [
  {
    title: "StarZ Launcher",
    description:
      "A Powerful and User-Friendly Minecraft Launcher/Injector for Windows (Bedrock Edition) - DISCONTINUED",
    year: "2023",
    tags: ["First Project", "C#", "XAML"],
    image: "/projects/starz-launcher.png",
    href: "https://github.com/ignYoqzii/StarZLauncher",
  },
  {
    title: "StarZ Injector",
    description:
      "Universal DLL Injector for Windows 7 and later, built with a WinUI 3-like interface.",
    year: "2025",
    tags: ["C#", "XAML", "WinUI 3"],
    image: "/projects/starz-injector.png",
    href: "https://github.com/ignYoqzii/StarZInjector",
  },
  {
    title: "GuessMate",
    description: "Your favorite Wordle companion.",
    year: "2025",
    tags: ["C#", "XAML", "WinUI 3"],
    image: "/projects/guessmate.png",
    href: "https://github.com/ignYoqzii/GuessMate",
  },
  {
    title: "GeoGuessrPlayer",
    description:
      "A GeoGuessr Application/Player with Discord Rich Presence implementation and other tools to enhance the gaming experience.",
    year: "2024",
    tags: ["C#", "XAML"],
    image: "/projects/geoguessrplayer.png",
    href: "https://github.com/ignYoqzii/GeoGuessrPlayer",
  },
  {
    title: "Quebec Gas Map",
    description:
      "Bilingual Windows application built with NiceGUI to consult gas prices in Quebec from an interactive map..",
    year: "2026",
    tags: ["Python", "NiceGUI"],
    image: "/projects/quebec-gas-map.png",
    href: "https://github.com/ignYoqzii/QuebecGasMap",
  },
];
