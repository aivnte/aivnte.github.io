import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        {/* Mode Toggle button */}
        <header className="p-4">
          <ModeToggle />
        </header>

        {/* Content goes here */}
        <main className="p-4">
          <h1 className="text-4xl font-bold">Welcome to Vite + React + ShadCN</h1>
          <p className="mt-4 text-lg">
            You can toggle between light and dark mode using the button above.
          </p>
        </main>

        {/* Footer */}
        <footer className="mt-auto p-4">
          <p className="text-sm">Made with Vite and Tailwind CSS</p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
