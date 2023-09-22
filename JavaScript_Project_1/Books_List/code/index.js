(function () {
  let articleBody = document.querySelector('.article-body');
  let url = `https://www.anapioficeandfire.com/api/books`;

  function displayUI(data) {
    let articleDiv = document.createElement('div');
    articleDiv.classList.add('article');
    let h2 = document.createElement('h2');
    h2.innerHTML = data.name;
    let h3 = document.createElement('h3');
    h3.innerHTML = data.authors;

    let button = document.createElement('button');
    button.innerText = `Show Characters : ${data.characters.length} `;

    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('dropdown-content');
    buttonDiv.id = 'myDropdown';
    buttonDiv.style.display = 'none';

    const ul = document.createElement('ul');

    buttonDiv.append(ul);

    const close = document.createElement('button');
    close.id = 'closePopup';
    close.classList.add('close');
    close.textContent = 'X';

    const heading = document.createElement('p');
    heading.innerHTML = 'Characters List';
    heading.classList.add('heading');
    ul.append(heading);
    articleDiv.append(h2, h3, button);
    articleDiv.appendChild(buttonDiv);
    articleBody.append(articleDiv);

    button.addEventListener('click', function () {
      fetchForUI(data, ul, buttonDiv, close);
    });
  }

  function fetchForUI(data, ul, buttonDiv, close) {
    if (buttonDiv.style.display === 'block') {
      buttonDiv.style.display = 'none';
    } else {
      buttonDiv.style.display = 'block';
      ul.style.display = 'flex';
      ul.style.flexWrap = 'wrap';
    }

    let allcharacters = data.characters;
    let allNames = [];
    allcharacters.forEach((link) => {
      allNames.push(
        fetch(link).then((res) => {
          return res.json();
        })
      );
    });

    Promise.all(allNames)
      .then((ele) => {
        ele.forEach((singleObj) => {
          const li1 = document.createElement('li');
          li1.textContent = singleObj.name;
          ul.appendChild(li1);
          ul.appendChild(close);

          close.addEventListener('click', () => {
            buttonDiv.style.display = 'none';
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function beforeClick() {
    let dataObj = fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((news) => {
        news.map((obj) => {
          displayUI(obj);
        });
      });
  }

  beforeClick();
})();
