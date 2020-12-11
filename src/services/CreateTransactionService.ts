import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    // Get account balance
    const balance = this.transactionsRepository.getBalance();

    // Check if user has balance enough
    if (type === 'outcome' && value > balance.total)
      throw new Error('User has no balance enough');

    return this.transactionsRepository.create({ title, value, type });
  }
}

export default CreateTransactionService;
