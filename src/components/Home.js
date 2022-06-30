import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner';
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function Home() {
    const { token, setToken, setName, name } = useContext(UserContext);
    return (
        <Container>
            <Header>
                <h1>Olá {name}</h1>
                <RiLogoutBoxRLine color="#FFFFFF" size="2em" />
            </Header>
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
        font-family: 'Raleway', sans-serif;
        font-size: 26px;
        font-weight: 700;
        color: #FFFFFF;
        margin: 36px 0;
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

const Header = styled.header`
    width: 100%;
    padding: 25px 24px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

