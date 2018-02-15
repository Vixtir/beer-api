const types = {
  warning: 'warning',
  error: 'error',
  success: 'success',
};

const showMessage = (type, msg) => {
  const messageElem = document.getElementById('message');
  const { classList } = messageElem;

  classList.forEach((klass) => {
    if (/message--type*/.test(klass)) {
      classList.remove(klass);
    }
  });

  messageElem.innerHTML = msg;
  classList.add(`message--type-${type}`);
  classList.toggle('message--show');

  setTimeout(() => { classList.remove('message--show'); }, 3000);
};

export { showMessage, types };
