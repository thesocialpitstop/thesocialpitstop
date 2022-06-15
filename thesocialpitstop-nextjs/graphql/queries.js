import { gql } from "@apollo/client";

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
    }
  }
`;

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


export const LOAD_POST = gql`
  query MyQuery($pk: String!, $item_type: String!) {
    getPost(item_type: $item_type, user_id: $pk) {
      content
      datetime
      item_type
      name
      title
      user_id
    }
  }
`;

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
