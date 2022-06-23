import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import { CREATE_REVIEW, CREATE_FOLLOW, DELETE_ITEM } from '../../graphql/mutations';
import { GET_PROFILE, GET_REVIEWS_OF_USER_LIMIT, GET_FOLLOWER } from "../../graphql/queries";
import {
  ProfilePage,
  DetailsDiv,
  Title,
  ItemTitle,
  ItemDetail,
  TitleDiv,
  Subtitle,
  PastCsrDiv,
  PastCsrItem,
  ReviewDiv,
  ReviewUserDiv,
  ReviewNameDiv,
  ReviewContentDiv,
  ReviewTitleDiv,
  MobileTabPanel,
  DesktopView,
} from "../../components/profile/[id].style";

import ReviewItem from "../../components/profile/review_item";
import Image from "next/image";
import profileImage from "../../public/beach-cleanup.webp";
import categories from "../../constants/categories";
import {
  Avatar,
  Box,
  Button,
  Rating,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import PostItem from "../../components/profile/post_item";
import ReviewModal from "../../components/profile/review_modal";
import { useTheme } from "styled-components";
import { boolean } from 'yup';
import { ConstructionOutlined } from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component='div'>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const ProfileID = () => {
  const [profileData, setProfileData] = useState();
  const [reviewData, setReviewData] = useState();
  const [reviewModal, setReviewModalState] = useState(false);
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const [createFollow] = useMutation(CREATE_FOLLOW);
  const [deleteItem] = useMutation(DELETE_ITEM);

  // Profile Data
  const { data: profile } = useQuery(GET_PROFILE, {
    variables: {
      user_id: id,
      item_type: "SOO-PROFILE",
    },
    skip: !user
  });

  useEffect(() => {
    if (profile) {
      console.log(profile.getItem);
      setProfileData(profile.getItem);
    }
  }, [profile]);

  // Follow Button State
  const { data: follower } = useQuery(GET_FOLLOWER, {
    variables: {
      user_id: id,
      item_type: `FOLLOW#${user?.sub.split('|')[1]}`,
    },
  });

  const handleFollow = (event) => {
    if (user) {
      if (follower?.getItem) {
        deleteItem({
          variables: {
            item_type: `FOLLOW#${user.sub.split('|')[1]}`,
            user_id: id,
          }
        });
      } else {
        createFollow({
          variables: {
            datetime: new Date().toISOString(),
            item_type: `FOLLOW#${user.sub.split('|')[1]}`,
            user_id: id,
            follower_id: user.sub.split('|')[1],
            follower_name: user.nickname
          }
        })
      }
      router.reload();
    } else {
      router.push('/api/auth/login');
    }
  }

  // Review Data
  const {
    data: reviews,
    loading,
    error,
  } = useQuery(GET_REVIEWS_OF_USER_LIMIT, {
    variables: {
      user_id: id,
      limit: 2,
    },
  });

  useEffect(() => {
    if (reviews) {
      console.log(reviews.queryUserWithItemTypePrefix.items);
      setReviewData(reviews.queryUserWithItemTypePrefix.items);
    }
  }, [reviews]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const Overview = () => {
    return (
      <>
        <TitleDiv>
          <Title>{profileData?.name}</Title>
          <Subtitle>{profileData?.details}</Subtitle>
        </TitleDiv>
        <Button variant="contained" onClick={handleFollow}>
          {user && follower?.getItem ? "- Unfollow" : "+ Follow"}
        </Button>

        <DetailsDiv>
          <ItemTitle>Category</ItemTitle>
          <ItemDetail>
            {profileData?.category
              ? categories.filter(
                (cat) => cat.value === profileData?.category
              )[0].name
              : "Others"}
          </ItemDetail>
          <ItemTitle>Address</ItemTitle>
          <ItemDetail>{profileData?.address}</ItemDetail>
          <ItemTitle>Contact No.</ItemTitle>
          <ItemDetail>
            <a href={`tel:${profileData?.contact_num}`}>
              {profileData?.contact_num}
            </a>
          </ItemDetail>
          <ItemTitle>Website</ItemTitle>
          <ItemDetail>
            <a href={`mailto:${profileData?.email}`}>{profileData?.email}</a>
          </ItemDetail>
        </DetailsDiv>
      </>
    );
  };

  const pastCsrFakeData = [
    {
      name: "Beach Clean up at East Coast Park on 21th June",
      date: "16049387483",
    },
    {
      name: "Beach Clean up at East Coast Park on 22th June",
      date: "16049387483",
    },
    {
      name: "Beach Clean up at East Coast Park on 23th June",
      date: "16049387483",
    },
    {
      name: "Beach Clean up at East Coast Park on 24th June",
      date: "16049387483",
    },
    {
      name: "Beach Clean up at East Coast Park on 25th June",
      date: "16049387483",
    },
  ];

  const reviewItems = reviewData?.map((rev) => {
    return <ReviewItem key={rev.reviewer_id} data={rev} />;
  });

  const pastCsrItems = pastCsrFakeData.map((content) => {
    return <PostItem key={content.name} content={content} />;
  });

  const theme = useTheme();
  console.log(theme);

  return (
    <ProfilePage>
      <MobileTabPanel>
        <Image
          src={profileImage}
          alt="profile_picture"
          layout="responsive"
          quality={100}
        />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            variant="scrollable"
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Past CSR Activities" {...a11yProps(1)} />
            <Tab label="Reviews" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Overview />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PastCsrDiv>{pastCsrItems}</PastCsrDiv>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {reviewItems}
          <Button variant="outlined" onClick={() => setReviewModalState(true)}>
            View More Reviews
          </Button>
        </TabPanel>
      </MobileTabPanel>
      <ReviewModal
        open={reviewModal}
        setOpen={setReviewModalState}
        profileData={profileData}
        initialItems={reviewData}
      />
      <DesktopView>
        <Image
          src={profileImage}
          alt="profile_picture"
          layout="responsive"
          quality={100}
        />
        <Overview />
        <h1>Past CSR Activities</h1>
        <PastCsrDiv>{pastCsrItems}</PastCsrDiv>

        <ReviewDiv>
          <ReviewTitleDiv>
            <h1>Reviews</h1>
            <Button variant="contained">Leave A Review</Button>
          </ReviewTitleDiv>
          {reviewItems}
          <Button variant="outlined" onClick={() => setReviewModalState(true)}>
            View More Reviews
          </Button>
        </ReviewDiv>
      </DesktopView>
    </ProfilePage>
  );
};

export default ProfileID;
