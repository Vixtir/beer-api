import searchBeer from './beers';
import * as modalScript from '../blocks/modal/modal.js';
import css from '../styles/style.css'

document.onscroll = function(e){
  let header = document.querySelector('div.header');
  let searchForm = header.querySelector('.search-form');
  let height = getComputedStyle(header).height;
  let scroll = window.pageYOffset || document.documentElement.scrollTop;
  if(scroll > 45){
    searchForm.classList.add('header__search-form--fixed');
  } else {
    searchForm.classList.remove('header__search-form--fixed');
  }
}

let beerInput = document.querySelector('#beer-name');
let newSearchBeer = myThrotlle(searchBeer, 500);

if(beerInput){
  beerInput.addEventListener('input', function(e){
    let form = document.forms['search-form'];
    let beerName = form.elements['beer-name'].value;
    newSearchBeer(beerName);
  })  
}

function myThrotlle(f, ms){
  var throttle = false,
      currentArgs;

  return function wrapper(){
    if(throttle){
      currentArgs = arguments;
      return;
    } 
    
    throttle = true;
    f.apply(null, arguments);

    setTimeout(
      function(){
        throttle = false;
        if(currentArgs){
          wrapper.apply(null, currentArgs);
          currentArgs = null;
        }
      }, ms);
  }
}