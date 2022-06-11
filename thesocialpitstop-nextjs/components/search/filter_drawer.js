import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import categories from "../../constants/categories";
import styled from "styled-components";
import { CheckBox, Title } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import { Checkbox, FormControlLabel, List, ListItem } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "styled-components";

const CheckboxDiv = styled.div`
  display: grid;
`;
const FilterButton = styled(Button)`
  width: 100%;
`;
const ClearButton = styled(Button)`
  width: 100%;
`;
const SubmitButton = styled(Button)`
  width: 100%;
`;

export default function FilterDrawer() {
  const [state, setState] = React.useState(false);
  const themeContext = useContext(ThemeContext);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => {
    return (
      <Box
        sx={{ width: "80%" }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Link href="/">
          <a>
            <Image
              src="/../public/icons/logo2.png"
              alt="asd"
              width={64}
              height={64}
            />
          </a>
        </Link>
        
        <Formik
          initialValues={{
            checked: [],
          }}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({ values }) => (
            <Form>
              <>
                <ClearButton 
                  type="submit" 
                  variant="contained"
                >
                  Clear Filters
                </ClearButton>
                <SubmitButton 
                  type="submit" 
                  variant="contained"
                >
                    Apply Filter
                </SubmitButton>
                <h2>Categories</h2>
                <CheckboxDiv>
                  {categories.map((item) => {
                    return (
                      <label>
                        <Field as={Checkbox} name="checked"/>
                        {item.name}
                      </label>
                    );
                  })}
                </CheckboxDiv>
              </>
            </Form>
          )}
        </Formik>
        <Divider />
      </Box>
    );
  };
  return (
    <div>
      <React.Fragment>
        
        <FilterButton onClick={toggleDrawer(true)}>
          FILTERS
        </FilterButton>
        <Drawer
          anchor="right"
          ModalProps={{
            keepMounted: true,
          }}
          open={state}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: { width: "70%" },
          }}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
