import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './Login.css'


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(email, password);
        if(success) {
            navigate('/');
        } else {
            setError('Credenciales incorrectas. Intente de nuevo')
        }
    };

    return (
        <div className="login-container">
            <div className="login-image">
                <h1>BUK</h1>
                <p>Secure BUK access</p>
            </div>
            <div className="login-form-container">
                <form onSubmit={handleSubmit} className="login-form glass-panel">
                    <h2>Bienvenido!</h2>
                    <p>Por favor, digite sus credenciales</p>

                    {error && <div className="error-msg">{error}</div>}
                    <div className="form-group">
                        <label>Dirección de correo electronico</label>
                        <input 
                            type="email" 
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@buk.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="admin123"
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">Ingresar</button>
                </form>
            </div>
        </div>
    )
}