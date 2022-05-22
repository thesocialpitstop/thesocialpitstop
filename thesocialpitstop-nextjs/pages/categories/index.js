import styled from 'styled-components'
import { categories } from './category_list';
import { ItemComponent } from './item_component'

const TitleDiv = styled.div`
  background-color: #EEA47FFF;
  border-radius: 2rem;
  margin: 1.25rem;
  text-align: center;
  padding: 0.5rem;
`;


const Title = styled.h1`
  font-size: 50px;
  font-family: Montserrat, sans-serif;
  color: ${({ theme }) => theme.colors.primary};
`

const Subtitle = styled.h3`
  font-family: Montserrat, sans-serif;
  color: ${({ theme }) => theme.colors.primary};
`

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));  
  grid-template-rows: repeat(2, 150px);
  grid-column: 1;

`;


const listCategories = categories.map((item) => 
  <ItemComponent item={item}></ItemComponent>
);

export default function CategoriesPage() {
  return (
    <div>
      <TitleDiv>      
        <Title>Categories</Title>
        <Subtitle>Check out all our categories!</Subtitle>
      </TitleDiv>
      <ItemGrid>{listCategories}</ItemGrid>
    </div>
  );

}
