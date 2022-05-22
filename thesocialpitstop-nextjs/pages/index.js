import styled from 'styled-components'
import ItemComponent from './categories/item_component';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`


export default function HomePage() {
  return (
    <div>
      <Title>The Social Pitstop</Title>
    </div>
  );
}
