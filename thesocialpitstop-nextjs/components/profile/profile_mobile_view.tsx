import { useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { CREATE_PARTNER } from "../../graphql/mutations";
import { Post } from "../../models/post";
import { Review } from "../../models/review";
import { useFollowers } from "../../api/profile_api";
import Events from "./events/events";
import { Overview } from "./overview";
import PostItem from "./post_item";
import ReviewItem from "./review_item";
import { MobileTabPanel, PastCsrDiv } from "./[id].style";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
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
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const ProfileMobileView = ({ profileData, id, setListReviewModalState, setPartnershipModalState }) => {
  const { user } = useUser();
  const follower = useFollowers(id);
  const [value, setValue] = useState(0);

  const [reviewData, setReviewData] = useState<Review[]>();
  const [pastCSRData, setPastCSRData] = useState<Post[]>();
  const [createPartner] = useMutation(CREATE_PARTNER);
  const [followButtonDisabledState, setFollowButtonDisabledState] =
    useState(false);
    const [follow, setFollow] = useState(false);
    const [followText, setFollowText] = useState("");

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Tab label="Events" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Overview profileData={profileData} id={id} setPartnershipModalState={setPartnershipModalState}/>
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
      <TabPanel value={value} index={3}>
        <Events id="62a0f21a372cb39d2ba2ced0" />
      </TabPanel>
    </MobileTabPanel>
  );
};
