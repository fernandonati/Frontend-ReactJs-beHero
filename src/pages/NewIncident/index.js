import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

export default function NewIncident() {
const [title, setTitle] = useState('');
const [description, setDesc] = useState('');
const [value, setValue] = useState('');
const ongId = localStorage.getItem('ongId');
const history = useHistory();

async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
        title,
        description,
        value,
    };

    try {
        await api.post('incidents',data,{
            headers: {
                Authorization: ongId
            }
        })
        history.push('/profile');    
    }
    catch (err) {
        alert('Error on register new incident.'+err);
    }
}

return ( 
<div className="new-incident-container">
    <div className="content">
        <section>
            <img src={logoImg} alt ="Be the Hero"/>
            <h1>New Incident</h1>
            <p>Enter with the details about this new incident.</p>
            <Link to="/profile" className="default-link">
                <FiArrowLeft size={16} color="#E02041" />
                Return to Home
            </Link>
        </section>

        <form onSubmit={handleNewIncident}>
            <input 
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                />
            <textarea 
                placeholder="Description" 
                value={description}
                onChange={e => setDesc(e.target.value)}
                />
            <input 
                placeholder="Value $" 
                value={value}
                onChange={e => setValue(e.target.value)}
                />
            
            <button className="button" type="submit">Register</button>
        </form>
    </div>
</div>
);
}