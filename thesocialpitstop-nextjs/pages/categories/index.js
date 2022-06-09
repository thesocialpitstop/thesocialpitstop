import Link from 'next/link';
import styled from 'styled-components'
import categories from '../../constants/categories';
import ItemComponent from '../../styles/item_component'
import {
  TitleDiv,
  Title,
  Subtitle,
  ItemGrid
} from '../../components/categories/index.style'

const listCategories = categories.map((item) => 
  <ItemComponent key={item.name} item={item}></ItemComponent>
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
