
import { useState } from 'react';
export default function useModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const actions = { openModal, closeModal };

  return [showModal, actions];
}