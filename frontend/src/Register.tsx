import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        console.log("handling submit");

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: 'test@example.com' }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

        // if (response.ok) {
        //     const data = await response.json();
        //     alert(data.message);

        //     navigate(`/user/${data}`);
        // } else {
        //     alert('Failed to register');
        // }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
            Email:
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </label>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;