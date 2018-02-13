const beerWrapper = document.querySelector("#beer-list");
const beerInput = document.querySelector('#beer-name');

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
    const elem = document.createElement(node);
    elem.className = className;
    return elem;
  }

  createMainBeerElement(node, className){
    const elem = document.createElement(node);
    elem.className = className;
    return elem;
  }

  createBeerImage(node, className, beerLabels){
    const elem = document.createElement(node);
  
    beerLabels && beerLabels.medium ?
      elem.src = beerLabels.medium :
      elem.src = './images/beer.png';
  
    elem.className = className;
    return elem;
  };

  createBeerInformationElement (node,className){
    const elem = document.createElement(node);
    elem.className = className;
    return elem;
  };

  createFullBeerInfoElement (node,className){
    const elem = document.createElement(node);
    elem.className = className;
    return elem;
  };

  createBeerNameElement(node,className, name){
    const elem = document.createElement(node);
    elem.innerText = name;
    elem.className = className;
    return elem;
  };

  createMetricElement({name,style}){
    const metricsBlock = document.createElement('div');
    metricsBlock.className = 'metrics';

    const beer_metric = document.createElement('span');
    beer_metric.className = 'beer__mertric metrics__metric';
  
    const metric_name = document.createElement('span');
    metric_name.className = 'metrics__name metrics__name--beer';
    metric_name.innerText = `${name}: `;
  
    const metric_data = document.createElement('span');
    metric_data.className = 'metric__data';
  
    switch (name) {
      case 'ABV':
        metric_data.innerText = `${style.abvMin || ''}-${style.abvMax || ''}`;
        break;
      case 'IBU':
        metric_data.innerText = `${style.ibuMin || ''}-${style.ibuMax || ''}`;
        break;
      case 'OG':
        metric_data.innerText = `${style.ogMin || '-'}`;
        break;
      case 'SRM':
        metric_data.innerText = `${style.srmMin || ''}-${style.srmMax || ''}`;
        break;
      default:
        break;
    }
    beer_metric.appendChild(metric_name);
    beer_metric.appendChild(metric_data);
  
    return beer_metric;
  }

  createCommonInfoElement(node,className, beerData){
    const elem = document.createElement(node);
    const _beerData = Object.assign({}, beerData);
    const metrics = [{
        name: 'ABV',
        style: _beerData.style
      },
      {
        name: 'IBU',
        style: _beerData.style
      },
      {
        name: 'OG',
        style: _beerData.style
      },
      {
        name: 'SRM',
        style: _beerData.style
      }
    ];
  
    const metricElements = metrics.map(this.createMetricElement);
    metricElements.forEach((metricElement) => {
      elem.appendChild(metricElement);
    });
  
    elem.className = className;
    return elem;
  }

  onClick(e){
    const promise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', `api/beerModal/${this.beerId}`);
      request.send();
      request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
          const response = request.responseText;
          if (response) {
            resolve(response)
          } else {
            reject(new Error("Something went wrong"))
          }
        };
      }
    })

    promise
    .then( html => {
        const modal = document.getElementById('modal');
        const body  = document.body;
        modal ? modal.innerHTML = html : null;
        modal.classList.toggle('modal--close');
        body.classList.toggle('body--fixed');
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
  let url = 'api/beers';
  
  if (value) {
    url += `?name=${value}`
  }

  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
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