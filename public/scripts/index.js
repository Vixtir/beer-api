import searchBeer from './beers';

document.addEventListener("DOMContentLoaded", function(){
  searchBeer();
});


document.onscroll = function(e){
  let header = document.querySelector('div.bigHeader');
  let height = getComputedStyle(header).height;
  let scroll = window.pageYOffset || document.documentElement.scrollTop;

  if(scroll > parseInt(height)/2){
    header.classList.toggle('fixed', true)
  } else {
    header.classList.toggle('fixed', false)
  }
}

let beerInput = document.querySelector('#beerNameInput');
let newSearchBeer = myThrotlle(searchBeer, 500);
beerInput.addEventListener('input', function(e){
  let form = document.forms['beerForm'];
  let beerName = form.elements['beerName'].value;
  newSearchBeer(beerName);
})

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