// XHR test
let elem = document.querySelector("#xhr-test");
let button = document.querySelector("#xhr-button");
let text = document.querySelector("#xhr-text")
let beerInput = document.querySelector('#beerNameInput');

beerInput.addEventListener('input', function(e){
  searchBeer();
})

createBeer = (beer) => {
  let beerElement = document.createElement('div');
  beerElement.className = 'beerInfo';

  if(beer.labels){
    let beerInfo_img = document.createElement('img');
    beerInfo_img.src = beer.labels.icon;
    beerInfo_img.className = 'beerInfo_img';
    beerElement.appendChild(beerInfo_img);
  }
  
  let beerInfo_description = document.createElement('span');
  beerInfo_description.innerHTML = beer.description;
  
  beerElement.appendChild(beerInfo_description);

  return beerElement;
}

function fetchBeers(dataArray){
  let beerContainer = document.createElement('div');
  beerContainer.className = 'beerContainer';
  dataArray.forEach(function(beer) {
    beerContainer.appendChild(createBeer(beer));
  }, dataArray);

  text.innerHTML = beerContainer.outerHTML;
}

function searchBeer(){
  let form = document.forms['beerForm'];
  let beerName = form.elements['beerName'].value;
  let url = '/beers'

  if(beerName){
    url += `?name=${beerName}`;
  }

  let request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();

  request.onreadystatechange = () => {
    if(request.readyState == 4 && request.status == 200){
      let response = JSON.parse(request.responseText);
      if(response.data){
        fetchBeers(response.data);
      } else {
        text.innerHTML = 'No beer found';
      }
    };
    
  }
}

button.addEventListener('click', () => {
  searchBeer();
})








