import { gql } from "@apollo/client";

// PROFILE
export const GET_PROFILE = gql`
  query MyQuery($user_id: String!, $item_type: String!) {
    getItem(item_type: $item_type, user_id: $user_id) {
      category
      datetime
      address
      contact_num
      email
      details
      item_type
      name
      user_id
      image_url
    }
  }
`;

export const LIST_PROFILES = gql`
  query MyQuery {
    listWithItemType(item_type: "SOO-PROFILE") {
      items {
        address
        category
        contact_num
        datetime
        details
        email
        item_type
        name
        user_id
      }
    }
  }  
`;

export const GET_PROFILE_CATEGORY = gql`
  query MyQuery($category: String!, $item_type: String!) {
    queryItemWithCategory(category: $category, item_type: $item_type) {
      items {
        address
        contact_num
        category
        datetime
        details
        email
        name
        user_id
        item_type
        details
      }
    }
  }
`;

export const QUERY_WITH_NAME_PREFIX = gql`
  query MyQuery($name_prefix: String!){
    queryItemWithNamePrefix(item_type: "SOO-PROFILE", name_prefix: $name_prefix) {
      items {
        address
        category
        contact_num
        datetime
        details
        email
        item_type
        name
        user_id
      }
    }
  }
`;

export const GET_PAST_CSR_DATA = gql`
  query MyQuery($user_id: String!){
    queryUserWithItemTypePrefix(item_type_prefix: "POST", user_id: $user_id) {
      items {
        user_id
        item_type
        datetime
        title
      }
    }
  }
`;

// POST
export const GET_POST = gql`
  query MyQuery($user_id: String!, $item_type: String!) {
    getItem(item_type: $item_type, user_id: $user_id) {
      content
      datetime
      item_type
      name
      title
      user_id
    }
  }
`;

export const GET_ALL_POSTS_OF_USER = gql`
  query MyQuery($user_id: String!, $limit: Int) {
    queryUserWithItemTypePrefix(item_type_prefix: "POST", user_id: $user_id, limit: $limit) {
      items {
        content
        name
        title
        datetime
        item_type
      }
    }
  }
`;

// REVIEW
export const GET_REVIEWS_OF_USER_LIMIT = gql`
  query MyQuery($user_id: String!, $limit: Int!) {
    queryUserWithItemTypePrefix(item_type_prefix: "REVIEW", user_id: $user_id, limit: $limit) {
      items {
        reviewer_id
        reviewer_name
        rating
        review
      }
    }
  }
`;

// FOLLOW
export const GET_FOLLOWER = gql`
  query MyQuery($user_id: String!, $item_type: String!) {
    getItem(item_type: $item_type, user_id: $user_id) {
      follower_id
      follower_name
    }
  }
`;

// PARTNER
export const GET_PARTNER = gql`
  query MyQuery($user_id: String!, $item_type: String!) {
    getItem(item_type: $item_type, user_id: $user_id) {
      partner_id
      partner_name
      partner_status
    }
  }
`;

export const LIST_PARTNERS_OF_USER = gql`
  query MyQuery($user_id: String!, $limit: Int!) {
    queryUserWithItemTypePrefix(item_type_prefix: "PARTNER", user_id: $user_id, limit: $limit) {
      items {
        partner_id
        partner_name
        partner_status
      }
    }
  }
`;
