import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { SyntheticEvent } from "react";
import { useModal } from "../../contexts/modalContext";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: { xs: "90%" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const imgStyle = {
  height: "100%",
  width: "100%",
};

export default function ArtCardModal() {
  const { content, showModal, handleClose } = useModal();

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box
          component="img"
          sx={imgStyle}
          alt="The house from the offer."
          src={`https://www.artic.edu/iiif/2/${content.image_id}/full/843,/0/default.jpg`}
          onError={(e: SyntheticEvent<HTMLImageElement>) =>
            (e.currentTarget.src = "/img/error.png")
          }
        />
      </Box>
    </Modal>
  );
}
