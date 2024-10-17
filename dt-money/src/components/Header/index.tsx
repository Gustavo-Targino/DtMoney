import {
  ButtonsContainer,
  HeaderContainer,
  HeaderContent,
  NewTransactionButton,
} from "./styles";

import logoImg from "../../assets/logo.svg";

import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../Modal/NewTransactionModal";
import { useState } from "react";
import { NewCategoryModal } from "../Modal/NewCategoryModal";
import { useCategories } from "../../hooks/useCategories";

export function Header() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] =
    useState<boolean>(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] =
    useState<boolean>(false);

  const { fetchCategories } = useCategories();

  function handleTransactionModalOpenChange(value: boolean) {
    setIsTransactionModalOpen(value);
  }

  function handleCategoryModalOpenChange(value: boolean) {
    setIsCategoryModalOpen(value);
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <ButtonsContainer>
          <Dialog.Root
            open={isTransactionModalOpen}
            onOpenChange={handleTransactionModalOpenChange}
          >
            <Dialog.Trigger asChild>
              <NewTransactionButton onClick={fetchCategories}>Nova transação</NewTransactionButton>
            </Dialog.Trigger>

            <NewTransactionModal
              handleTransactionModalOpenChange={setIsTransactionModalOpen}
            />
          </Dialog.Root>

          <Dialog.Root
            open={isCategoryModalOpen}
            onOpenChange={handleCategoryModalOpenChange}
          >
            <Dialog.Trigger asChild>
              <NewTransactionButton>Nova categoria</NewTransactionButton>
            </Dialog.Trigger>

            <NewCategoryModal
              handleCategoryModalOpenChange={setIsCategoryModalOpen}
            />
          </Dialog.Root>
        </ButtonsContainer>
      </HeaderContent>
    </HeaderContainer>
  );
}
