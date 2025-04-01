import { useModal } from '../../context/modal'
import './OpenModalButton.css'

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

  return <button onClick={onClick} className='open-modal-button'>{itemText}</button>;
}

export default OpenModalButton;