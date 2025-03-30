import { useModal } from '../../context/modal'

function OpenModalButton({
  modalComponent, 
  itemText, 
  onItemClick, 
  onModalClose 
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onItemClick === "function") onItemClick();
  };

  return <button onClick={onClick}>{itemText}</button>;
}

export default OpenModalButton;