import { useQuery } from "@apollo/client";
import {
  CHECK_REVIEW_EXIST,
  GET_FOLLOWER,
  GET_PARTNER,
  GET_PAST_CSR_DATA,
  GET_PROFILE,
  GET_REVIEWS_OF_USER_LIMIT,
} from "../graphql/queries";

export function usePastCSR(id) {
  const { data: pastCSRPosts } = useQuery(GET_PAST_CSR_DATA, {
    variables: {
      user_id: id,
    },
  });
  return pastCSRPosts;
}

export function useFollowers(followed_id, follower_id) {
  const { data: follower } = useQuery(GET_FOLLOWER, {
    variables: {
      user_id: followed_id,
      item_type: `FOLLOW#${follower_id}`,
    },
  });
  return follower;
}

export function useProfile(id) {
  // Profile Data
  const { data: profile } = useQuery(GET_PROFILE, {
    variables: {
      user_id: id,
      item_type: "SOO-PROFILE",
    },
  });
  return profile;
}

export function useCheckReview(pageId, currentId) {
  // Profile Data
  const { data: review } = useQuery(CHECK_REVIEW_EXIST, {
    variables: {
      user_id: pageId,
      item_type: `REVIEW#${currentId}`,
    },
  });
  return review;
}

export function usePartners(requested_id, requesting_id) {
      // Partner Data
  const { data: partnerData } = useQuery(GET_PARTNER, {
    variables: {
      user_id: requested_id,
      item_type: `PARTNER#${requesting_id}`,
    },
  });
  return partnerData;
}

export function useReviews(id) {
      // Review Data
  const {
    data: reviews,
  } = useQuery(GET_REVIEWS_OF_USER_LIMIT, {
    variables: {
      user_id: id,
      limit: 2,
    },
  });
  return reviews;
}
