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
import { CheckBox, ContactPageOutlined, Title } from "@mui/icons-material";
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

  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") 
      console.log(reason)
      toggleDrawer(false);
}


  const list = () => {
    return (
      <Box
        sx={{ paddingLeft: "15px", paddingRight: "15px" }}
        role="presentation"
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
          {({ values, resetForm }) => (
            <Form>
              <>
                <Link href={"/search"} passHref>
                  <a>
                    <FilterButton type="reset" variant="contained">
                      Clear Filters
                    </FilterButton>
                  </a>
                </Link>
                <FilterButton
                  type="submit"
                  variant="contained"
                  onClick={toggleDrawer(false)}
                >
                  Apply Filter
                </FilterButton>
                <h2>Categories</h2>
                <CheckboxDiv>
                  {categories.map((item) => {
                    return (
                      <label>
                        <Field
                          as={Checkbox}
                          name="checked"
                          value={item.value}
                        />
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
        <FilterButton onClick={toggleDrawer(true)} variant="contained">
          FILTERS
        </FilterButton>
        <Drawer
          anchor="right"
          ModalProps={{
            keepMounted: true,
          }}
          open={state}
          onClose={handleClose}
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
