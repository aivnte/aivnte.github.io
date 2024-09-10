import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      {/* Main container for the entire layout */}
      <div className="min-h-screen flex flex-col bg-background text-foreground w-full">
        
        {/* Header Section */}
        <header className="w-full p-4 bg-gray-200">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">axr1</h1>
            <ModeToggle />
          </div>
        </header>

        {/* Main Content Section */}
        <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Vite + React + ShadCN</h1>
          <p className="text-lg mb-4 text-center">
            Toggle between light and dark mode using the button above.
          </p>

          {/* Example content or additional layout elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="p-6 bg-white shadow-md rounded-md">
              <h2 className="text-xl font-semibold mb-2">Section 1</h2>
              <p>This is some content for section 1.</p>
            </div>
            <div className="p-6 bg-white shadow-md rounded-md">
              <h2 className="text-xl font-semibold mb-2">Section 2</h2>
              <p>This is some content for section 2.</p>
            </div>
          </div>
        </main>

        {/* Footer Section */}
        <footer className="w-full p-4 bg-gray-200">
          <div className="container mx-auto text-center">
            <p className="text-sm">Made with Vite and Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
