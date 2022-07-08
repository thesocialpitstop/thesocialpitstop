import { Button, Checkbox } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { useRouter } from 'next/router';
import styled from "styled-components";
import categories from "../../constants/categories";

const CategoryItem = styled.div`
  font-family: Montserrat, sans-serif;
  padding: 5px 0px 5px 0px; //TRBL
  color: blue;
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const categoryList = categories.map((item) => {
  return (
    <label key={item.name}>
      <Field as={Checkbox} name="checked" value={item.value} />
      {item.name}
    </label>
  );
});



const CategoryTitle = styled.div`
  font-family: Montserrat, sans-serif;
  @media (min-width: 768px) {
    font-size: large;
  }
  @media (max-width: 768px) {
    border-radius: 25px;
    border: 2px solid #73ad21;
    padding: 5px;
    width: fit-content;
  }
`;

const CategoryListDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchCategoryList = () => {
  const router = useRouter()

  return (
    <Formik
      initialValues={{
        checked: [],
      }}
      onSubmit={async (values) => {
        let categoryQueryString = "";
        values.checked.forEach(data => {
          categoryQueryString += `category=${data}&`
        })
        router.push(`/search?query=&${categoryQueryString}`);
      }}
    >
      {({ values, resetForm }) => (
        <Form>
          <Button type="submit" variant="contained">
            Apply Filter
          </Button>
          {/* <Button onClick={() => resetForm({
            values: {
              checked: []
            }
          })} variant="contained">
            Reset Filter
          </Button> */}
          <CategoryTitle>Categories</CategoryTitle>
          <CategoryListDiv>
            {categoryList}
          </CategoryListDiv>
        </Form>
      )}
    </Formik>
  );
};

export default SearchCategoryList;
