let beerWrapper = document.querySelector("#beerWrapper");
let beerInput = document.querySelector('#beerNameInput');

class Beer{
  constructor(props){
    this.beerElement    = this.createMainBeerElement('div', 'beer');
    this.beerImage      = this.createBeerImage('img', 'beer_image', props.labels);
    this.beerInfo       = this.createBeerInformationElement('div', 'beer_information');
    this.beerName       = this.createBeerNameElement('span', 'beer_name', props.name);
    this.beerCommonInfo = this.createCommonInfoElement('div', 'beer_common-info', props);

    this.createMetricElement = this.createMetricElement.bind(this);
  }

  createMainBeerElement(node, className){
    let elem = document.createElement(node);
    elem.className = className;
    return elem;
  }

  createBeerImage(node, className, beerLabels){
    let elem = document.createElement(node);
  
    beerLabels && beerLabels.medium ?
      elem.src = beerLabels.medium :
      elem.src = './images/beer.png';
  
    elem.className = className;
    return elem;
  };

  createBeerInformationElement (node,className){
    let elem = document.createElement(node);
    elem.className = className;
    return elem;
  };

  createBeerNameElement(node,className, name){
    let elem = document.createElement(node);
    elem.innerHTML = name;
    elem.className = className;
    return elem;
  };

  createMetricElement({name,style}){
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

  createCommonInfoElement(node,className, beerData){
    let elem = document.createElement(node);
    const _beerData = Object.assign({}, beerData);
    const metrics = [{
        name: 'abv',
        style: _beerData.style
      },
      {
        name: 'ibu',
        style: _beerData.style
      },
      {
        name: 'og',
        style: _beerData.style
      },
      {
        name: 'srm',
        style: _beerData.style
      }
    ];
  
    let metricElements = metrics.map(this.createMetricElement);
    metricElements.forEach((metricElement) => {
      elem.appendChild(metricElement);
    });
  
    elem.className = className;
    return elem;
  }
  
  render(){
    this.beerInfo.appendChild(this.beerName);
    this.beerInfo.appendChild(this.beerCommonInfo);
  
    this.beerElement.appendChild(this.beerImage);
    this.beerElement.appendChild(this.beerInfo);

    return this.beerElement;
  }
}

class Beers {
  constructor(dataArray) {
    this.container = document.createElement('div');
    this.container.className = 'beerContainer';
    this.beerList = this.fetchData(dataArray);

    this.createBeerElement = this.createBeerElement.bind(this);
    this.addElement = this.addElement.bind(this);
  }

  fetchData(dataArray) {
    return dataArray.map(this.createBeerElement);
  }

  createBeerElement(beer){
    const _beer = new Beer(beer);
    return _beer.render();
  }

  addElement(beer){
    this.container.appendChild(beer);
  }

  render() {
    this.beerList.forEach(this.addElement);
    beerWrapper.appendChild(this.container);
  }
}

export default function searchBeer() {
  let form = document.forms['beerForm'];
  let beerName = form.elements['beerName'].value;
  let url = 'http://localhost:3000/api/beers'

  if (beerName) {
    url += `?name=${beerName}`
  }

  let request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();

  request.onreadystatechange = () => {
    if (request.readyState == 4 && request.status == 200) {
      let response = JSON.parse(request.responseText);
      if (response) {
        const beerList = new Beers(response);
        beerList.render(beerWrapper);
      } else {
        beerWrapper.innerHTML = 'No beer found';
      }
    };
  }
};