const apiURL = "https://jsonplaceholder.typicode.com";

async function fetchPosts(){
    try {
        const response = await fetch(`${apiURL}/posts?_limit=10`)
        const json = await response.json();
        json.forEach((post) => renderPost(post.title, post.id, post.element, post.userId));
    } catch (error) {
        alert("Erro ao carregar posts: ", error);
    }
}

function renderPost(title, id, userId) {
    const lp = document.createElement("lp");
    lp.innerHTML = `
        <span>${title}</span>
    `
}

fetchPosts();