import { useRouter } from "next/router";
import {
  LIST_PROFILES,
  GET_PROFILE_CATEGORY,
  QUERY_WITH_NAME_PREFIX,
} from "../../graphql/queries";
import { useEffect, useState } from "react";
import SearchItem from "../../components/search/search_item";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import SearchCategoryList from "../../components/search/search_category_list";
import {
  SearchPageDiv,
  ResultsItemsDiv,
  SearchSectionDiv,
  NameInput,
  SearchButton,
  CategorySidebarDiv,
  CategoryDropdownDiv,
  SearchBarItemsDiv,
  ResultListDiv,
  FilterSortButtons,
} from "../../components/search/index.style";
import { DemoToggle } from "../../components/search/demo_toggle";
import AnimatedShowMore from "react-animated-show-more";
import FilterDrawer from "../../components/search/filter_drawer";
import { Loader } from "../../components/search/loader";
import {
  SearchItemImage,
  SearchItemDiv,
  SearchItemTextSection,
  SearchItemAddress,
  SearchItemDescription,
  SearchItemTitle,
} from "../../components/search/search_item.style";
import { Card } from "@mui/material";
import PlaceholderLoading from "react-placeholder-loading";

const SearchPage = () => {
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [textInput, setTextInput] = useState();
  const [filterInput, setFilterInput] = useState(null);

  const router = useRouter();
  const { query } = router.query;

  const withCategorySearch = useQuery(GET_PROFILE_CATEGORY, {
    variables: {
      category: router.query.category,
      item_type: "SOO-PROFILE",
    },
  });

  const withPrefixSearch = useQuery(QUERY_WITH_NAME_PREFIX, {
    variables: {
      name_prefix: router.query.query,
    },
  });

  const loadAll = useQuery(LIST_PROFILES);
  const queryParams =
    router.query.category == undefined ? loadAll : withCategorySearch;
  router.query.query != undefined ? (queryParams = withPrefixSearch) : null;
  const { data: data, loading: loading, error: error } = queryParams;
  useEffect(() => {
    if (data) {
      if (router.query.query != undefined) {
        setItems(data.queryItemWithNamePrefix.items);
      } else if (router.query.category == undefined) {
        setItems(data.listWithItemType.items);
      } else if (router.query.category != undefined) {
        setItems(data.queryItemWithCategory.items);
      }
    }
  }, [data]);

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
          <NameInput onChange={handleChange} label="Search" />
          <Link
            href={
              textInput == undefined ? `/search` : `/search?query=${textInput}`
            }
          >
            <SearchButton variant="contained">SEARCH</SearchButton>
          </Link>
        </SearchSectionDiv>
      </SearchBarItemsDiv>
      <ResultsItemsDiv>
        <CategoryDropdownDiv>
          <AnimatedShowMore toggle={DemoToggle} height={150}>
            <SearchCategoryList />
          </AnimatedShowMore>
          <FilterDrawer setFilterInput={setFilterInput} />
        </CategoryDropdownDiv>
        <CategorySidebarDiv>
          <SearchCategoryList />
        </CategorySidebarDiv>
        <ResultListDiv>{loading ? loadingItems : searchItems}</ResultListDiv>
      </ResultsItemsDiv>
    </SearchPageDiv>
  );
};

export default SearchPage;
