import searchBeer       from './beers';
import { myThrotlle }   from './utils';
import * as modalScript from '../blocks/modal/modal.js';
import * as message from '../blocks/message/message.js';
import css              from '../styles/style.css'

document.onscroll = function(e){
  const header = document.querySelector('div.header');
  const searchForm = header.querySelector('.search-form');
  const height = getComputedStyle(header).height;
  const scroll = window.pageYOffset || document.documentElement.scrollTop;
  if(scroll > 45){
    searchForm.classList.add('header__search-form--fixed');
  } else {
    searchForm.classList.remove('header__search-form--fixed');
  }
}

const beerInput = document.querySelector('#beer-name');
const newSearchBeer = myThrotlle(searchBeer, 500);

if(beerInput){
  beerInput.addEventListener('input', function(e){
    const form = document.forms['search-form'];
    const beerName = form.elements['beer-name'].value;
    newSearchBeer(beerName);
  })  
}

export const login = function(){
  event.preventDefault();
  const form = event.target;
  const name  = form.querySelector('input#name').value;
  const password = form.querySelector('input#password').value;
  if(name && password){
    const body = `name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`;
    const request = new XMLHttpRequest();
    let response;
    request.open('POST', 'login');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(body);
    
    request.onreadystatechange = () => {
      if (request.readyState == 4) {
        try {
          response = JSON.parse(request.responseText);
        } catch (error) {
          message.showMessage(message.types.error, 'Ошибка парсинга ответа с сервера');
          return;
        }
        
        if(response){
          if(request.status == 200){
            message.showMessage(message.types.success, 'Токен создан, вход выполнен');
            window.localStorage.setItem('token', response.token);
          } else {
            message.showMessage(message.types.error, `Ошибка. ${response}`)
          }
        }
      };
    }
  }
}

export const register = function(){
  event.preventDefault();
  const form = event.target;
  const name  = form.querySelector('input#name').value;
  const password = form.querySelector('input#password').value;

  if(name && password){
    const body = `name=${encodeURIComponent(name)}&password=${encodeURIComponent(password)}`;
    const request = new XMLHttpRequest();
    let response;
    request.open('POST', 'register');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(body);
    
    request.onreadystatechange = () => {
      if (request.readyState == 4) {
        try {
          response = JSON.parse(request.responseText);
        } catch (error) {
          message.showMessage(message.types.error, 'Ошибка парсинга ответа с сервера');
          return;
        }

        if(request.status == 200){
          message.showMessage(message.types.success, 'Вы успешно зарегестрированы')
        } else {
          message.showMessage(message.types.error, `Ошибка. ${response}`)
        }
      };
    }
  } else {
    message.showMessage(message.types.warning, 'Не заполнены обязятельные поля')
  }
}