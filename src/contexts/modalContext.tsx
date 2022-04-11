import { createContext, useState, ReactNode, useContext } from "react";

type ModalContextData = {
  handleModalContent: (data: {}) => void;
  showModal: boolean;
  content: {};
  handleClose: (value: boolean) => void;
};

export const ModalContext = createContext({} as ModalContextData);

type ModalContextProviderProps = {
  children: ReactNode;
};

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState({});

  const handleModalContent = (data: {}) => {
    setContent(data);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, handleModalContent, content, handleClose }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  return useContext(ModalContext);
};
