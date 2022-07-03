import styled from 'styled-components';
import { ThreeDots } from  'react-loader-spinner';

export default function InputForm({type, createCredit, transactionValue, setTransactionValue, transactionDescription, setTransactionDescription, loadingButton, disabled, submit, setData}) {

    return (
        <Container>
            <Header>
                <h1>{type}</h1>
            </Header>
            <Form onSubmit={createCredit} disabled={disabled}>
                <input type="number" id="valor" disabled={disabled} value={transactionValue} placeholder="Valor" required onChange={(e) => setTransactionValue(e.target.value)}></input>
                <input type="text" id="descricao" disabled={disabled} alue={transactionDescription} placeholder="Descrição" required onChange={(e) => setTransactionDescription(e.target.value)}></input>
                {
                    loadingButton ? <button type="submit"><ThreeDots color="#FFFFFF" /></button> : <button type="submit">{submit}</button>
                }

                <button disabled={disabled} onClick={() => {
                    setData('transactions')
                    setTransactionValue()
                    setTransactionDescription('')
                    }}>Cancelar</button>
            </Form>    
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
        color: ${props => props.disabled ? '#8C11BE' : '#FFFFFF' };
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