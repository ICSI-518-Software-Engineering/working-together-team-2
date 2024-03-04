import Navbar from "./components/Navbar";
import AppRoutes from "./routes";

const App = () => {
  return (
    <main>
      {/* Navbar */}
      <Navbar />

      {/* Main Content Pages */}
      <AppRoutes />
    </main>
  );
};

export default App;
