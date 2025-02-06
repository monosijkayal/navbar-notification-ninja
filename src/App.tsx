import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./providers/theme-provider";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppProvider>
        <Router>
          <div className="min-h-screen">
            <Navbar />
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
