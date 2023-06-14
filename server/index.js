const express = require('express');
const { existsSync } = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json())

const tasksRouter = require('./routes/tasks')
const userRouter = require('./routes/users')
// stages for updating client files:
// 1. go to client folder, run: npm run build
// 2. copy 'dist' folder to server folder
// 3. run: npm start or npm run dev

if (!existsSync(path.join(__dirname, 'dist'))) {
    console.log('Building client files...');
    execSync('cd ' + path.join(__dirname, '../client' + ' && npm run build'));
    console.log('Copying dist folder from client to server...');
    execSync('cp -r ../client/dist .');
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use('/api/tasks', tasksRouter)
app.use('/api/users', userRouter)
app.listen(5000, () => console.log('Server started on port 5000'));