import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingButton, setLoadingButton] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { token, setToken, setName, name, userId, setUserId } = useContext(UserContext);
    const navigate = useNavigate();

    if(localStorage.getItem('LastUser') !== null) {
        let ourArray = JSON.parse(localStorage.getItem('LastUser'));
        const { email, password } = ourArray;
        const body = {
            email: email,
            password: password,
        };
        const promise = axios.post(
            "https://projeto13mywallet-back.herokuapp.com/signin", body);

        promise.then((res) => {
            console.log(typeof body.password)
            setToken(res.data.token);
            setName(res.data.name);
            setDisabled(false);
            navigate('/home');
            setLoadingButton(false);  
        });
        promise.catch((res) => {
            console.log(typeof body.password)
            console.log(res.message)
            setDisabled(false);
            setLoadingButton(false);  
        });
    }

    function UserLogin(event) {
        event.preventDefault();
        console.log('logando')
        setDisabled(true);
        setLoadingButton(true);

        const body = {
            email: email,
            password: password,
        };
        const promise = axios.post(
            "https://projeto13mywallet-back.herokuapp.com/signin", body);

        

        promise.then((res) => {
            console.log(res)
            setToken(res.data.token);
            setName(res.data.name);
            console.log(res.data.userId)
            setDisabled(false);
            localStorage.setItem('Login-Token', res.data.token);
            localStorage.setItem('LastUser',JSON.stringify(body));
            navigate('/home');
            setLoadingButton(false);  
        });

        promise.catch((res) => {
            console.log(typeof body.password)
            console.log(res.message)
            setDisabled(false);
            setLoadingButton(false);
        })   
        

    }
    return (
        <Container>
            <h1>MyWallet</h1>
            <Form onSubmit={UserLogin} >                
                <input type="email" id="email" value={email} disabled={disabled} placeholder="E-mail" required onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" id="password" value={password} disabled={disabled} placeholder="Senha" required onChange={(e) => setPassword(e.target.value)}/>       
                <div>
                    {
                        loadingButton ? <button type="submit" disabled={disabled}><ThreeDots color="#FFFFFF" /></button> : <button type="submit" disabled={disabled}>Entrar</button>
                    }   
                </div>
            </Form>
            <Link to='/signup'>Primeira vez? Cadastre-se!</Link>         
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