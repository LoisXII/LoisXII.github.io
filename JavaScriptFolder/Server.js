const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const dataFilePath = path.join(__dirname, 'data.json');

// Serve the static files





// end of static files

// Load existing posts from the JSON file


let postsData = [];
try {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    postsData = JSON.parse(data);
} catch (error) {
    console.error('Error reading data file:', error);
}

// Save posts to the JSON file
function savePosts() {
    fs.writeFileSync(dataFilePath, JSON.stringify(postsData, null, 2), 'utf8');
}

// API endpoint to get posts
app.get('/api/posts', (req, res) => {
    res.json(postsData);
});

// API endpoint to create a new post
app.post('/api/posts', (req, res) => {
    const newPost = req.body;
    newPost.id = postsData.length + 1;
    newPost.reactions = 0;
    newPost.reactionsByUser = new Set();
    newPost.comments = [];
    newPost.date = new Date();
    postsData.push(newPost);

    savePosts();

    res.json(newPost);
});

// Serve the index.html file for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to react to a post
app.post('/api/posts/react/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);
    const userId = req.body.userId;

    const post = postsData.find(post => post.id === postId);
    if (post && !post.reactionsByUser.has(userId)) {
        post.reactions++;
        post.reactionsByUser.add(userId);

        savePosts();

        res.json(post);
    } else {
        res.status(400).json({ error: 'Invalid request' });
    }
});

// API endpoint to comment on a post
app.post('/api/posts/comment/:postId', (req, res) => {
    const postId = parseInt(req.params.postId);
    const userId = req.body.userId;
    const commentText = req.body.commentText;

    const post = postsData.find(post => post.id === postId);
    if (post) {
        const comment = { user: userId, text: commentText };
        post.comments.push(comment);

        savePosts();

        res.json(post);
    } else {
        res.status(400).json({ error: 'Invalid request' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});