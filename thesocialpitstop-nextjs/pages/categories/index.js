import {
  ItemGrid, Subtitle, Title, TitleDiv
} from '../../components/categories/index.style';
import categories from '../../constants/categories';
import ItemComponent from '../../styles/item_component';

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
