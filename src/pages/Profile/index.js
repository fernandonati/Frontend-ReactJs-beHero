import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower,FiTrash2 } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css'; 

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
      api.get('profile',{
          headers: {
              Authorization:  ongId,
          }
      }).then(response =>{
        setIncidents(response.data);
      })  
    }, [ongId]); //what, when(if empty, run one time)


    async function handleDelete(id) {
        try {
           await api.delete(`incidents/${id}`,{
               headers: {
                   Authorization: ongId
               }
           });                    
           setIncidents(incidents.filter(incident => incident.id !== id));
        }
        catch (err) {
            alert('Error on delete');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Welcome, {ongName} </span>

                <Link className="button" to="/incidents/new">New case</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Records</h1>
            <ul>
                {incidents.map(incident => (
                 <li key={incident.id}>
                    <strong>CASE:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIPTION</strong>
                    <p>{incident.description}</p>

                    <strong>VALUE:</strong>
                    <p>{Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD'}).format(incident.value)}</p>                     
                    <button onClick={() => handleDelete(incident.id) /* use arow to create internal function, else delete onshow */ }  type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                 </li>

                ))}                
            </ul>  
        </div>
    );
}