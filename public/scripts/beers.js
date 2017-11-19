let beerWrapper = document.querySelector("#beer-list");
let beerInput = document.querySelector('#beer-name');

class Beer{
  constructor(props){
    this.beerElement    = this.createMainBeerElement('div', 'beer beer-list__beer');
    this.beerImage      = this.createBeerImage('img', 'beer__image', props.labels);
    this.beerInfo       = this.createBeerInformationElement('div', 'beer__information');
    this.beerName       = this.createBeerNameElement('span', 'beer__title', props.name);
    this.beerCommonInfo = this.createCommonInfoElement('div', 'beer__common-info', props);
    this.fullBeerInfo   = this.createFullBeerInfoElement('div', 'beer__full-info');
    this.fullBeerInfo   = this.createUnderlineElement('div', 'beer__underline');
    this.beerId = props._id;
    this.createMetricElement = this.createMetricElement.bind(this);
  }

  createUnderlineElement(node, className){
    let elem = document.createElement(node);
    elem.className = className;
    return elem;
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

  createFullBeerInfoElement (node,className){
    let elem = document.createElement(node);
    elem.className = className;
    return elem;
  };

  createBeerNameElement(node,className, name){
    let elem = document.createElement(node);
    elem.innerText = name;
    elem.className = className;
    return elem;
  };

  createMetricElement({name,style}){
    let beer_metric = document.createElement('span');
    beer_metric.className = 'beer__metric';
  
    let metric_name = document.createElement('span');
    metric_name.className = 'beer__metric-name';
    metric_name.innerText = `${name}: `;
  
    let metric_data = document.createElement('span');
    metric_data.className = 'beer__metric-data';
  
    switch (name) {
      case 'abv':
        metric_data.innerText = `${style.abvMin || ''} - ${style.abvMax || ''}`;
        break;
      case 'ibu':
        metric_data.innerText = `${style.ibuMin || ''} - ${style.ibuMax || ''}`;
        break;
      case 'og':
        metric_data.innerText = `${style.ogMin || ''}`;
        break;
      case 'srm':
        metric_data.innerText = `${style.srmMin || ''} - ${style.srmMax || ''}`;
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

  createFullDescription(beer){
    let result;
    let _beer = Object.assign({}, beer);
    result = _beer.style.description;
    return result;
  }

  onClick(e){
    let oldOpen = Beer.getClickedElement();
    if(oldOpen && oldOpen != this){
      oldOpen.fullBeerInfo.classList.toggle('open', false);
      oldOpen.beerElement.classList.toggle('open', false);
      window.scrollTo(0, this.idx * 100 + 80);
    }
    Beer.setClickedElement(this);

    let promise = new Promise((resolve, reject) => {
      const url = `api/beer/${this.beerId}`;
      let request = new XMLHttpRequest();
      request.open('GET', url);
      request.send();
    
      request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
          let response = JSON.parse(request.responseText);
          if (response) {
            resolve(response)
          } else {
            reject(new Error("Something went wrong"))
          }
        };
      }
    })

    promise
    .then( beer => {
        let fullDescription = this.createFullDescription(beer);
        let elem = this.beerElement.querySelector('div.beer__full-info');
        elem.innerText = fullDescription;
        elem.classList.toggle('beer__full-info--opened');
        this.beerElement.classList.toggle('beer__full-info--opened');
        return;
      })
    .catch( err => console.dir(err));
}
  
  render(){
    this.beerElement.appendChild(this.beerImage);

    this.beerInfo.appendChild(this.beerName);
    this.beerInfo.appendChild(this.beerCommonInfo);
    this.beerElement.appendChild(this.beerInfo);

    this.beerElement.appendChild(this.fullBeerInfo);

    this.beerElement.addEventListener('click', (e) => this.onClick(e))
    
    return this.beerElement;
  }

  static setClickedElement(params) {
    Beer.clickedElement = params;
  }

  static getClickedElement() {
    return Beer.clickedElement;
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

  createBeerElement(beer, i){
    const _beer = new Beer(beer);
    _beer.idx = i;
    return _beer.render();
  }

  addElement(beer){
    this.container.appendChild(beer);
  }

  render() {
    this.beerList.forEach(this.addElement);
    if(beerWrapper.children.item(0)){
      beerWrapper.replaceChild(this.container, beerWrapper.children.item(0));
    } else {
      beerWrapper.appendChild(this.container);
    }
  }
}

export default function searchBeer(value) {
  let url = 'api/beers'
  if (value) {
    url += `?name=${value}`
  }

  let promise = new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
  
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        let response = JSON.parse(request.responseText);
        if (response) {
          resolve(response);
        } else {
          reject(new Error('some went wrong'));
        }
      };
    }
  })

  promise
    .then( beers => {
      if(beers.length){
        beerWrapper.innerText = ""
        const beerList = new Beers(beers);
        beerList.render(beerWrapper);
      } else {
        beerWrapper.innerText = "Beers not found :c"
      } 
    })
    .catch( err => {
      console.error(err)
    } )
};