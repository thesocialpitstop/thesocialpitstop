import { useMutation, useQuery } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  DesktopView,
  DetailsDiv,
  FollowPartnerButtonDiv,
  ItemDetail,
  ItemTitle,
  ImageAndTitleDiv,
  MobileTabPanel,
  PastCsrDiv,
  ProfilePage,
  ReviewDiv,
  ReviewTitleDiv,
  Subtitle,
  Title,
  TitleDiv,
} from "../../components/profile/[id].style";
import {
  CREATE_FOLLOW,
  CREATE_PARTNER,
  DELETE_ITEM,
} from "../../graphql/mutations";
import {
  GET_FOLLOWER,
  GET_PARTNER,
  GET_PAST_CSR_DATA,
  GET_PROFILE,
  GET_REVIEWS_OF_USER_LIMIT,
} from "../../graphql/queries";

import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import CreateReviewModal from "../../components/profile/create_review_modal";
import ListReviewModal from "../../components/profile/list_review_modal";
import PostItem from "../../components/profile/post_item";
import ReviewItem from "../../components/profile/review_item";
import categories from "../../constants/categories";
import profileImage from "../../public/beach-cleanup.webp";
import { CLOUDFRONT_URL } from "../../constants/constants";
import PartnershipModal from "../../components/profile/partnership_modal";
import parsePhoneNumber from "libphonenumber-js";

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
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const ProfileID = () => {
  const [profileData, setProfileData] = useState();
  const [reviewData, setReviewData] = useState();
  const [pastCSRData, setPastCSRData] = useState();
  const [createReviewModal, setCreateReviewModalState] = useState(false);
  const [listReviewModal, setListReviewModalState] = useState(false);
  const [phone, setPhone] = useState();
  const [partnershipModal, setPartnershipModalState] = useState(false);
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUser();
  const [createFollow] = useMutation(CREATE_FOLLOW);
  const [createPartner] = useMutation(CREATE_PARTNER);
  const [deleteItem] = useMutation(DELETE_ITEM);
  const ownProfile = user && id == user.sub.split("|")[1];

  // Profile Data
  const { data: profile } = useQuery(GET_PROFILE, {
    variables: {
      user_id: id,
      item_type: "SOO-PROFILE",
    },
  });

  useEffect(() => {
    if (profile) {
      console.log(profile.getItem);
      setProfileData(profile.getItem);
      setPhone(
        parsePhoneNumber(
          profile?.getItem?.contact_num,
          "SG"
        ).formatInternational()
      );
    }
  }, [profile]);

  // Follow Data
  const { data: follower } = useQuery(GET_FOLLOWER, {
    variables: {
      user_id: id,
      item_type: `FOLLOW#${user?.sub.split("|")[1]}`,
    },
  });

  const { data: pastCSRPosts } = useQuery(GET_PAST_CSR_DATA, {
    variables: {
      user_id: id,
    },
  });

  useEffect(() => {
    if (pastCSRPosts) {
      console.log(pastCSRPosts);
      setPastCSRData(pastCSRPosts.queryUserWithItemTypePrefix.items);
    }
  }, [pastCSRPosts]);

  const handleFollow = (event) => {
    if (user) {
      if (follower?.getItem) {
        deleteItem({
          variables: {
            item_type: `FOLLOW#${user.sub.split("|")[1]}`,
            user_id: id,
          },
        });
      } else {
        createFollow({
          variables: {
            datetime: new Date().toISOString(),
            item_type: `FOLLOW#${user.sub.split("|")[1]}`,
            user_id: id,
            follower_id: user.sub.split("|")[1],
            follower_name: user.nickname,
          },
        });
      }
      router.reload();
    } else {
      router.push("/api/auth/login");
    }
  };

  // Partner Data
  const { data: partnerData } = useQuery(GET_PARTNER, {
    variables: {
      user_id: id,
      item_type: `PARTNER#${user?.sub.split("|")[1]}`,
    },
  });

  const handlePartner = (event) => {
    setPartnershipModalState(true);
  };

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
    const [src, setSrc] = React.useState(
      `${CLOUDFRONT_URL}/${profileData?.user_id}`
    );
    return (
      <>
        <TitleDiv>
          <Image
            src={src}
            alt="profile_picture"
            width={64}
            height={64}
            quality={100}
            onError={() =>
              setSrc(`https://ui-avatars.com/api/?name=${profileData?.name}`)
            }
          />
          <Title>{profileData?.name}</Title>
          <Subtitle>{profileData?.details}</Subtitle>
        </TitleDiv>

        <FollowPartnerButtonDiv>
          <Button
            variant="contained"
            onClick={ownProfile ? undefined : handleFollow}
            disabled={ownProfile}
          >
            {user && follower?.getItem ? "- Unfollow" : "+ Follow"}
          </Button>
          <Button
            variant="contained"
            onClick={ownProfile ? undefined : handlePartner}
            disabled={ownProfile}
          >
            {user && partnerData?.getItem
              ? "Cancel Partnership Request"
              : "Send Partnership Request"}
          </Button>
        </FollowPartnerButtonDiv>
        <DetailsDiv>
          <ItemTitle>Category</ItemTitle>
          <ItemDetail>
            {profileData?.category ? (
              <a href={`/search?category=${profileData?.category}`}>
                {
                  categories.filter(
                    (cat) => cat.value === profileData?.category
                  )[0].name
                }
              </a>
            ) : (
              "Others"
            )}
          </ItemDetail>
          <ItemTitle>Address</ItemTitle>
          <ItemDetail>{profileData?.address}</ItemDetail>
          <ItemTitle>Contact No.</ItemTitle>
          <ItemDetail>
            <a href={`tel:${profileData?.contact_num}`}>{phone}</a>
          </ItemDetail>
          <ItemTitle>Website</ItemTitle>
          <ItemDetail>
            <a href={`mailto:${profileData?.email}`}>{profileData?.email}</a>
          </ItemDetail>
        </DetailsDiv>
      </>
    );
  };

  const reviewItems = reviewData?.map((rev) => {
    return <ReviewItem key={rev.reviewer_id} data={rev} />;
  });

  const pastCsrItems = pastCSRData?.map((content) => {
    return (
      <Link
        href={`/${id}/${content.item_type.split("#")[1]}`}
        passHref
        key={content.name}
      >
        <a>
          <PostItem key={content.name} content={content} />
        </a>
      </Link>
    );
  });

  return (
    <ProfilePage>
      <MobileTabPanel>
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
          <Button
            variant="outlined"
            onClick={() => setListReviewModalState(true)}
          >
            View More Reviews
          </Button>
        </TabPanel>
      </MobileTabPanel>
      <ListReviewModal
        open={listReviewModal}
        setOpen={setListReviewModalState}
        profileData={profileData}
        initialItems={reviewData}
        openCreateReviewModal={() => setCreateReviewModalState(true)}
      />
      <CreateReviewModal
        open={createReviewModal}
        setOpen={setCreateReviewModalState}
        id={id}
      />
      <PartnershipModal
        open={partnershipModal}
        setOpen={setPartnershipModalState}
      />
      <DesktopView>
        <Overview />
        <h1>Past CSR Activities</h1>
        <PastCsrDiv>{pastCsrItems}</PastCsrDiv>

        <ReviewDiv>
          <ReviewTitleDiv>
            <h1>Reviews</h1>
            <Button
              variant="contained"
              onClick={() => setCreateReviewModalState(true)}
            >
              Leave A Review
            </Button>
          </ReviewTitleDiv>
          {reviewData.length == 0 ? <div>No Reviews Yet</div> : reviewItems}
          {reviewData.length == 0 ? (
            <></>
          ) : (
            <Button
              variant="outlined"
              onClick={() => setListReviewModalState(true)}
            >
              View More Reviews
            </Button>
          )}
        </ReviewDiv>
      </DesktopView>
    </ProfilePage>
  );
};

export default ProfileID;
