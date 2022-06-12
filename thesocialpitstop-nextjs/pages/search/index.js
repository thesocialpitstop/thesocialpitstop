import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  LOAD_ALL_PROFILES,
  LOAD_PROFILE_CATEGORY,
  QUERY_WITH_NAME_PREFIX,
} from "../../graphql/queries";
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

const SearchPage = () => {
  const [items, setItems] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [textInput, setTextInput] = useState();
  const [filterInput, setFilterInput] = useState(null);

  const router = useRouter();
  const { query } = router.query;

  const withCategorySearch = useQuery(LOAD_PROFILE_CATEGORY, {
    variables: {
      category: router.query.category,
      item_type: "SOO-PROFILE",
    },
  });

  const withPrefixSearch = useQuery(QUERY_WITH_NAME_PREFIX, {
    variables: {
      prefix: router.query.query,
    },
  });

  const loadAll = useQuery(LOAD_ALL_PROFILES);
  const queryParams =
    router.query.category == undefined ? loadAll : withCategorySearch;
  router.query.query != undefined ? (queryParams = withPrefixSearch) : null;
  const { data: data, loading: loading, error: error } = queryParams;

  //FILTER USEEFFECT QUERY
  useEffect(() => {
    if (filterInput == undefined) {
      setItems(originalItems);
    } else if (filterInput != undefined || filterInput != "") {
      // console.log(filterInput);
      var newArray = originalItems.filter(function (item) {
        for (var key in filterInput) {
          if (item.category == filterInput[key]) return true;
          return false;
        }
      });
      // console.log(newArray);
      setItems(newArray);
    }
  }, [filterInput]);

  useEffect(() => {
    if (data) {
      if (router.query.query != undefined) {
        console.log(data);
        setItems(data.queryItemWithNamePrefix.items);
      } else if (router.query.category == undefined) {
        console.log(data);
        setItems(data.listWithItemType.items);
        setOriginalItems(data.listWithItemType.items);
      } else if (router.query.category != undefined) {
        console.log(data);
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
          {/* <AnimatedShowMore toggle={DemoToggle} height={150}>
            <SearchCategoryList />
          </AnimatedShowMore> */}
          <FilterDrawer setFilterInput={setFilterInput} />
        </CategoryDropdownDiv>
        <CategorySidebarDiv>
          <SearchCategoryList />
        </CategorySidebarDiv>
        <ResultListDiv>{searchItems}</ResultListDiv>
      </ResultsItemsDiv>
    </SearchPageDiv>
  );
};

export default SearchPage;
