const modalScript = () => {
  const modalWindow = document.getElementById('modal');
  const body = document.body;
  const closeModal = (event) => {
    const { target } = event;

    if (modalWindow && target.id === 'modal-overlay' || target.id === 'modal__button') {
      while (modalWindow.firstChild) {
        modalWindow.removeChild(modalWindow.firstChild);
      }
      modalWindow.classList.toggle('modal--close');
      body.classList.toggle('body--fixed');
    }
  };

  modalWindow.addEventListener('click', closeModal);
};

export default modalScript();
