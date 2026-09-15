export type RouteDef = { path: string; label: string; index: string; blurb: string };

export const ROUTES: RouteDef[] = [
  { path: "/",           label: "Home",       index: "01", blurb: "The opening frame" },
  { path: "/about",      label: "About",      index: "02", blurb: "Operating principles & education" },
  { path: "/skills",     label: "Skills",     index: "03", blurb: "Every capability, explained and clickable" },
  { path: "/experience", label: "Experience", index: "04", blurb: "Three enterprises, in conversation" },
  { path: "/projects",   label: "Projects",   index: "05", blurb: "Research and technical work, all public" },
  { path: "/impact",     label: "Impact",     index: "06", blurb: "The numbers, as a live dashboard" },
  { path: "/contact",    label: "Contact",    index: "07", blurb: "Start a conversation" },
];
