import React, { useEffect, useState } from 'react';
import PokemonInfo from './PokemonInfo';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Modal = ({ selectedPokemon, closeModal }) => {
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    setShowModal(true);
  }, [selectedPokemon]);

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
  };

  return (
    <div className={`modal ${showModal ? 'show' : 'hide'}`} onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Pokemon Details</span>
          <button className="close-button" onClick={handleCloseModal}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          {selectedPokemon ? (
            <PokemonInfo id={selectedPokemon} />
          ) : (
            <div className="no-pokemon-selected">
              <span className="font-size-18">Select a Pokemon<br />to display here.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
