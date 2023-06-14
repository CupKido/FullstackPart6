const express = require('express');

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {

    res.send('Hello World!');

});


app.listen(5000, () => console.log('Server started on port 5000'));