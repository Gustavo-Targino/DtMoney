import { ReactNode, useCallback, useEffect, useState } from "react";
import { ApiService } from "../services/Api/ApiService";
import { createContext, useContextSelector } from "use-context-selector";

export interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  createCategory: (data: string) => Promise<void>;
}

const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await ApiService.get("/transaction/list", {
      params: {
        description: query,
      },
    });

    setTransactions(response.data);
  }, []);

  const createTransaction = async (data: CreateTransactionInput) => {
    const { description, price, category, type } = data;

    const response = await ApiService.post("/transaction/add", {
      description,
      price,
      categoryId: parseInt(category),
      type,
    });

    setTransactions((state) => [response.data, ...state]);
  };

  async function createCategory(name: string) {
    await ApiService.post("/category/add", {
      name,
    });
  }

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        createCategory,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => {
  const context = useContextSelector(TransactionsContext, (context) => {
    return context;
  });

  return context;
};
