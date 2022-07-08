import { getAlgoliaResults } from '@algolia/autocomplete-js';
import '@algolia/autocomplete-theme-classic/dist/theme.css';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { Card } from "@mui/material";
import algoliasearch from 'algoliasearch';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AnimatedShowMore from "react-animated-show-more";
import PlaceholderLoading from "react-placeholder-loading";
import { Autocomplete } from "../../components/search/autocomplete/autocomplete";
import { DemoToggle } from "../../components/search/demo_toggle";
import FilterDrawer from "../../components/search/filter_drawer";
import {
  CategoryDropdownDiv, CategorySidebarDiv, ResultListDiv, ResultsItemsDiv, SearchBarItemsDiv, SearchPageDiv, SearchSectionDiv
} from "../../components/search/index.style";
import SearchCategoryList from "../../components/search/search_category_list";
import SearchItem from "../../components/search/search_item";
import {
  SearchItemAddress,
  SearchItemDescription, SearchItemDiv, SearchItemImage, SearchItemTextSection, SearchItemTitle
} from "../../components/search/search_item.style";
import { ALGOLIA_API_KEY, ALGOLIA_APP_ID, ALGOLIA_INDEX_NAME } from "../../constants/algolia";
import { ProductItem } from "./product_item";
import { NO_ITEM_MESSAGE } from '../../constants/errors';

const SearchPage = () => {
  const [items, setItems] = useState([]);
  const [textInput, setTextInput] = useState();
  const [filterInput, setFilterInput] = useState();

  const router = useRouter();
  const appId = ALGOLIA_APP_ID;
  const apiKey = ALGOLIA_API_KEY;
  const searchClient = algoliasearch(appId, apiKey);
  const index = searchClient.initIndex(ALGOLIA_INDEX_NAME);

  useEffect(() => {
    console.log(router);
    let filterString = ""
    if(router.query.category != undefined) {
      filterString = filterBuilder(router.query.category);
    }
    console.log(filterString);
    index.search(router.query.query, {
      filters: router.query.category == [] ? "" : filterString
    }).then(({ hits }) => {
      console.log(hits)
      setItems(hits);
    });
  }, [router.query.query, router.query.category]);

  const filterBuilder = (props) => {
    console.log(props)
    //For each one, we have to add category:<Category Query> + OR (except for last one)
    //If there is one item it will not be array. 
    let filterCategory = "";
    //only one filter, so the query will be a string
    if(typeof props == 'string') {
      console.log("string!!");
      return `category:${router.query.category}`
    }
    //More than one filter, query will be array
    else {
      props.map((data, index) => {
        filterCategory += `category:${data}`;
        if(router.query.category.length-1 != index) {
          filterCategory += ' OR ';
        }
      })
    }
    return filterCategory;
  }

  const searchItems = items.map((content) => {
    return (
      <>
        <SearchItem key={content.name} item={content}></SearchItem>
      </>
    );
  });

  const n = 8;
  const loadingItems = items.forEach(() => {
    return (
      <Card>
        <SearchItemDiv>
          <SearchItemImage>
            <PlaceholderLoading shape="circle" width={60} height={60} />
          </SearchItemImage>
          <SearchItemTextSection>
            <SearchItemTitle>
              <PlaceholderLoading shape="rect" width={"80%"} height={20} />
            </SearchItemTitle>
            <SearchItemAddress>
              <PlaceholderLoading shape="rect" width={"80%"} height={20} />
            </SearchItemAddress>
            <SearchItemDescription>
              <PlaceholderLoading shape="rect" width={"80%"} height={20} />
            </SearchItemDescription>
          </SearchItemTextSection>
        </SearchItemDiv>
      </Card>
    );
  });

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  return (
    <SearchPageDiv>
      <SearchBarItemsDiv>
        <SearchSectionDiv>
          {/* <NameInput onChange={handleChange} label="Search" />
          <Link
            href={
              textInput == undefined ? `/search` : `/search?query=${textInput}`
            }
          >
            <SearchButton variant="contained">SEARCH</SearchButton>

          </Link> */}
          <Autocomplete 
              openOnFocus={true}
              onSubmit={(event) => {
                router.push(`/search?query=${event.state.query}`, undefined, { shallow: true })
              }}
              getSources={({ query }) => [
                {
                  sourceId: 'products',
                  getItems() {
                    return getAlgoliaResults({
                      searchClient,
                      queries: [
                        {
                          indexName: ALGOLIA_INDEX_NAME,
                          query,
                        }
                      ]
                    });
                  },
                  templates: {
                    item({ item, components }) {
                      return <ProductItem hit={item} components={components} />
                    }
                  }
                }
              ]}
               />
        </SearchSectionDiv>
      </SearchBarItemsDiv>
      <ResultsItemsDiv>
        <CategoryDropdownDiv>
          <AnimatedShowMore toggle={DemoToggle} height={70}>
            <SearchCategoryList />
          </AnimatedShowMore>
          <FilterDrawer setFilterInput={setFilterInput} />
        </CategoryDropdownDiv>
        <CategorySidebarDiv>
          <SearchCategoryList />
        </CategorySidebarDiv>
        <ResultListDiv>{searchItems == 0 ? <div>{NO_ITEM_MESSAGE}</div> : searchItems}</ResultListDiv>
      </ResultsItemsDiv>
    </SearchPageDiv>
  );
};

export default SearchPage;
