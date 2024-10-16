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
    const [files, setFiles] = useState([]);

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

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem!");
            return;
        }
        if (!formData.fullName || !formData.username || !formData.email || !formData.phoneNumber || !formData.password) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        console.log("Dados do formulário:", formData);
        console.log("Arquivos selecionados:", files);
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
                            placeholder="Enter Full Name"
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
                            placeholder="Enter Email"
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
                            placeholder="Enter Phone Number"
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
                            placeholder="Enter Password"
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
                            placeholder="Confirm Password"
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
                <div className="user-input-box">
                    <label htmlFor="files">Upload de Currículos (PDF, DOC, DOCX)</label>
                    <input
                        type="file"
                        id="files"
                        name="files"
                        accept=".pdf, .doc, .docx"
                        onChange={handleFileChange}
                        multiple
                        required
                    />
                </div>
                <div className="form-submit-btn">
                    <input type="submit" value="Enviar" />
                </div>
            </form>
        </>
    );
}

export default Form;
