let button = document.querySelector("#xhr-button");
let beerWrapper = document.querySelector("#xhr-text")
let beerInput = document.querySelector('#beerNameInput');

const createMainBeerElement = ({elem,className}) => {
  let _elem = document.createElement(elem);
  _elem.className = className;
  return _elem;
};

const createBeerImage = ({elem, className}, beerLabels) => {
  let _elem = document.createElement(elem);

  beerLabels && beerLabels.medium 
    ? _elem.src = beerLabels.medium
    : _elem.src = './images/beer.png';

    _elem.className = className;
  return _elem;
};

const createBeerInformationElement = ({elem, className}) => {
  let _elem = document.createElement(elem);
  _elem.className = className;
  return _elem;
};

const createBeerNameElement = ({elem, className}, name) => {
  let _elem = document.createElement(elem);
  _elem.innerHTML = name;
  _elem.className = className;
  return _elem;
};

const createMetricElement = ({name, style}) => {
  let beer_metric = document.createElement('span');
  beer_metric.className = 'beer-metric';

  let metric_name = document.createElement('span');
  metric_name.className = 'beer_metric-name';
  metric_name.innerHTML = `${name}: `;

  let metric_data = document.createElement('span');
  metric_data.className = 'beer_metric-data';

  switch (name) {
    case 'abv':
      metric_data.innerHTML = `${style.abvMin || ''} - ${style.abvMax || ''}`;
      break;
    case 'ibu':
      metric_data.innerHTML = `${style.ibuMin || ''} - ${style.ibuMax || ''}`;
      break;
    case 'og':
      metric_data.innerHTML = `${style.ogMin || ''}`;
      break;
    case 'srm':
      metric_data.innerHTML = `${style.srmMin || ''} - ${style.srmMax || ''}`;
      break;  
    default:
      break;
  }
  beer_metric.appendChild(metric_name);
  beer_metric.appendChild(metric_data);

  return beer_metric;
}

const createCommonInfoElement = ({elem, className}, beerData) => {
  let _elem = document.createElement(elem);
  const _beerData = Object.assign({}, beerData);
  const metrics = [
    {name: 'abv', style: _beerData.style},
    {name: 'ibu', style: _beerData.style},
    {name: 'og' , style: _beerData.style},
    {name: 'srm', style: _beerData.style}];
  
  let metricElements = metrics.map(createMetricElement);
  metricElements.forEach((metricElement) => {
    _elem.appendChild(metricElement);
  });

  _elem.className = className;
  return _elem; 
}

const createBeer = beer => {
  let beerElement       = createMainBeerElement({elem: 'div', className: 'beer'});
  let beerImage         = createBeerImage({elem: 'img', className: 'beer_image'}, beer.labels);
  let beerInformation   = createBeerInformationElement({elem: 'div', className: 'beer_information'});
  let beerName          = createBeerNameElement({elem: 'span', className: 'beer_name'}, beer.name);
  let beerCommonInfo    = createCommonInfoElement({name: 'div', className: 'beer_common-info'}, beer);

  beerInformation.appendChild(beerName); 
  beerInformation.appendChild(beerCommonInfo);

  beerElement.appendChild(beerImage);
  beerElement.appendChild(beerInformation);
  return beerElement;
}

const fetchBeers = dataArray => {
  let beerContainer = document.createElement('div');
  beerContainer.className = 'beerContainer';
  
  dataArray.forEach(function(beer) {
    beerContainer.appendChild(createBeer(beer));
  }, dataArray);

  beerWrapper.innerHTML = beerContainer.outerHTML;
}

export default function searchBeer(){
  let form = document.forms['beerForm'];
  let beerName = form.elements['beerName'].value;
  let url = 'http://localhost:3000/api/beers'

  if(beerName){
    url += `?name=${beerName}`
  }

  let request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();

  request.onreadystatechange = () => {
    if(request.readyState == 4 && request.status == 200){
      let response = JSON.parse(request.responseText);
      if(response){
        fetchBeers(response);
      } else {
        text.innerHTML = 'No beer found';
      }
    };
    
  }
};
