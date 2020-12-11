import { Router } from 'express';

// Repository import
import TransactionsRepository from '../repositories/TransactionsRepository';

// Service import
import CreateTransactionService from '../services/CreateTransactionService';

// Router instance
const transactionRouter = Router();

// Repository instance
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // Get all transactions
    return response.json({
      transactions: transactionsRepository.all(),
      balance: transactionsRepository.getBalance(),
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    // Get params from request
    const { title, value, type } = request.body;

    // Title validation
    if (typeof title !== 'string')
      return response.status(400).json({
        error: 'Invalid title',
      });

    // Value validation
    if (typeof value !== 'number')
      return response.status(400).json({
        error: 'Invalid value type',
      });

    // Type validation
    if (type !== 'income' && type !== 'outcome')
      return response.status(400).json({
        error: 'Invalid transaction type',
      });

    // Service instance
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );

    // Create the transaction
    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });

    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
