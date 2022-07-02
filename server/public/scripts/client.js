$(document).ready(function () {
  console.log('jQuery sourced.');
  getToDos();
});

function clickHandler() {
  $('#submit-btn').on('click', handleSubmit);
}

function handleSubmit() {
  console.log('Submit button clicked.');
  let newTask = {};
  todos.name = $('#name').val();
  todos.description = $('#description').val();
  todos.description = $('#date').val();
  addToDo(newTask);
}
//get request
function getToDos() {
  $.ajax({
    type: 'GET',
    url: '/todos',
  })
    .then(function (response) {
      console.log(response);
      renderDOM(response);
    })
    .catch(function (error) {
      console.log('error in GET', error);
    });
}

//post
function addToDo(toDoTask) {
  $.ajax({
    type: 'POST',
    url: '/todos',
    data: toDoTask,
  })
    .then(function (response) {
      console.log('Response from server.', response);
      renderDOM();
    })
    .catch(function (error) {
      console.log('Error in POST', error);
      alert('Unable to add book at this time. Please try again later.');
    });
}

//append

function renderDOM(todos) {
  $('#table').empty();

  for (let i = 0; i < todos.length; i += 1) {
    let todo = todos[i];
    // For each todo, append a new row to our table
    $('#table').append(`
        <tr>
          <td>${todo.name}</td>
          <td>${todo.description}</td>
          <td>${todo.completed}</td>
          <td>${todo.dateCreated}</td>
          <td>
          <button data-id=${todos[i].id}
          data-completed="completed"
          class="btn-completed">Completed?</button>
          <button data-id=${todos[i].id}
          data-delete="delete"
          class="btn-delete">Delete</button>
          </td>
        </tr>
      `);
  }
}
