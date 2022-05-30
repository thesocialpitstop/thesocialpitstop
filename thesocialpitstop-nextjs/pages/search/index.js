import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LOAD_ALL_PROFILES, LOAD_PROFILE_CATEGORY } from '../../graphql/queries';
import  SearchInput from './search_input';
import  SearchItem from '../../components/search/search_item';
import { useQuery } from "@apollo/client";
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import SearchCategoryList from './search_category_list';

const mockSearchResults = [
  {
    name: "My Social Enterprise",
    description: "We are Social Enterprise",
    imageurl:"/icons/edu.png"
  },
  {
    name: "My Social Enterprise",
    description: "We are Social Enterprise",
    imageurl:"/icons/edu.png"
  },
  {
    name: "My Social Enterprise",
    description: "We are Social Enterprise",
    imageurl:"/icons/edu.png"
  },
  {
    name: "My Social Enterprise",
    description: "We are Social Enterprise",
    imageurl:"/icons/edu.png"
  },
  {
    name: "My Social Enterprise",
    description: "We are Social Enterprise",
    imageurl:"/icons/edu.png"
  },
]

const SearchPageDiv = styled.div`
  display: grid;
  grid-auto-flow: column;

  @media (min-width: 768px) {
    padding-left: 200px;
    padding-right: 200px;
  }
`;

const ResultsItemsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  grid-gap: 2rem;
`;

const SearchSectionDiv = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
  grid-template-rows: 50% 50%;
  grid-gap: 2rem;
`;

const NameInput = styled(TextField)`
  width: 100%;
  padding: 10px 100px 10px 20px; 
  line-height: 1;
  outline: none;
`;

const SearchButton = styled(Button)`
height: 100%;
width: 100%;
`;

const CategorySectionDiv = styled.div``;

const SearchBarItemsDiv = styled.div``;

const mockSearchComponent = mockSearchResults.map((item) => 
  <SearchItem key={item.name} item={item}></SearchItem>
);

const SearchPage = () => {

  const [items, setItems] = useState([]);
  const [textInput, setTextInput] = useState();
  
  const router = useRouter();
  const { query } = router.query;

  const withSearch = useQuery(LOAD_PROFILE_CATEGORY, {
    variables: {
      category: router.query.category,
      item_type: "SOO-PROFILE"
    }
  });

  const loadAll = useQuery(LOAD_ALL_PROFILES);
  const queryParams = router.query.category == undefined ? loadAll : withSearch;
  const { data: data, loading: loading, error: error } = queryParams;

  useEffect(() => {
    if(data){
      if(router.query.category == undefined) {
        console.log(data)
        setItems(data.listWithItemType.items)
      } else {
        console.log(data)
        setItems(data.queryItemWithCategory.items)
      }
    }
  }, [data])

  const searchItems = items.map((content) => {
    return (
      <SearchItem key={content.name} item={content}></SearchItem>
    );
  });

  const handleChange = e => {
    console.log(e.target.value);
    setTextInput(e.target.value);
  }

  return (
    <SearchPageDiv>
      <CategorySectionDiv>
        <SearchCategoryList/>
      </CategorySectionDiv>
      <SearchBarItemsDiv>
        <SearchSectionDiv>
          <NameInput onChange={handleChange}/> 
            <Link href={`/search?query=${textInput}`}>
              <SearchButton variant="contained">🔎</SearchButton>
            </Link>
        </SearchSectionDiv>
        <ResultsItemsDiv>
          {searchItems}
        </ResultsItemsDiv>
      </SearchBarItemsDiv>
    </SearchPageDiv>

  )
}

export default SearchPage;
