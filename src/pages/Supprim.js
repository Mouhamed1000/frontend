import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Alert } from "@mui/material";

function Supprim() {
  const [transactionId, setTransactionId] = useState(""); // ID de la transaction à supprimer
  const [error, setError] = useState(null); // Pour afficher les erreurs
  const [success, setSuccess] = useState(null); // Pour afficher les messages de succès

  // Gestion de la modification du champ d'ID
  const handleChange = (event) => {
    setTransactionId(event.target.value);
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation de base
    if (!transactionId) {
      setError("L'ID de la transaction est requis.");
      setSuccess(null);
      return;
    }

    try {
      // Envoi de la requête de suppression au backend
      const response = await fetch(`http://localhost:8080/transactions/${transactionId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la transaction.");
      }

      setSuccess("Transaction supprimée avec succès !");
      setError(null);
      setTransactionId(""); // Réinitialiser l'ID
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <Paper sx={{ padding: 3, marginTop: 3 }}>
      <Typography variant="h5" gutterBottom>
        Supprimer une Transaction
      </Typography>
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ marginBottom: 2 }}>{success}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="ID de la transaction"
          name="transactionId"
          value={transactionId}
          onChange={handleChange}
          required
          fullWidth
        />
        <Button type="submit" variant="contained" color="secondary" sx={{ marginTop: 2 }}>
          Supprimer
        </Button>
      </form>
    </Paper>
  );
}

export default Supprim;