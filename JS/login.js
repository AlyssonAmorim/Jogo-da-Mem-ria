const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector ('.login-form')
const validateInput = ({target}) => {
  if (target.value.length > 3) {
    button.removeAttribute('disabled')
  } else {
    button.setAttribute('disabled', '');
  }
}

const handleSubmit = (event) => {
  event.preventDefault ();

  localStorage.setItem('player', input.value); /*Salva todo login que a pessoa fizer e memoriza no local storage. Ele salva com 2 parâmetros a chave e o valor*/
  window.location ='pages/game.html'; /*Redireciona a pessoa pra página do jogo*/

}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);