
import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class", ".dark"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', 'Inter', 'sans-serif'],
        serif: ['Crimson Pro', 'Georgia', 'serif'],
        mono: ['Roboto Mono', 'monospace'],
        legal: ['Cormorant Garamond', 'Times New Roman', 'serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Legal theme colors
        law: {
          primary: "#4F46E5",
          secondary: "#6366F1",
          accent: "#8B5CF6",
          background: "#F9FAFB",
          foreground: "#111827",
          gold: {
            light: "#FEF3C7",
            DEFAULT: "#D97706",
            dark: "#92400E",
          },
          blue: {
            light: "#DBEAFE",
            DEFAULT: "#2563EB",
            dark: "#1E40AF",
          },
          red: {
            light: "#FEE2E2",
            DEFAULT: "#DC2626",
            dark: "#991B1B",
          }
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        "rotate3d": {
          "0%": { transform: "rotate3d(1, 0, 0, 30deg)", opacity: "0" },
          "100%": { transform: "rotate3d(1, 0, 0, 0deg)", opacity: "1" },
        },
        "float3d": {
          "0%": { transform: "translateZ(-20px)", opacity: "0" },
          "100%": { transform: "translateZ(0)", opacity: "1" },
        },
        "gavel-tap": {
          "0%, 20%, 100%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(-15deg)" },
        },
        "document-flip": {
          "0%": { transform: "rotateY(180deg)", opacity: "0" },
          "100%": { transform: "rotateY(0deg)", opacity: "1" },
        },
        "law-scale": {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.03) rotate(2deg)" },
        },
        "modal-popup": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "70%": { transform: "scale(1.02)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideUp: "slideUp 0.5s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        "pulse-subtle": "pulse-subtle 2s infinite ease-in-out",
        "rotate3d": "rotate3d 0.7s ease-out forwards",
        "float3d": "float3d 0.7s ease-out forwards",
        "gavel-tap": "gavel-tap 1.5s infinite ease-in-out",
        "document-flip": "document-flip 0.6s ease-out forwards",
        "law-scale": "law-scale 3s infinite ease-in-out",
        "modal-popup": "modal-popup 0.4s ease-out forwards",
      },
      // 3D transformation classes
      transformStyle: {
        "3d": "preserve-3d",
      },
      perspective: {
        "1000": "1000px",
        "2000": "2000px",
      },
      rotateX: {
        "45": "45deg",
      },
      rotateY: {
        "45": "45deg",
        "90": "90deg",
        "180": "180deg",
      },
      translateZ: {
        "20": "20px",
        "-20": "-20px",
      },
      // For glass morphism
      backdropFilter: {
        "blur-sm": "blur(4px)",
        "blur-md": "blur(8px)",
        "blur-lg": "blur(16px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
