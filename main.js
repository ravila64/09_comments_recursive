// arreglo de objetos
const comments = [];

const inputContainer = document.createElement("div");
const input = document.createElement("input");
const commentsContainer=document.querySelector("#comments-container");

input.classList.add("input");

input.addEventListener("keydown", (e) => {
    handleEnter(e,null);
});

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);

function handleEnter(e, current){
    if(e.key==='Enter' && e.target.value!==''){
        const newComment = {
            text: e.target.value,
            likes: 0,
            responses: []
        }
        if(current===null){
            comments.unshift(newComment);
        }else{
            current.responses.unshift(newComment);
        }
        e.target.value = '';
        commentsContainer.innerHTML='';
        commentsContainer.appendChild(inputContainer);
        // mostrar comentarios
        // array comments y el padre  commentsContainer

        renderComments ( comments, commentsContainer);
    }
}

function renderComments(arr, parent){
    arr.forEach(element => {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment-container');

        const responsesContainer = document.createElement('div');
        responsesContainer.classList.add('responses-container');

        const textContainer = document.createElement('div');
        textContainer.textContent = element.text;

        const replyButton = document.createElement('button');
        const likeButton = document.createElement('button');
        const actionsContainer = document.createElement('div');

        replyButton.textContent = 'Reply';
        //likeButton.textContent = 'Like';
        likeButton.textContent = `${element.likes > 0 ? `${element.likes} likes`:"Like"}`;

        replyButton.addEventListener('click', e => {
            const newInput = inputContainer.cloneNode(true); 
            // hasta capa + interna=true, copia hijos
            newInput.value="";
            newInput.focus();
            newInput.addEventListener("keydown", (e) => {
                handleEnter(e, element);
            });
            // insertar elemento newInput, antes de responsesContainer
            commentContainer.insertBefore(newInput, responsesContainer);
         });

        likeButton.addEventListener('click', e => { 
            element.likes++;
            likeButton.textContent = `${element.likes > 0 ? `${element.likes} likes`:"Like"}`;
        });

        // extendernos con las respuestas APPEND crear estructura de mi DOM
        commentContainer.appendChild(textContainer);
        commentContainer.appendChild(actionsContainer);
        actionsContainer.appendChild(replyButton);
        actionsContainer.appendChild(likeButton);

        commentContainer.appendChild(responsesContainer);
        // dibujar las respuestas con esta estructura Y APLICAR recursividad
         if(element.responses.length > 0){
            renderComments(element.responses, responsesContainer);
         }
         parent.appendChild(commentContainer);
    });
    console.log(comments);
}

