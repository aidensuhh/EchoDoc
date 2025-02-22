const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Define a sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Additional routes can be added here
// app.use('/api', require('./routes/api'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
