async function buscarTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => response.json())
      .then((json) => console.log(json));
}

buscarTodos();