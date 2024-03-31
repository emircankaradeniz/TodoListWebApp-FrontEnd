import React, { useState } from 'react';
import ModalPopup from './ModalFormGörevEkle';

function ParentComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <ModalPopup isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
    </div>
  );
}

export default ParentComponent;
