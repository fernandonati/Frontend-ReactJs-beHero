import React, {useState} from 'react';
import { Link,useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
   const [id, setId] = useState(''); 
   const history = useHistory();

   async function handleLogin(e) {
      e.preventDefault();

      try {
        const response = await api.post('sessions',{ id });

        //store data.
        localStorage.setItem('ongId',id);
        localStorage.setItem('ongName',response.data.name);
        history.push('/profile');
      }
      catch(err) {
        alert('Login failure');
      }
   }

    return (
      <div className="logon-container">
          <section className="form">
            <img src={logoImg} alt ="Be The Hero"/>
            <form onSubmit={handleLogin}>
                <h1>Logon</h1>

                <input placeholder="Enter your Id"
                       value={id}
                       onChange={e => setId(e.target.value)} />
                <button className="button" type="submit">Enter</button>

                <Link to="/register" className="default-link">
                    <FiLogIn size={16} color="#E02041" />
                    New user
                </Link>
            </form>
          </section>
          <img src={heroesImg} alt="Heroes"/>
      </div>
    );
}