const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define routes
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = 'john_doe_17091999';
    const email = 'john@xyz.com';
    const roll_number = 'ABCD123';

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, error: 'Invalid input format' });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[A-Za-z]$/.test(item));
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort().reverse()[0]] : [];

    return res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_alphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
