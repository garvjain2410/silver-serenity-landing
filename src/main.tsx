
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Wrap in try-catch to capture and log any initialization errors
try {
  // Ensure DOM is fully loaded before mounting
  document.addEventListener('DOMContentLoaded', () => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      createRoot(rootElement).render(<App />);
    } else {
      console.error("Root element not found!");
    }
  });
} catch (error) {
  console.error("Error initializing application:", error);
}
