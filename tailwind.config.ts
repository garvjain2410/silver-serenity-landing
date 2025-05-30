import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        
        // Update primary brand colors
        primary: {
          DEFAULT: '#367D8A',
          light: '#3A8999',
          dark: '#285F6B',
          darker: '#133336',
        },
        accent: {
          DEFAULT: '#FFFFFF',
          muted: '#F1F1F1',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#010001',
        },
        // Remove gold colors and update silver
        silver: {
          light: '#F1F1F1',
          DEFAULT: '#E5E5E5',
          dark: '#CCCCCC',
        },
			},
			fontFamily: {
				playfair: ['Playfair Display', 'serif'],
				poppins: ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				"accordion-up": {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				"fade-up": {
					"0%": {
						opacity: "0",
						transform: "translateY(20px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				"typing": {
					"0%": {
						width: "0%",
						visibility: "hidden"
					},
					"100%": {
						width: "100%"
					}
				},
				"blink": {
					"50%": {
						borderColor: "transparent"
					},
					"100%": {
						borderColor: "white"
					}
				},
				"bounce-subtle": {
					"0%, 100%": {
						transform: "translateY(0)"
					},
					"50%": {
						transform: "translateY(-4px)"
					}
				},
				"float": {
					"0%, 100%": {
						transform: "translateY(0)"
					},
					"50%": {
						transform: "translateY(-10px)"
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out forwards",
				"fade-up": "fade-up 0.7s ease-out forwards",
				"typing": "typing 2s steps(20, end)",
				"blink": "blink 1s infinite",
				"bounce-subtle": "bounce-subtle 2s infinite",
				"float": "float 6s ease-in-out infinite"
			},
			backgroundImage: {
			  'hero-pattern': "url('https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
