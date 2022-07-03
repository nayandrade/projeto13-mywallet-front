import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import axios from "axios";
import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner';
import { RiLogoutBoxRLine, RiAddCircleLine } from "react-icons/ri";
import { IoRemoveCircleOutline } from "react-icons/io5";


function TransactionLi ( { transaction } ) {    
    return (
        <Li><div><TransactionDate>{transaction.date}</TransactionDate><span>{transaction.description}</span></div><TransactionValue transaction={transaction.value}>{parseFloat(transaction.value).toFixed(2).replace('.', ',').replace('-', '')}</TransactionValue></Li>
    )
}

export default function Home() {
    const { token, setToken, setName, name } = useContext(UserContext);
    const [transactions, setTransactions] = useState();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(false);
    const [transactionValue, setTransactionValue] = useState();
    const [transactionDescription, setTransactionDescription] = useState('');
    const [loadTransactions, setLoadTransactions] = useState(true);
    const navigate = useNavigate();  
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    if(loadTransactions) {
        const promise = axios.get('https://projeto13mywallet-back.herokuapp.com/transaction', config)
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

    function checkTransactions() {
        console.log(transactions, total, transactions.length)
        if(transactions.length === 0) {
            return (
                <Registry>
                    <p>Não há registros de</p>
                    <p>entrada ou saída</p>
                </Registry>     
            )
        } else {
            return (
                <ul>
                {
                    transactions.map((transaction, index) => {
                        return (
                            <TransactionLi transaction={transaction} key={index}/>                       
                        )
                    })
                }
                </ul>
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
                        <RiLogoutBoxRLine onClick={logOut} color="#FFFFFF" size="1.2em" />
                    </Header>
                    
                    <Main>
                        { loading ? 'Carregando...' : checkTransactions() }
                        { !loading && transactions.length !== 0 ? <Total totalValue={parseFloat(total)}><h2>SALDO:</h2><p>R$ {parseFloat(total).toFixed(2).replace('.', ',')}</p></Total> : null }
                    </Main>
                    <Footer>
                        <Button onClick={() => setData('entrada')}><div><RiAddCircleLine color="#FFFFFF" size="1.8em" /></div><div>Nova<br></br>entrada</div></Button>
                        <Button onClick={() => setData('saida')}><div><IoRemoveCircleOutline color="#FFFFFF" size="1.8em" /></div><div>Nova<br></br>saída</div></Button>
                    </Footer>
                </Container>
            )
        } else if (data === 'entrada') {
            return (
                <Container>
                    <Header>
                        <h1>Nova Entrada</h1>
                    </Header>
                    <Form onSubmit={createCredit}>
                        <input type="number" id="valor" value={transactionValue} placeholder="Valor" required onChange={(e) => setTransactionValue(e.target.value)}></input>
                        <input type="text" id="descricao" value={transactionDescription} placeholder="Descrição" required onChange={(e) => setTransactionDescription(e.target.value)}></input>
                        <button type="submit">Salvar entrada</button>
                        <button onClick={() => {
                            setData('transactions')
                            setTransactionValue()
                            setTransactionDescription('')
                            }}>Cancelar</button>
                    </Form>
                    
                </Container>   
            )
        } else if (data === 'saida') {
            return (
                <Container>
                    <Header>
                        <h1>Nova Saída</h1>
                    </Header>
                    <Form onSubmit={createDebt}>
                        <input type="number" id="valor" value={transactionValue} placeholder="Valor" required onChange={(e) => setTransactionValue(e.target.value)}></input>
                        <input type="text" id="descricao" value={transactionDescription} placeholder="Descrição" required onChange={(e) => setTransactionDescription(e.target.value)}></input>
                        <button type="submit">Salvar saida</button>
                        <button onClick={() => {
                            setData('transactions')
                            setTransactionValue()
                            setTransactionDescription('')
                            }}>Cancelar</button>
                    </Form>
                    
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
            const promise = axios.post('https://projeto13mywallet-back.herokuapp.com/transaction', body, config)
            promise.then((res) => {
                setTransactionValue();
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
            const promise = axios.post('https://projeto13mywallet-back.herokuapp.com/transaction', body, config)
            promise.then((res) => {
                setTransactionValue();
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

    function logOut() {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        console.log(config)
        let confirmation = window.confirm('Você tem certeza que deseja desconectar?');
        if (confirmation) {
            console.log(config)
            const promise = axios.delete('https://projeto13mywallet-back.herokuapp.com/session', config)
            promise.then((res) => {
                console.log(res.data)
                localStorage.removeItem('LastUser')
                navigate('/');    
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
    font-size: 26px;
    width: 100%;
    height: 80px;
    padding: 25px 24px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-family: 'Raleway', sans-serif;
        font-size: 26px;
        font-weight: 700;
        color: #FFFFFF;
    }
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

    ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: auto;        
    }
`

const Registry = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 24px;
`
const Button = styled.div`
    height: 114px;
    width: 47%;
    background-color: #A328D6;
    border-radius: 5px;
    color: #FFFFFF;
    font-size: 17px;
    font-weight: 700;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0 24px;
    
    input {
        height: 58px;
        width: 100%;
        margin-top: 15px;
        border-radius: 5px;
        border: 1px solid #D4D4D4;            
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
        margin-top: 15px;    
    }

    div {
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
        margin-top: 15px; 
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
`
const Li = styled.li`
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;    
    
    span {
        font-family: 'Raleway', sans-serif;
        font-size: 16px;
        font-weight: 400;
    }

    div{
        display: flex;
        justify-content: space-between;
    }
`

const TransactionDate = styled.p`
    color: #C6C6C6;
    margin-right: 10px;
`

const TransactionValue = styled.p`
    font-size: 16px;
    color: ${props => props.transaction > 0 ? '#03AC00' : '#C70000' };
    margin-right: 10px;
`

const Total = styled.div`
    display: flex;
    justify-content: space-between;

    h2 {
        font-size: 17px;
        font-weight: 700;
    }

    p {
        font-size: 17px;
        font-weight: 400;
        color: ${props => props.totalValue > 0 ? '#03AC00' : '#C70000' };
    }
`