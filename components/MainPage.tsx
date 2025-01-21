import React, { useState } from 'react';
import './MainPage.scss';

type Transaction = {
  id: number;
  type: 'crédito' | 'débito' | 'transferência' | 'ted' | 'pix';
  amount: number;
  description: string;
};

const MainPage: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [newTransaction, setNewTransaction] = useState<Transaction>({
    id: 0,
    type: 'crédito',
    amount: 0,
    description: '',
  });

  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleAddTransaction = () => {
    const amount =
      newTransaction.type === 'crédito' || newTransaction.type === 'transferência' || newTransaction.type === 'ted' || newTransaction.type === 'pix'
        ? -newTransaction.amount
        : newTransaction.amount;

    setBalance(balance + amount);

    setTransactions([
      ...transactions,
      { ...newTransaction, id: transactions.length + 1 },
    ]);

    setNewTransaction({ id: 0, type: 'crédito', amount: 0, description: '' });
  };

  const handleEditTransaction = () => {
    if (editingTransaction) {
      const previousTransaction = transactions.find((txn) => txn.id === editingTransaction.id);

      if (previousTransaction) {
        const previousAmount = previousTransaction.amount;
        const previousType = previousTransaction.type;

        setBalance((prevBalance) => {
          if (previousType === 'crédito' || previousType === 'transferência' || previousType === 'ted' || previousType === 'pix') {
            return prevBalance + previousAmount; 
          } else {
            return prevBalance - previousAmount; 
          }
        });

        const updatedTransactions = transactions.map((txn) =>
          txn.id === editingTransaction.id ? { ...txn, ...editingTransaction } : txn
        );

        setTransactions(updatedTransactions);

        const newAmount = editingTransaction.amount;
        const newType = editingTransaction.type;

        setBalance((prevBalance) => {
          if (newType === 'crédito' || newType === 'transferência' || newType === 'ted' || newType === 'pix') {
            return prevBalance - newAmount; 
          } else {
            return prevBalance + newAmount; 
          }
        });

        setEditingTransaction(null);
      }
    }
  };

  const handleDeleteTransaction = (id: number) => {
    const txn = transactions.find((txn) => txn.id === id);
    if (txn) {
   
      const adjustedAmount = txn.type === 'crédito' || txn.type === 'transferência' || txn.type === 'ted' || txn.type === 'pix'
        ? txn.amount 
        : -txn.amount; 

      setBalance(balance + adjustedAmount);

      setTransactions(transactions.filter((txn) => txn.id !== id));
    }
  };

  return (
    <div className="MainPage">
      <h1>Bem Vindo!</h1>
      <h2 className={balance < 0 ? 'negativeBalance' : ''}>
        Saldo Atual: ${balance.toFixed(2)}
      </h2>
      {balance < 0 && <p className="negativeMessage">Sua conta está negativada!</p>}

      <section>
        <h3>Últimas Transações</h3>
        <ul>
          {transactions.length === 0 ? (
            <li><span>Sem transações realizadas.</span></li>
          ) : (
            transactions.map((txn) => (
              <li key={txn.id}>
                <span>{txn.description}</span>: 
                <span className={`MainPage ${txn.type === 'crédito' || txn.type === 'transferência' || txn.type === 'ted' || txn.type === 'pix' ? 'crédito' : txn.type}`}>
                  {txn.type === 'crédito' || txn.type === 'transferência' || txn.type === 'ted' || txn.type === 'pix' ? '-' : '+'}${txn.amount}
                </span>
                <button onClick={() => setEditingTransaction(txn)} className="MainPage">Editar</button>
                <button className="MainPage delete" onClick={() => handleDeleteTransaction(txn.id)}>Deletar</button>
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <h3>{editingTransaction ? 'Editar Transação' : 'Nova Transação'}</h3>
        <label>
          Tipo:
          <select
            value={editingTransaction ? editingTransaction.type : newTransaction.type}
            onChange={(e) =>
              editingTransaction
                ? setEditingTransaction({ ...editingTransaction, type: e.target.value as 'crédito' | 'débito' | 'transferência' | 'ted' | 'pix' })
                : setNewTransaction({ ...newTransaction, type: e.target.value as 'crédito' | 'débito' | 'transferência' | 'ted' | 'pix' })
            }
          >
            <option value="crédito">Crédito</option>
            <option value="débito">Débito</option>
            <option value="transferência">Transferência</option>
            <option value="ted">TED</option>
            <option value="pix">PIX</option>
          </select>
        </label>
        <br />
        <label>
          Valor:
          <input
            type="number"
            value={editingTransaction ? editingTransaction.amount : newTransaction.amount}
            onChange={(e) =>
              editingTransaction
                ? setEditingTransaction({ ...editingTransaction, amount: Number(e.target.value) })
                : setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })
            }
          />
        </label>
        <br />
        <label>
          Descrição:
          <input
            type="text"
            value={editingTransaction ? editingTransaction.description : newTransaction.description}
            onChange={(e) =>
              editingTransaction
                ? setEditingTransaction({ ...editingTransaction, description: e.target.value })
                : setNewTransaction({ ...newTransaction, description: e.target.value })
            }
          />
        </label>
        <br />
        <button onClick={editingTransaction ? handleEditTransaction : handleAddTransaction} className="MainPage addTransaction">
          {editingTransaction ? 'Salvar Alterações' : 'Adicionar Transação'}
        </button>
      </section>

    </div>
  );
};

export default MainPage;
