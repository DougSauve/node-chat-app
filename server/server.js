const express = require('express');
const path = require('path');

const port = process.env.PORT || 4200;
const publicPath = path.join(__dirname + '/../public');


const app = express();

app.use(express.static(publicPath, {index: 'index.html'}));

// app.get('/', (req, res) => {
//   res.sendFile(publicPath + '/index.html');
// });

app.listen(port, () => console.log(`app is up on port ${port}.`));
