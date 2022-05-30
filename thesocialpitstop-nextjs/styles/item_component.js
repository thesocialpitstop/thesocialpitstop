import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components';

const ItemStyle = styled.a`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border: 1px solid transparent;
    border-style: solid;  
    border-radius: 1rem;


    &:hover {
        border: 1px solid gray;
        border-style: solid;
    }

    &:focus {
        border: 1px solid gray;
        border-style: solid;
    }
`;

const ItemTitle = styled.h3`
    text-align: center;
    font-family: Montserrat, sans-serif;
`;

const ItemComponent = (props) => {
    return (
    <Link href={`/search?category=${props.item.value}`} passHref style={{ textDecoration: 'none' }}>
        <ItemStyle>
            <Image src={props.item.icon} alt="me" width="64" height="64"/>
            <ItemTitle>{props.item.name}</ItemTitle>
        </ItemStyle>
    </Link>
    );
}

export default ItemComponent