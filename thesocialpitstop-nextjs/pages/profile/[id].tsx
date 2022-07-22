import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  ProfilePage
} from "../../components/profile/[id].style";

import Link from "next/link";
import CreateReviewModal from "../../components/profile/create_review_modal";
import ListReviewModal from "../../components/profile/list_review_modal";
import PartnershipModal from "../../components/profile/partnership_modal";
import PostItem from "../../components/profile/post_item";
import { ProfileDesktopView } from "../../components/profile/profile_desktop_view";
import { ProfileMobileView } from "../../components/profile/profile_mobile_view";
import ReviewItem from "../../components/profile/review_item";
import { Post } from "../../models/post";
import { Profile } from "../../models/profile";
import { Review } from "../../models/review";
import {
  usePastCSR,
  useProfile,
  useReviews
} from "./api";

const ProfileID = () => {
  const [profileData, setProfileData] = useState<Profile>();
  const [createReviewModal, setCreateReviewModalState] = useState(false);
  const [listReviewModal, setListReviewModalState] = useState(false);
  const [reviewData, setReviewData] = useState<Review[]>();
  const [pastCSRData, setPastCSRData] = useState<Post[]>();
  const [partnershipModal, setPartnershipModalState] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const profile = useProfile(id);
  const pastCSRPosts = usePastCSR(id);
  const reviews = useReviews(id);

  useEffect(() => {
    if (profile) {
      console.log(profile);
      setProfileData(profile.getItem);
    }
  }, [profile]);

  useEffect(() => {
    if (pastCSRPosts) {
      console.log(pastCSRPosts);
      setPastCSRData(pastCSRPosts.queryUserWithItemTypePrefix.items);
    }
  }, [pastCSRPosts]);

  useEffect(() => {
    if (reviews) {
      console.log(reviews);
      setReviewData(reviews.queryUserWithItemTypePrefix.items);
    }
  }, [reviews]);

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
      <ProfileMobileView
        profileData={profileData}
        id={id}
        setListReviewModalState={setListReviewModalState}
        setPartnershipModalState={setPartnershipModalState}
      />
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
      <ProfileDesktopView
        id={id}
        profileData={profileData}
        reviewItems={reviewItems}
        pastCsrItems={pastCsrItems}
        setPartnershipModalState={setPartnershipModalState}
        setCreateReviewModalState={setCreateReviewModalState}
        setListReviewModalState={setListReviewModalState}
      />
    </ProfilePage>
  );
};

export default ProfileID;
