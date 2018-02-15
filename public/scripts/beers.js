const beerWrapper = document.querySelector('#beer-list');

const createElement = (node, className) => {
  const elem = document.createElement(node);
  elem.className = className;
  return elem;
};

const createImageElement = (className, beerLabels) => {
  const elem = createElement('img', className);
  const src = beerLabels && beerLabels.medium;

  elem.src = src || './images/beer.png';

  return elem;
};

const createBeerNameElement = (node, className, name) => {
  const elem = createElement('div', 'beer__title');
  elem.innerText = name;

  return elem;
};

const createMetricElement = ({ name, style }) => {
  const beerMetric = createElement('span', 'beer__mertric metrics__metric');
  const metricName = createElement('span', 'metrics__name metrics__name--beer');
  const metricData = createElement('span', 'metric__data');

  metricName.innerText = `${name}: `;
  metricData.className = 'metric__data';

  switch (name) {
    case 'ABV':
      metricData.innerText = `${style.abvMin || ''}-${style.abvMax || ''}`;
      break;
    case 'IBU':
      metricData.innerText = `${style.ibuMin || ''}-${style.ibuMax || ''}`;
      break;
    case 'OG':
      metricData.innerText = `${style.ogMin || '-'}`;
      break;
    case 'SRM':
      metricData.innerText = `${style.srmMin || ''}-${style.srmMax || ''}`;
      break;
    default:
      break;
  }
  beerMetric.appendChild(metricName);
  beerMetric.appendChild(metricData);

  return beerMetric;
};

const createCommonInfoElement = (node, className, beerData) => {
  const elem = createElement(node, className);
  const metrics = [{
    name: 'ABV',
    style: beerData.style,
  },
  {
    name: 'IBU',
    style: beerData.style,
  },
  {
    name: 'OG',
    style: beerData.style,
  },
  {
    name: 'SRM',
    style: beerData.style,
  },
  ];

  const metricElements = metrics.map(createMetricElement);
  metricElements.forEach((metricElement) => {
    elem.appendChild(metricElement);
  });

  return elem;
};

class Beer {
  constructor(props) {
    this.beerElement = createElement('div', 'beer beer-list__beer');
    this.beerImage = createImageElement('beer__image', props.labels);
    this.beerInfo = createElement('div', 'beer__information');
    this.beerName = createBeerNameElement('span', 'beer__title', props.name);
    this.beerCommonInfo = createCommonInfoElement('div', 'beer__common-info', props);
    this.fullBeerInfo = createElement('div', 'beer__full-info');
    this.fullBeerInfo = createElement('div', 'beer__underline');
    this.beerId = props._id;
  }

  onClick() {
    const promise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', `api/beerModal/${this.beerId}`);
      request.send();
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          const response = request.responseText;
          if (response) {
            resolve(response);
          } else {
            reject(new Error('Something went wrong'));
          }
        }
      };
    });

    promise
      .then((html) => {
        const modal = document.getElementById('modal');
        const body  = document.body;
        modal.innerHTML = modal && html;
        modal.classList.toggle('modal--close');
        body.classList.toggle('body--fixed');
      })
      .catch(err => console.dir(err));
  }

  render() {
    this.beerElement.appendChild(this.beerImage);
    this.beerInfo.appendChild(this.beerName);
    this.beerInfo.appendChild(this.beerCommonInfo);
    this.beerElement.appendChild(this.beerInfo);
    this.beerElement.appendChild(this.fullBeerInfo);
    this.beerElement.addEventListener('click', e => this.onClick(e));

    return this.beerElement;
  }
}

const createBeerElement = (_beer, i) => {
  const beer = new Beer(_beer);
  beer.idx = i;
  return beer.render();
};

const fetchData = (dataArray, fn) => dataArray.map(fn);

class Beers {
  constructor(dataArray) {
    this.container = document.createElement('div');
    this.container.className = 'beerContainer';
    this.beerList = fetchData(dataArray, createBeerElement);
    this.addElement = this.addElement.bind(this);
  }

  addElement(beer) {
    this.container.appendChild(beer);
  }

  render() {
    this.beerList.forEach(this.addElement);
    if (beerWrapper.children.item(0)) {
      beerWrapper.replaceChild(this.container, beerWrapper.children.item(0));
    } else {
      beerWrapper.appendChild(this.container);
    }
  }
}

export default function searchBeer(value) {
  let url = 'api/beers';

  if (value) {
    url += `?name=${value}`;
  }

  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        let response = JSON.parse(request.responseText);
        if (response) {
          resolve(response);
        } else {
          reject(new Error('some went wrong'));
        }
      }
    };
  });

  promise
    .then((beers) => {
      if (beers.length) {
        const beerList = new Beers(beers);
        beerWrapper.innerText = '';
        beerList.render(beerWrapper);
      } else {
        beerWrapper.innerText = 'Beers not found :c';
      }
    })
    .catch(err => console.error(err));
}
