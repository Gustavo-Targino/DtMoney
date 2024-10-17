import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay } from "../styles";

import { TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useCategories } from "../../../hooks/useCategories";
import { useTransactions } from "../../../contexts/TransactionsContext";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "outcome"]),
});

type NewTransactionFormINputs = z.infer<typeof newTransactionFormSchema>;

interface NewTransactionModalProps {
  handleTransactionModalOpenChange: (status: boolean) => void;
}

export function NewTransactionModal({
  handleTransactionModalOpenChange,
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormINputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: "income",
    },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormINputs) {
    const { description, price, category, type } = data;

    await createTransaction({
      description,
      price,
      category,
      type,
    });

    reset();
    handleTransactionModalOpenChange(false);
  }

  const { categories } = useCategories();

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <select {...register("category")} required>
            {categories.map((category) => (
              <option
                key={category.id}
                label={category.name}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              // console.log(field); {name: "type", value:"pode ser income ou outcome, depende do selecionado"}

              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  {" "}
                  {/* field.onChange grava no value do field o valor selecionado */}
                  <TransactionTypeButton value="income" variant="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton value="outcome" variant="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
