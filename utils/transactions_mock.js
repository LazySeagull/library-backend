
let transactions = [];
let nextId = 1;

async function issueBook({ userId, bookId }) {
  const transaction = {
    id: nextId++,
    userId,
    bookId,
    status: 'issued',
    issuedAt: new Date(),
    returnedAt: null,
  };
  transactions.push(transaction);
  return transaction;
}

async function returnBook(id) {
  const transaction = transactions.find(t => t.id === id && t.status === 'issued');
  if (!transaction) return null;
  transaction.status = 'returned';
  transaction.returnedAt = new Date();
  return transaction;
}

async function getUserTransactions(userId) {
  return transactions.filter(t => t.userId === userId);
}

async function getAllTransactions() {
  return transactions;
}

module.exports = { issueBook, returnBook, getUserTransactions, getAllTransactions };