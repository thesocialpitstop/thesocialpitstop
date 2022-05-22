import Image from 'next/image'
import Link from 'next/link'
import { ItemStyle, ItemTitle } from './item_component.style';

export function ItemComponent(props) {
    return (
    <Link href={props.item.value} passHref style={{ textDecoration: 'none' }}>
        <ItemStyle>
            <Image src={props.item.icon} alt="me" width="64" height="64"/>
            <ItemTitle>{props.item.name}</ItemTitle>
        </ItemStyle>
    </Link>
    );
}
