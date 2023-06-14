const express = require('express');
const { existsSync } = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));

// stages for updating client files:
// 1. go to client folder, run: npm run build
// 2. copy 'dist' folder to server folder
// 3. run: npm start or npm run dev


// if dist folder exists in client folder, copy it to server folder
// if (!existsSync(path.join(__dirname, '../client/dist'))){
//     console.log('Building client files...');
//     execSync('cd ' + path.join(__dirname, '../client' + ' && npm run build'));
// }
if (!existsSync(path.join(__dirname, 'dist'))) {
    console.log('Building client files...');
    execSync('cd ' + path.join(__dirname, '../client' + ' && npm run build'));
    console.log('Copying dist folder from client to server...');
    execSync('cp -r ../client/dist .');
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(5000, () => console.log('Server started on port 5000'));