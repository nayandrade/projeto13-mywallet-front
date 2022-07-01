import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner';
import { RiLogoutBoxRLine } from "react-icons/ri";

function TransactionLi ( { transaction } ) {
    return (
        <li><div><span>{transaction.date}</span><span>{transaction.description}</span></div><span>{parseFloat(transaction.value).toFixed(2).replace('.', ',')}</span></li>
    )
}

export default function Home() {
    const { token, setToken, setName, name } = useContext(UserContext);
    const [transactions, setTransactions] = useState();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(false);
    const [transactionValue, setTransactionValue] = useState(0);
    const [transactionDescription, setTransactionDescription] = useState('');
    const [loadTransactions, setLoadTransactions] = useState(true);
    const navigate = useNavigate();  
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    if(loadTransactions) {
        const promise = axios.get('http://localhost:5000/transaction', config)
        promise.then((res) => {
            setTransactions(res.data.transactions);
            setTotal(res.data.totalValue);
            setLoading(false);
            setLoadTransactions(false);
            setData('transactions');
        })
        promise.catch((res) => {
            console.log(res.message)
            navigate('/');
        })

    }
    // useEffect(() => {
        
    // }, [])

    function checkTransactions() {
        console.log(transactions, total, transactions.length)
        if(transactions.length === 0) {
            return (
                <>
                    <li>Não há registros de</li>
                    <li>entrada ou saída</li>
                </>     
            )
        } else {
            return (
                transactions.map((transaction, index) => {
                    return (
                        <TransactionLi transaction={transaction} key={index}/>                       
                    )
                })
            )
        }
    }

    function checkData(){
        console.log(data)
        if(data === 'transactions') {
            return (
                <Container>
                    <Header>
                        <h1>Olá {name}</h1>
                        <RiLogoutBoxRLine color="#FFFFFF" size="2em" />
                    </Header>
                    
                    <Main>
                        <ul>
                            { loading ? 'Carregando...' : checkTransactions() }
                        </ul>
                        { !loading ? <h2>Total: R$ {parseFloat(total).toFixed(2).replace('.', ',')}</h2> : null }
                    </Main>
                    <Footer>
                        <div onClick={() => setData('entrada')}>Entrada</div>
                        <div onClick={() => setData('saida')}>Saida</div>
                    </Footer>
                </Container>
            )
        } else if (data === 'entrada') {
            return (
                <Container>
                    <Header>
                        <h1>Nova Entrada</h1>
                        <RiLogoutBoxRLine color="#FFFFFF" size="2em" />
                    </Header>
                    <Form onSubmit={createCredit}>
                        <input type="number" id="valor" value={transactionValue} placeholder="Valor" required onChange={(e) => setTransactionValue(e.target.value)}></input>
                        <input type="text" id="descricao" value={transactionDescription} placeholder="Descrição" required onChange={(e) => setTransactionDescription(e.target.value)}></input>
                        <button type="submit">Salvar entrada</button>
                    </Form>
                    <button onClick={() => setData('transactions')}>Cancelar</button>
                </Container>   
            )
        } else if (data === 'saida') {
            return (
                <Container>
                    <Header>
                        <h1>Nova Saída</h1>
                        <RiLogoutBoxRLine color="#FFFFFF" size="2em" />
                    </Header>
                    <Form onSubmit={createDebt}>
                        <input type="number" id="valor" value={transactionValue} placeholder="Valor" required onChange={(e) => setTransactionValue(e.target.value)}></input>
                        <input type="text" id="descricao" value={transactionDescription} placeholder="Descrição" required onChange={(e) => setTransactionDescription(e.target.value)}></input>
                        <button type="submit">Salvar saida</button>
                    </Form>
                    <button onClick={() => setData('transactions')}>Cancelar</button>
                </Container>   
            )
        }
    }

    function createDebt(e) {
        e.preventDefault();
        const body = {
            value: parseFloat(transactionValue) * -1,
            description: transactionDescription
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        if(transactionDescription && transactionValue) {
            const promise = axios.post('http://localhost:5000/transaction', body, config)
            promise.then((res) => {
                setTransactionValue(0);
                setTransactionDescription('');
                setLoadTransactions(true);
                setData('transactions');
                console.log(res)
            })
            promise.catch((res) => {
                console.log(`Erro: ${res.message}`)
            })
        }
    }

    function createCredit(e) {
        e.preventDefault();
        const body = {
            value: parseFloat(transactionValue),
            description: transactionDescription
        }
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        if(transactionDescription && transactionValue) {
            const promise = axios.post('http://localhost:5000/transaction', body, config)
            promise.then((res) => {
                setTransactionValue(0);
                setTransactionDescription('');
                setLoadTransactions(true);
                setData('transactions');
                console.log(res)
            })
            promise.catch((res) => {
                console.log(`Erro: ${res.message}`)
            })
        }
    }
    return (
        <>
        {checkData()}
        </>
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

const Main = styled.main`
    width: calc(100vw - 48px);
    height: 70%;
    background-color: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px;

    div {
        display: flex;
        justify-content: space-between;
    }
    li {
        display: flex;
        justify-content: space-between;
    }
`

const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 24px;

    div {
        height: 114px;
        width: 47%;
        background-color: #A328D6;
        border-radius: 5px;
        color: #FFFFFF;
        font-size: 20px;
        font-weight: 700;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`