import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  MenuItem,
  Alert,
} from "@mui/material";

function Modif({ transactionId }) {
  const [formData, setFormData] = useState({
    description: "",
    type: "",
    amount: "",
    date: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Charger les données de la transaction existante lors du montage du composant
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`http://localhost:8080/transactions/${transactionId}`);
        if (!response.ok) {
          throw new Error("Erreur de récupération de la transaction.");
        }
        const transaction = await response.json();
        setFormData({
          description: transaction.description,
          type: transaction.type,
          amount: transaction.amount,
          date: transaction.date.slice(0, 16), // Format : yyyy-MM-ddTHH:mm
        });
      } catch (err) {
        setError(err.message);
      }
    };

    if (transactionId) {
      fetchTransaction();
    }
  }, [transactionId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.description || !formData.type || !formData.amount || !formData.date) {
      setError("Tous les champs sont requis.");
      setSuccess(null);
      return;
    }

    const updatedTransaction = { ...formData };

    try {
      const response = await fetch(`http://localhost:8080/transactions/${transactionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTransaction),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la modification de la transaction.");
      }

      setSuccess("Transaction modifiée avec succès !");
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <Paper sx={{ padding: 3, marginTop: 3 }}>
      <Typography variant="h5" gutterBottom>
        Modifier une Transaction
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
            Modifier
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Modif;