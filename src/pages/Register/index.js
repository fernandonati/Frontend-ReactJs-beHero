import React, {useState}  from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';


export default function Register() {    
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsapp] = useState('');
    const [city,setCity] = useState('');
    const [uf,setEstate] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault(); //to prevent a default of form.
        
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        
        //send to API.
        try {
           const response = await api.post('ongs',data);
            alert(`Your ID is: ${response.data.id}`);    
            history.push('/'); //redirect to / 
        }
        catch (err) {
            alert(`Error on register: ${err}` );
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt ="Be the Hero"/>
                    <h1>Register</h1>
                    <p>Register on the platform and show people how they can help your organization.</p>
                    <Link to="/" className="default-link">
                       <FiArrowLeft size={16} color="#E02041" />
                        Return to Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="ONG Name"
                           value = {name}
                           onChange={e =>setName(e.target.value)} 
                    />
                    <input type="email" placeholder="E-mail" 
                           value = {email}
                           onChange={e =>setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp" 
                           value = {whatsapp}
                           onChange={e =>setWhatsapp(e.target.value)}                    
                    />                    
                    <div className="input-group">
                        <input placeholder="City"
                               value = {city}
                               onChange={e =>setCity(e.target.value)}                    
                        />
                        <input className="small-combo" 
                               placeholder="Estate"
                               value = {uf}
                               onChange={e =>setEstate(e.target.value)}                    />
                    </div>
                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    ) 
}