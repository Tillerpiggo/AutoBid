import React, { useState, FormEvent } from 'react';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message);
        } else {
            alert('Failed to register');
        }
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