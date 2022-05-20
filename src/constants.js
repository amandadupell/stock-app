import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10%;
`;

export const Heading = styled.div`
    font-family: 'Open Sans', sans-serif;
    font-size: 48px;
    font-weight: 900;
`;

export const Input = styled.input`
    padding: 5px;
    margin-top: 10px;
    height: 25px;
    border: 1px solid;
    border-radius: 5px;
`;

export const StockContainer = styled.div`
    margin: 25px 0px;
    width: 250px;
    border-radius: 10px;
    align-self: center;
    padding: 10px;
    box-shadow: 0px 0px 2px;
`

export const StockSymbol = styled(Heading)`
    font-size: 24px;
    font-weight: 700;
    text-align: left;
`;

export const StockInformation = styled(StockSymbol)`
    font-size: 12px;
    font-weight: 400;
`;

export const StyledButton = styled.button`
    margin-top: 10px;
    font-family: 'Open Sans', sans-serif;
    font-size: 10px;
    border-radius: 5px;
    background: white;
    border: 1px solid;

    &:hover {
        cursor: pointer;
    }
`;

export const WatchlistContainer = styled(StockContainer)`
    align-self: flex-start;
    margin: none;

    &:hover {
        cursor: pointer;
    }
`;