/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__beers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blocks_modal_modal_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_style_css__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__styles_style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__styles_style_css__);




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
let newSearchBeer = myThrotlle(__WEBPACK_IMPORTED_MODULE_0__beers__["a" /* default */], 500);

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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = searchBeer;
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
    let metricsBlock = document.createElement('div');
    metricsBlock.className = 'metrics';

    let beer_metric = document.createElement('span');
    beer_metric.className = 'beer__mertric metrics__metric';
  
    let metric_name = document.createElement('span');
    metric_name.className = 'metrics__name metrics__name--beer';
    metric_name.innerText = `${name}: `;
  
    let metric_data = document.createElement('span');
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
    let elem = document.createElement(node);
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
  
    let metricElements = metrics.map(this.createMetricElement);
    metricElements.forEach((metricElement) => {
      elem.appendChild(metricElement);
    });
  
    elem.className = className;
    return elem;
  }

  onClick(e){
    let promise = new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', `api/beerModal/${this.beerId}`);
      request.send();
      request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
          let response = request.responseText;
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
        let modal = document.getElementById('modal');
        let body  = document.body;
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

function searchBeer(value) {
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

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony default export */ var _unused_webpack_default_export = ((function(){
  let modalWindow = document.getElementById('modal');
  let body = document.body;
  modalWindow.addEventListener('click', closeModal);
  
  function closeModal(e){
    const target = e.target;

    if(modalWindow && target.id == 'modal-overlay' || target.id == 'modal__button' ){
      while(modalWindow.firstChild){
        modalWindow.removeChild(modalWindow.firstChild)
      }
       modalWindow.classList.toggle('modal--close');
       body.classList.toggle('body--fixed');
    }
  }
})());


/***/ }),
/* 3 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);