import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { 
  LOAD_ALL_PROFILES, 
  LOAD_PROFILE_CATEGORY, 
  QUERY_WITH_NAME_PREFIX 
} from '../../graphql/queries';
import  SearchItem from '../../components/search/search_item';
import { useQuery } from "@apollo/client";
import Link from 'next/link';
import SearchCategoryList from '../../components/search/search_category_list';
import { 
  SearchPageDiv,
  ResultsItemsDiv,
  SearchSectionDiv,
  NameInput,
  SearchButton,
  CategorySectionDiv,
  SearchBarItemsDiv 
} from '../../components/search/index.style';

const SearchPage = () => {

  const [items, setItems] = useState([]);
  const [textInput, setTextInput] = useState();
  
  const router = useRouter();
  const { query } = router.query;

  const withCategorySearch = useQuery(LOAD_PROFILE_CATEGORY, {
    variables: {
      category: router.query.category,
      item_type: "SOO-PROFILE"
    }
  });

  const withPrefixSearch = useQuery(QUERY_WITH_NAME_PREFIX, {
    variables: {
      prefix: router.query.query
    }
  })

  const loadAll = useQuery(LOAD_ALL_PROFILES);
  const queryParams = router.query.category == undefined ? loadAll : withCategorySearch;
  if(router.query.query != undefined) {
    queryParams = withPrefixSearch;
  }
  const { data: data, loading: loading, error: error } = queryParams;

  useEffect(() => {
    if(data){
      if(router.query.query != undefined) {
        console.log(data);
        setItems(data.queryItemWithNamePrefix.items)
      } else if (router.query.category == undefined) {
        console.log(data)
        setItems(data.listWithItemType.items);
      } else if(router.query.category != undefined) {
        console.log(data);
        setItems(data.queryItemWithCategory.items);
      }
    }
  }, [data])

  const searchItems = items.map((content) => {
    return (
      <SearchItem key={content.name} item={content}></SearchItem>
    );
  });

  const handleChange = e => {
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
            <Link href={textInput==""?`/search`:`/search?query=${textInput}`}>
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
