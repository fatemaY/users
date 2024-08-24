import { useState } from "react";
import './form.css';  // Import the CSS file

function MyForm() {
  const [inputs, setInputs] = useState({});
  const [response, setResponse] = useState(null);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(inputs);

    try {
      const response = await fetch('http://localhost:3000/haiku/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="pink-form">
      <label>Enter your name:
        <input 
          type="text" 
          name="name" 
          value={inputs.name || ""} 
          onChange={handleChange}
        />
      </label>

      <label>Enter your age:
        <input 
          type="number" 
          name="age" 
          value={inputs.age || ""} 
          onChange={handleChange}
        />
      </label>

      <label>Enter your email:
        <input 
          type="email" 
          name="mail" 
          value={inputs.mail || ""} 
          onChange={handleChange}
        />
      </label>

      <label>Enter your average:
        <input 
          type="number" 
          name="avg" 
          value={inputs.avg || ""} 
          onChange={handleChange}
        />
      </label>

      <input type="submit" value="Submit" className="pink-button" />
      <h3>{response && response.success}</h3>
    </form>
  );
}

export default MyForm;
