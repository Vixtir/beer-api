import searchBeer from './beers';

let beerInput = document.querySelector('#beerNameInput');

beerInput.addEventListener('input', function(e){
  searchBeer();
})
