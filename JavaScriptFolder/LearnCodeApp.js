document.addEventListener('DOMContentLoaded', function() {
    const postSection = document.getElementById('postSection');

    // Sample posts data
    let postsData = [];

    // Create post from user input
    window.createPost = function() {
        const postContent = document.getElementById('postContent').value;

        if (postContent.trim() !== '') {
            const postData = {
                id: postsData.length + 1,
                content: postContent,
                type: 'text', // Default type is text
                reactions: 0,
                reactionsByUser: new Set(),
                comments: [],
                date: new Date(),
            };

            createPostElement(postData);
            postsData.push(postData);

            // Clear the textarea after posting
            document.getElementById('postContent').value = '';
        }
    };

    // Handle file selection for image and video upload
    window.handleFileSelect = function(event) {
        const file = event.target.files[0];

        if (file) {
            const postData = {
                id: postsData.length + 1,
                content: URL.createObjectURL(file),
                type: file.type.startsWith('image/') ? 'image' : 'video',
                reactions: 0,
                reactionsByUser: new Set(),
                comments: [],
                date: new Date(),
            };

            createPostElement(postData);
            postsData.push(postData);
        }
    };

    // Create a post element based on the post data
    function createPostElement(postData) {
        const post = document.createElement('div');
        post.classList.add('post');

        // Create post content based on the type (text, image, video)
        if (postData.type === 'image') {
            const image = document.createElement('img');
            image.src = postData.content;
            post.appendChild(image);
        } else if (postData.type === 'video') {
            const video = document.createElement('video');
            video.src = postData.content;
            video.controls = true;
            post.appendChild(video);
        } else {
            const contentParagraph = document.createElement('p');
            contentParagraph.innerText = postData.content;
            post.appendChild(contentParagraph);
        }

        // Add post actions (react, comment, share, date)
        const postActions = document.createElement('div');
        postActions.classList.add('post-actions');

        const reactBtn = document.createElement('button');
        reactBtn.innerText = `React (${postData.reactions})`;
        reactBtn.addEventListener('click', function() {
            // Check if the user has already reacted
            if (!postData.reactionsByUser.has('user123')) {
                postData.reactions++;
                postData.reactionsByUser.add('user123');
                updatePost(post, postData);
            } else {
                alert('You have already reacted to this post.');
            }
        });

        const commentBtn = document.createElement('button');
        commentBtn.innerText = `Comment (${postData.comments.length})`;
        commentBtn.addEventListener('click', function() {
            const commentText = prompt('Enter your comment:');
            if (commentText !== null) {
                const comment = {
                    user: 'user123', // Replace with user authentication logic
                    text: commentText,
                };
                postData.comments.push(comment);
                updatePost(post, postData);
            }
        });

        const shareBtn = document.createElement('button');
        shareBtn.innerText = 'Share';
        shareBtn.addEventListener('click', function() {
            const postLink = window.location.href + '#' + postData.id;
            copyToClipboard(postLink);
            alert('Post link copied to clipboard!');
        });

        const dateSpan = document.createElement('span');
        dateSpan.innerText = postData.date.toLocaleString();

        postActions.appendChild(reactBtn);
        postActions.appendChild(commentBtn);
        postActions.appendChild(shareBtn);
        postActions.appendChild(dateSpan);

        post.appendChild(postActions);

        // Add a comment section
        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');
        postData.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerText = `${comment.user}: ${comment.text}`;
            commentSection.appendChild(commentElement);
        });
        post.appendChild(commentSection);

        postSection.appendChild(post);
    }

    // Update post content with the latest data
    function updatePost(postElement, postData) {
        postElement.innerHTML = ''; // Clear existing content

        // Recreate post content based on the type (text, image, video)
        if (postData.type === 'image') {
            const image = document.createElement('img');
            image.src = postData.content;
            postElement.appendChild(image);
        } else if (postData.type === 'video') {
            const video = document.createElement('video');
            video.src = postData.content;
            video.controls = true;
            postElement.appendChild(video);
        } else {
            const contentParagraph = document.createElement('p');
            contentParagraph.innerText = postData.content;
            postElement.appendChild(contentParagraph);
        }

        // Add updated post actions (react, comment, share, date)
        const postActions = document.createElement('div');
        postActions.classList.add('post-actions');

        const reactBtn = document.createElement('button');
        reactBtn.innerText = `React (${postData.reactions})`;
        reactBtn.addEventListener('click', function() {
            // Check if the user has already reacted
            if (!postData.reactionsByUser.has('user123')) {
                postData.reactions++;
                postData.reactionsByUser.add('user123');
                updatePost(postElement, postData);
            } else {
                alert('You have already reacted to this post.');
            }
        });

        const commentBtn = document.createElement('button');
        commentBtn.innerText = `Comment (${postData.comments.length})`;
        commentBtn.addEventListener('click', function() {
            const commentText = prompt('Enter your comment:');
            if (commentText !== null) {
                const comment = {
                    user: 'user123', // Replace with user authentication logic
                    text: commentText,
                };
                postData.comments.push(comment);
                updatePost(postElement, postData);
            }
        });

        const shareBtn = document.createElement('button');
        shareBtn.innerText = 'Share';
        shareBtn.addEventListener('click', function() {
            const postLink = window.location.href + '#' + postData.id;
            copyToClipboard(postLink);
            alert('Post link copied to clipboard!');
        });

        const dateSpan = document.createElement('span');
        dateSpan.innerText = postData.date.toLocaleString();

        postActions.appendChild(reactBtn);
        postActions.appendChild(commentBtn);
        postActions.appendChild(shareBtn);
        postActions.appendChild(dateSpan);

        postElement.appendChild(postActions);

        // Add updated comment section
        const commentSection = document.createElement('div');
        commentSection.classList.add('comment-section');
        postData.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerText = `${comment.user}: ${comment.text}`;
            commentSection.appendChild(commentElement);
        });
        postElement.appendChild(commentSection);
    }

    // Helper function to copy text to clipboard
    function copyToClipboard(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }
});