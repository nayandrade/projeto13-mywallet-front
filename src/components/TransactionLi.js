import styled from 'styled-components';

export default function TransactionLi ( { transaction } ) {    
    return (
        <Li>
            <div>
                <TransactionDate>{transaction.date}</TransactionDate>
                <span>
                    {transaction.description}
                </span>
            </div>
            <TransactionValue transaction={transaction.value}>
                {parseFloat(transaction.value).toFixed(2).replace('.', ',').replace('-', '')}
            </TransactionValue>
        </Li>
    )
}



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

const TransactionValue = styled.p`
    font-size: 16px;
    color: ${props => props.transaction > 0 ? '#03AC00' : '#C70000' };
    margin-right: 10px;
`

const TransactionDate = styled.p`
    color: #C6C6C6;
    margin-right: 10px;
`