let url = 'https://basic-todo-api.vercel.app/api/todo';

let body = document.querySelector('.inner-body');

let checkBox = document.querySelector('.checkInput');

function displayUI(data) {
  let todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  let todoInput = document.createElement('input');
  todoInput.type = 'checkbox';
  todoInput.id = 'id';

  let todoLabel = document.createElement('label');
  todoLabel.setAttribute('for', 'todo');
  todoLabel.innerText = data.title;
  todoLabel.addEventListener('dblclick', () => {
    todoLabel.textContent = '';

    let newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.placeholder = 'Enter New Todo Here';
    newInput.style.width = '150px';
    newInput.style.padding = '10px';

    newInput.classList.add('newInput');
    todoLabel.appendChild(newInput);

    newInput.addEventListener('keydown', () => onPut(url, data._id, todoInput));
  });

  let todoButton = document.createElement('button');
  todoButton.innerHTML = 'Close';

  todoButton.addEventListener('click', () => onBtn(todoDiv, line, data._id));

  let line = document.createElement('div');
  line.classList.add('dotted-line');

  todoDiv.append(todoInput, todoLabel, todoButton);
  body.append(todoDiv, line);
}

function onBtn(todoDiv, line, id) {
  todoDiv.innerHTML = '';
  line.style.display = 'none';
  Delete(url, id);
}

function Delete(url, id) {
  fetch(url + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function onPut(url, id, check) {
  check.checked = true;
  let newVal = event.target.value;
  let data = {
    todo: {
      title: `${newVal}`,
      isCompleted: true,
    },
  };
  if (event.keyCode === 13) {
    fetch(url + `/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).finally((ele) => {
      window.location.reload();
    });
  }
}

function dataPost(url) {
  checkBox.addEventListener('keydown', function (event) {
    let value = event.target.value;
    let data = {
      todo: {
        title: `${value}`,
        isCompleted: true,
      },
    };
    if (event.keyCode === 13) {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).finally((ele) => {
        window.location.reload();
      });
    }
  });
}

dataPost(url);

function Get(url) {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((ele) => {
      ele.todos.map((todo) => {
        displayUI(todo);
      });
      //   Post(ele.todos);
    });
}

Get(url);
