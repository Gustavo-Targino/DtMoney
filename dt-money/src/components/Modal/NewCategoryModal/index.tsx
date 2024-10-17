import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
} from "../styles";
import {  X } from "phosphor-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransactions } from "../../../contexts/TransactionsContext";


const newTransactionFormSchema = z.object({
  nome: z.string()
});

type NewCategoryFormInput = z.infer<typeof newTransactionFormSchema>;

interface NewCategoryModalProps {
  handleCategoryModalOpenChange: (status: boolean) => void;
}

export function NewCategoryModal({ handleCategoryModalOpenChange  } : NewCategoryModalProps) {
 
  const { createCategory } = useTransactions();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewCategoryFormInput>({
    resolver: zodResolver(newTransactionFormSchema)
  });

  async function handleCreateNewCategory(data: NewCategoryFormInput) {
    const { nome } = data;

    createCategory(nome);

    reset();
    handleCategoryModalOpenChange(false)
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova categoria</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewCategory)}>
          <input
            type="text"
            placeholder="Nome"
            required
            {...register("nome")}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
