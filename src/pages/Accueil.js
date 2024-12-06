import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Alert, Typography } from '@mui/material';

function Accueil() {
  const [transactions, setTransactions] = useState([]); // Pour stocker les transactions
  const [error, setError] = useState(null); // Pour gérer les erreurs
  const [loading, setLoading] = useState(true); // Pour gérer le chargement

  // Appel API pour récupérer les transactions
  useEffect(() => {
    fetch('http://localhost:8080/transactions') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json(); // Récupérer les données au format JSON
      })
      .then(data => {
        console.log('Transactions récupérées:', data); 
        setTransactions(data); // Mettre à jour l'état avec les données récupérées
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur:', error);
        setError(error.message); // Gérer les erreurs
        setLoading(false); 
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Liste des Transactions
      </Typography>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          Erreur: {error}
        </Alert>
      )}

      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Description</strong></TableCell>
                <TableCell><strong>Type</strong></TableCell>
                <TableCell><strong>Montant</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Aucune transaction disponible
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map(transaction => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{new Date(transaction.date).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Accueil;
