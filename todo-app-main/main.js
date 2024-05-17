ocument.addEventListener('DOMContentLoaded', () => {
  const newTodoInput = document.getElementById('new-todo');
  const todoList = document.getElementById('todo-list');
  const itemsLeft = document.getElementById('items-left');
  const clearCompletedButton = document.getElementById('clear-completed');
  const filters = document.querySelectorAll('.filter');

  const updateItemsLeft = () => {
      const totalItems = document.querySelectorAll('.todo-item').length;
      const completedItems = document.querySelectorAll('.todo-item.completed').length;
      itemsLeft.textContent = `${totalItems - completedItems} items left`;
  };

  const addTodo = (text) => {
      const todoItem = document.createElement('li');
      todoItem.classList.add('todo-item');

      const label = document.createElement('label');
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', () => {
          todoItem.classList.toggle('completed');
          updateItemsLeft();
      });

      const span = document.createElement('span');
      span.textContent = text;

      label.appendChild(checkbox);
      label.appendChild(span);
      todoItem.appendChild(label);
      todoList.appendChild(todoItem);
      updateItemsLeft();
  };

  newTodoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && newTodoInput.value.trim() !== '') {
          addTodo(newTodoInput.value.trim());
          newTodoInput.value = '';
      }
  });

  clearCompletedButton.addEventListener('click', () => {
      document.querySelectorAll('.todo-item.completed').forEach(item => item.remove());
      updateItemsLeft();
  });

  filters.forEach(filter => {
      filter.addEventListener('click', () => {
          filters.forEach(f => f.classList.remove('active'));
          filter.classList.add('active');

          const filterText = filter.textContent.toLowerCase();
          document.querySelectorAll('.todo-item').forEach(item => {
              switch (filterText) {
                  case 'all':
                      item.style.display = 'flex';
                      break;
                  case 'active':
                      item.style.display = item.classList.contains('completed') ? 'none' : 'flex';
                      break;
                  case 'completed':
                      item.style.display = item.classList.contains('completed') ? 'flex' : 'none';
                      break;
              }
          });
      });
  });

  updateItemsLeft();
});