const baseURL = "demo.once-ui.com";

// default customization applied to the HTML in the main layout.tsx
const style = {
  theme: "dark",
  brand: "violet",
  accent: "violet",
  neutral: "slate",
  border: "rounded",
  solid: "color",
  solidStyle: "flat",
  surface: "translucent",
  transition: "all",
  scaling: "100"
}

const effects = {
  mask: {
    cursor: false,
    x: 50,
    y: 0,
    radius: 100,
  },
  gradient: {
    display: false,
    x: 50,
    y: 0,
    width: 100,
    height: 100,
    tilt: 0,
    colorStart: "brand-background-strong",
    colorEnd: "static-transparent",
    opacity: 50,
  },
  dots: {
    display: false,
    size: 2,
    color: "brand-on-background-weak",
    opacity: 20,
  },
  lines: {
    display: false,
    color: "neutral-alpha-weak",
    opacity: 100,
  },
  grid: {
    display: false,
    color: "neutral-alpha-weak",
    width: "24",
    height: "24",
    opacity: 100,
  },
};

// default metadata
const meta = {
  title: "Fonki",
  description:
    "Chat Builder",
};

// default open graph data
const og = {
  title: meta.title,
  description: meta.description,
  image: "/images/cover.jpg",
};

// default schema data
const schema = {
  logo: "",
  type: "Organization",
  name: "Fonki",
  description: meta.description,
  email: "lorant@once-ui.com",
};


export { baseURL, style, meta, og, schema, effects };
