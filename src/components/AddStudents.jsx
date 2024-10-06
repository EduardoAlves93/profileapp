import React, { useState } from 'react';
import axios from 'axios';

const AddStudents = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            // Make an API call to your add_user endpoint
            const response = await axios.post('https://25p29nw5mg.execute-api.us-east-1.amazonaws.com/prod/create_user', {
                name,
                password,
                isAdmin: false  // Since we are adding a student, set isAdmin to false
            });

            if (response.status === 200) {
                setSuccess('Aluno Adicionado.');
                setName('');
                setPassword('');
            } else {
                setError('Não foi possível adicionar aluno.');
            }
        } catch (error) {
            console.error('Failed to add student:', error);
            setError('Não foi possível adicionar aluno.');
        }
    };

    return (
        <div className="container">
            <h2>Adicionar Alunos</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome do Aluno"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Adicionar Aluno</button>
            </form>
            {success && <p className="success">{success}</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default AddStudents;
