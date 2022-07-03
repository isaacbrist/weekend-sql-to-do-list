$(document).ready(function () {
  console.log('jQuery sourced.');
  getTasks();
  clickHandler();
});

function clickHandler() {
  $('#submit-btn').on('click', handleSubmit);
  $('#table').on('click', '.completed-btn', markAsComplete);
  $('#table').on('click', '.delete-btn', deleteTask);
}

function handleSubmit() {
  console.log('Submit button clicked.');
  let tasks = {};
  tasks.name = $('#name').val();
  tasks.description = $('#description').val();
  // tasks.dateCreated = $('#date').val();
  addTasks(tasks);
}
//get request
function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
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
function addTasks(tasks) {
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: tasks,
  })
    .then(function (response) {
      console.log('Response from server.', response);
      getTasks();
    })
    .catch(function (error) {
      console.log('Error in POST', error);
      alert('Unable to add task at this time. Please try again later.');
    });
}
//PUT
function markAsComplete() {
  console.log('In markAsCompleted');
  const taskId = $(this).data('id');
  //PUT request
  $.ajax({
    method: 'PUT',
    url: `/tasks/${taskId}`,
  })
    .then(function () {
      getTasks();
      console.log('Finished markAsCompleted');
    })
    .catch(function (error) {
      alert('Error in markAsCompleted:', error);
    });
}
//DELETE
function deleteTask() {
  let taskId = $(this).data('id');
  $.ajax({
    method: 'DELETE',
    url: `/tasks/${taskId}`,
  })
    .then(function () {
      console.log('Deleted task!');
      getTasks();
    })
    .catch(function (error) {
      alert('error deleting:', error);
    });
}
//append

function renderDOM(tasks) {
  $('#table').empty();
  let completedTask = 'not-completed';
  for (let i = 0; i < tasks.length; i += 1) {
    let task = tasks[i];

    if (task.completed === true) {
      completedTask = 'completed';
    }
    // For each task, append a new row
 
    $('#table').append(`
        <tr class='${completedTask}'>
          <td>${task.name}</td>
          <td>${task.description}</td>
          <td>${task.completed}</td>
          <td>
          <button data-id=${tasks[i].id}
          data-completed="completed"
          class="completed-btn">Completed?</button>
          <button data-id=${tasks[i].id}
          data-delete="delete"
          class="delete-btn">Delete</button>
          </td>
        </tr>
      `);
    // Reset completed task so we don't continuously render the wrong class
    completedTask = 'not-completed';
  }
}
