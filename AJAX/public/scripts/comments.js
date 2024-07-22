// fetching and displaying comments using ajax

const loadCommentBtn = document.getElementById('load-comment-btn');
const commentSectionEle = document.getElementById('comments');
const commentsFormEle = document.querySelector('#comments-form form');
const commentTitleEle = document.getElementById('title');
const commentTextEle = document.getElementById('text');

function createCommentsList(comments){
    const commentListEle = document.createElement('ol');

    for(const comment of comments){
        const commentEle = document.createElement('li');

        commentEle.innerHTML = `
            <article class="comment-item">
                <h2>${comment.title}</h2>
                <p>${comment.text}</p>
            </article>
        `;

        commentListEle.appendChild(commentEle);
    }

    return commentListEle;
}


// AJAX reqeust to server to fetch data
// AJAX is async
async function fetchCommentForPost(){
    const postId = loadCommentBtn.dataset.postid; // to access the data attribute of the button element 
    
    try{ // for technical problems
        const response = await fetch(`/posts/${postId}/comments`); // this will send a get request to the url
        // an http request invoked by our own js code

        if(!response.ok){
            alert('Fetching comments failed!');
            return;
        }

        const responseData = await response.json(); // to decode data encoded in json to convert to JS values
        // console.log(responseData);

        if(responseData && responseData.length > 0){
            const commentListEle = createCommentsList(responseData)
        
            commentSectionEle.innerHTML = '';
            commentSectionEle.appendChild(commentListEle);
        } else {
            commentSectionEle.firstElementChild.textContent =
                'We could not find any comments. Maybe add one?';
        }
    }catch(error){
        alert('Getting comments failed - try again');
    }
}

async function saveComment(event){
    event.preventDefault(); // to prevent default behaviour of the form
    const postId = commentsFormEle.dataset.postid; // to access the data attribute of the button element 
    
    const enteredTitle = commentTitleEle.value;
    const enteredText = commentTextEle.value;
    // console.log(`title: ${enteredTitle}, text: ${enteredText}`);

    const comment = {title: enteredTitle, text: enteredText};
    
    try{ // error handling for technical problems - mobile device getting disconnected
        const response = await fetch(`/posts/${postId}/comments`, {
            method: 'POST', // by default set to GET
            body: JSON.stringify(comment), // encodes JS values into JSON -> data sent by the post request
            headers: { // metadata attached to req
                'Content-type': 'application/json' // ->json data
            }
        });

        if(response.ok){ // true when okay status code like 200 or 300ish
            fetchCommentForPost(); // to show comments after submitting
        } else{
            alert('Could not send comment!');
        }
    } catch(error){
        alert('Could not send request - maybe try again later!');
    }
}

loadCommentBtn.addEventListener('click', fetchCommentForPost);
commentsFormEle.addEventListener('submit', saveComment);