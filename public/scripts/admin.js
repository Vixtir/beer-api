const importElems = {
  categories: document.getElementById('Categories'),
  styles: document.getElementById('Styles'),
  beers: document.getElementById('Beers'),
}

const importCategories = () => {
  const url = '/import/categories';
  const token = localStorage.getItem('token');
  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Authorization', `Bearer ${token}`);
    request.send();

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const response = JSON.parse(request.responseText);
        if (response) {
          resolve(response);
        } else {
          reject(new Error('some went wrong'));
        }
      }
    };
  });
};

const importStyles = () => {
  const url = '/import/styles';
  const token = localStorage.getItem('token');
  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Authorization', `Bearer ${token}`)
    request.send();
  
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const response = JSON.parse(request.responseText);
        if (response) {
          resolve(response);
        } else {
          reject(new Error('some went wrong'));
        }
      }
    };
  });
};

const importBeers = () => {
  const url = '/import/beers';
  const token = localStorage.getItem('token');
  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader('Authorization', `Bearer ${token}`);
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
};

importElems.categories.addEventListener('click', importCategories);
importElems.styles.addEventListener('click', importStyles);
importElems.beers.addEventListener('click', importBeers);

