import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import {
  Box,
  Button,
  Modal, TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import styled from "styled-components";
import * as Yup from "yup";
import { YupEmailValidation } from "../../constants/formik_validation";
import { CREATE_PARTNER } from "../../graphql/mutations";
import { useRouter } from 'next/router';
import { GET_PARTNER } from "../../graphql/queries";

const ParnerReqDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const partnershipValidationModalSchema = Yup.object().shape({
  name: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  details: Yup.string().required('required'),
  email: YupEmailValidation,
});

const PartnershipModal = ({ open, setOpen }) => {
  const router = useRouter();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useUser();
  const [createPartner] = useMutation(CREATE_PARTNER);
  const { id } = router.query;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    border: "2px solid #000",
    width: "80%",
    boxShadow: 24,
    p: 4,
  };

    // Partner Data
    const { data: partnerData } = useQuery(GET_PARTNER, {
      variables: {
        user_id: id,
        item_type: `PARTNER#${user?.sub.split("|")[1]}`,
      },
    });

  const formik = useFormik({
    validationSchema: partnershipValidationModalSchema,
    initialValues: {
    },
    onSubmit: (values) => {
      console.log(values);
      if (user) {
        if (partnerData?.getItem) {
          deleteItem({
            variables: {
              item_type: `PARTNER#${user.sub.split('|')[1]}`,
              user_id: id,
            }
          });
        } else {
          createPartner({
            variables: {
              datetime: new Date().toISOString(),
              item_type: `PARTNER#${user.sub.split('|')[1]}`,
              user_id: id,
              partner_id: user.sub.split('|')[1],
              partner_name: user.nickname,
              partner_status: "pending",
            },
            onCompleted: (data) => {
              console.log(data);
              handleClose();
              router.reload();
            }
          })
        }
      } else {
        router.push('/api/auth/login');
      }
    },
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <ParnerReqDiv>
            <Typography variant="h5">
              Request Partnership With Social Organisation
            </Typography>
            <TextField
              id="name"
              name="name"
              label="Name"
              multiline
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              placeholder="Enter your name here"
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              label="Email Address"
              multiline
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Enter your email address here"
              fullWidth
            />

            <TextField
              id="details"
              name="details"
              label="Details"
              multiline
              rows={4}
              onChange={formik.handleChange}
              error={formik.touched.details && Boolean(formik.errors.details)}
              placeholder="Share some details"
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Submit
            </Button>
          </ParnerReqDiv>
        </form>
      </Box>
    </Modal>
  );
};

export default PartnershipModal;
