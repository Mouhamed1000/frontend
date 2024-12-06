import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";

function Ajout() {
  const [formData, setFormData] = useState({
    description: "",
    type: "",
    amount: "",
    date: new Date().toISOString().slice(0, 16), // Format : yyyy-MM-ddTHH:mm
  });

  const [error, setError] = useState(null); // Pour afficher les erreurs
  const [success, setSuccess] = useState(null); // Pour afficher les messages de succès

  // Gestion des champs du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation de base
    if (!formData.description || !formData.type || !formData.amount || !formData.date) {
      setError("Tous les champs sont requis.");
      setSuccess(null);
      return;
    }

    const newTransaction = {
      ...formData,
    };

    try {
      const response = await fetch("http://localhost:8080/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la transaction.");
      }

      setSuccess("Transaction ajoutée avec succès !");
      setError(null);
      setFormData({
        description: "",
        type: "",
        amount: "",
        date: "", // Réinitialiser la date
      });
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <Paper sx={{ padding: 3, marginTop: 3 }}>
      <Typography variant="h5" gutterBottom>
        Ajouter une Transaction
      </Typography>
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ marginBottom: 2 }}>{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <TextField
            label="Type"
            name="type"
            select
            value={formData.type}
            onChange={handleChange}
            required
          >
            <MenuItem value="Dépense">DEPENSE</MenuItem>
            <MenuItem value="Revenu">REVENU</MenuItem>
          </TextField>
          <TextField
            label="Montant"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <TextField
            label="Date"
            name="date"
            type="datetime-local"
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Ajouter
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Ajout;
