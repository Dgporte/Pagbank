import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/index";
import { GeralProvider } from "./context/index"; // Importe o GeralProvider

const App = () => (
  <GeralProvider>
    {" "}
    {/* Envolva o AppRoutes com o GeralProvider */}
    <Router>
      <AppRoutes />
    </Router>
  </GeralProvider>
);

export default App;
