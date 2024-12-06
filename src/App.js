import React from "react";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Ajout from "./pages/Ajout";
import Modif from "./pages/Modif";
import Supprim from "./pages/Supprim";

function App() {
  return (
    <Router>
      <div>
        {/* Barre de navigation */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Mon Application
            </Typography>
            <Button color="inherit" component={Link} to="/accueil">
              Accueil
            </Button>
            <Button color="inherit" component={Link} to="/ajout">
              Ajout
            </Button>
            <Button color="inherit" component={Link} to="/modif">
              Modification
            </Button>
            <Button color="inherit" component={Link} to="/supprim">
              Suppression
            </Button>
          </Toolbar>
        </AppBar>

        {/* Définition des routes */}
        <Routes>
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/ajout" element={<Ajout />} />
          <Route path="/modif" element={<Modif />} />
          <Route path="/supprim" element={<Supprim />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
