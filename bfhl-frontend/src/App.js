import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const res = await axios.post('https://testbfhl.herokuapp.com/bfhl', JSON.parse(input));
            setResponse(res.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSelectChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    return (
        <div className="App">
            <h1>Your Roll Number</h1>
            <textarea value={input} onChange={handleInputChange} placeholder="Enter JSON data here"></textarea>
            <button onClick={handleSubmit}>Submit</button>
            {response && (
                <>
                    <select multiple={true} onChange={handleSelectChange}>
                        <option value="alphabets">Alphabets</option>
                        <option value="numbers">Numbers</option>
                        <option value="highest_alphabet">Highest Alphabet</option>
                    </select>
                    <div>
                        {selectedOptions.includes('alphabets') && (
                            <p>Alphabets: {response.alphabets.join(', ')}</p>
                        )}
                        {selectedOptions.includes('numbers') && (
                            <p>Numbers: {response.numbers.join(', ')}</p>
                        )}
                        {selectedOptions.includes('highest_alphabet') && (
                            <p>Highest Alphabet: {response.highest_alphabet.join(', ')}</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
