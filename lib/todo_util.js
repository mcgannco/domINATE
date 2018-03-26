$l('.todo-form').on('submit', (e)=>{
  e.preventDefault();
  addTodo();
  $l('.todo-input').arr[0].value = "";
});

const addTodo = () => {
  const input = $l('.todo-input').arr[0].value;
  $l('ul').append(`<div class="single-todo">${input}
    <button class="remove-todo">&#10003;</button>
    </div>`);
  $l('.remove-todo').on('click', (e) => {
    e.preventDefault();
    const toDelete = e.target.parentElement
    removeTodo(toDelete);
  });
};

const removeTodo = (toDelete) => {
  toDelete.remove();
};
