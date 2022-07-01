import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loadingButton, setLoadingButton] = useState(false);
    const navigate = useNavigate();
    
    function CreateUser(event) {   
        event.preventDefault();
        setLoadingButton(true);
        const body = {
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }        

        const promise = axios.post(
            "http://localhost:5000/signup", body);

            promise.then((res) => {
                navigate("/");
                setLoadingButton(false);
            });
            promise.catch((res) => {
                alert('Erro!');
                setLoadingButton(false);
            })                
    }

    return (
        <Container>
            <h1>MyWallet</h1>
            <Form onSubmit={CreateUser}>                
                <input type="text" id="nome" value={name} placeholder="Nome" required onChange={(e) => setName(e.target.value)}/>
                <input type="email" id="email" value={email} placeholder="E-mail" required onChange={(e) => setEmail(e.target.value)}/>       
                <input type="password" id="password" value={password} placeholder="Senha" required onChange={(e) => setPassword(e.target.value)}/> 
                <input type="password" id="confirm-password" value={confirmPassword} placeholder="Confirme a senha" required onChange={(e) => setConfirmPassword(e.target.value)}/> 
                <div>
                    {
                        loadingButton ? <button type="submit"><ThreeDots color="#FFFFFF" /></button> : <button type="submit">Cadastrar</button>
                    }
                </div>
            </Form>
            <Link to='/'>Já tem uma conta? Entre agora!</Link>  
        </Container> 
    )
}

const Container = styled.div`
    font-family: 'Raleway', sans-serif;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #8C11BE;


    h1 {
        font-family: 'Saira Stencil One', cursive;
        font-size: 32px;
        color: #FFFFFF;
        margin: 36px;
    }

    a {
        font-family: 'Raleway', sans-serif;
        font-size: 15px;
        color: #FFFFFF;
        font-weight: 700;
        margin: 36px 0;
        text-decoration: none;  
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 0 36px;
    width: 100%;
    
    
    input {
        height: 58px;
        width: 100%;
        margin-bottom: 13px;
        border-radius: 5px;
        border: 1px solid #D4D4D4;            
    }

    input:focus {
        border: none
    }

    input::-webkit-input-placeholder { /* Edge */
        font-family: 'Raleway', sans-serif;
        color: #000000;
        font-weight: 400;
        font-size: 20px;
        text-indent: 10px; 
    }

    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        font-family: 'Raleway', sans-serif;
        color: #000000;
        font-weight: 400;
        font-size: 20px;
        text-indent: 10px;
    }

    input::placeholder {
        font-family: 'Raleway', sans-serif;
        color: #000000;
        font-weight: 400;
        font-size: 20px;
        text-indent: 10px;
    }

    div {
        display: flex;
        justify-content: center;
    }

    button {
        width: 100%;
        height: 46px;
        text-align: center;
        background-color: #A328D6;;
        color: #FFFFFF;
        font-size: 20px;
        font-weight: 700;
        border: none;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;    
    }

    button a:-webkit-any-link {
        color: inherit;
        text-decoration: none;
    }
`