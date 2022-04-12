import { createContext, useState, ReactNode, useContext } from "react";

type ContentData = {
  image_id: string;
  title: string;
  artist_title: string;
  medium_display: string;
  dimensions: string;
  credit_line: string;
};
type ModalContextData = {
  handleModalContent: (data: ContentData) => void;
  showModal: boolean;
  content: ContentData;
  handleClose: (value: boolean) => void;
};

export const ModalContext = createContext({} as ModalContextData);

type ModalContextProviderProps = {
  children: ReactNode;
};

export function ModalContextProvider({ children }: ModalContextProviderProps) {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState({
    image_id: "",
    title: "",
    artist_title: "",
    medium_display: "",
    dimensions: "",
    credit_line: "",
  });

  const handleModalContent = (data: ContentData) => {
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
