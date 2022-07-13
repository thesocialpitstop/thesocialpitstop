import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import * as React from "react";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import categories from "../../constants/categories";
import { FullWidthButton } from "../shared";

const CheckboxDiv = styled.div`
  display: grid;
`;
export default function FilterDrawer({ setFilterInput }) {
  const [state, setState] = React.useState(false);
  const themeContext = useContext(ThemeContext);
  const router = useRouter()

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
    console.log(reason);
    reason === "backdropClick" ? toggleDrawer(false) : null;
  };

  const resetFilter = () => {
    setState(false);
    setFilterInput(undefined);
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
            let categoryQueryString = "";
            values.checked.forEach(data => {
              categoryQueryString += `category=${data}&`
            })
            setFilterInput(values);
            router.push(`/search?query=&${categoryQueryString}`);
          }}
        >
          {({ values, resetForm }) => (
            <Form>
              <>
                <FullWidthButton
                  type="reset"
                  variant="contained"
                  onClick={resetFilter}
                >
                  Clear Filters
                </FullWidthButton>
                <FullWidthButton
                  type="submit"
                  variant="contained"
                  onClick={toggleDrawer(false)}
                >
                  Apply Filter
                </FullWidthButton>
                <h2>Categories</h2>
                <CheckboxDiv>
                  {categories.map((item) => {
                    return (
                      <label key={item.name}>
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
        <FullWidthButton onClick={toggleDrawer(true)} variant="contained">
          FILTERS
        </FullWidthButton>
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
