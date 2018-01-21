export default (function(){
  let modalWindow = document.getElementById('modal');
  let body = document.body;
  modalWindow.addEventListener('click', closeModal);
  
  function closeModal(e){
    const target = e.target;

    if(modalWindow && target.id == 'modal-overlay' || target.id == 'modal__button' ){
      while(modalWindow.firstChild){
        modalWindow.removeChild(modalWindow.firstChild)
      }
       modalWindow.classList.toggle('modal--close');
       body.classList.toggle('body--fixed');
    }
  }
})();
