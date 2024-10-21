import './Form.css';
import { useState } from 'react';

function Form() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        gender: '',
    });
    const [message, setMessage] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }
        
        if (!formData.fullName || !formData.username || !formData.email || !formData.phoneNumber || !formData.password || !formData.gender) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/users/register', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setFormData({
                    fullName: '',
                    username: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    confirmPassword: '',
                    gender: '',
                });
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            setMessage('Erro ao conectar ao servidor');
        }
    };

    return (
        <>
            <h1 className="form-title">Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <div className="main-user-info">
                    <div className="user-input-box">
                        <label htmlFor="fullName">Nome Completo</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Digite seu nome completo"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="user-input-box">
                        <label htmlFor="username">Nome de Usuário</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Não utilize seu nome real"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="user-input-box">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="user-input-box">
                        <label htmlFor="phoneNumber">Telefone ou Celular</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            placeholder="Digite seu telefone"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="user-input-box password-box">
                        <label htmlFor="password">Senha</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Digite sua senha"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="button" onClick={togglePasswordVisibility}>
                            {showPassword ? "Esconder" : "Mostrar"}
                        </button>
                    </div>
                    <div className="user-input-box password-box">
                        <label htmlFor="confirmPassword">Confirme sua Senha</label>
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirme sua senha"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="button" onClick={toggleConfirmPasswordVisibility}>
                            {showConfirmPassword ? "Esconder" : "Mostrar"}
                        </button>
                    </div>
                </div>
                <div className="user-input-box">
                    <label htmlFor="gender">Gênero:</label>
                    <select
                        name="gender"
                        id="gender"
                        className="gender-select"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Selecione um gênero</option>
                        <option value="male">Homem</option>
                        <option value="female">Mulher</option>
                        <option value="other">Outro</option>
                    </select>
                </div>
                <div className="form-submit-btn">
                    <input type="submit" value="Enviar" />
                </div>
                {message && <p>{message}</p>}
            </form>
        </>
    );
}

export default Form;
