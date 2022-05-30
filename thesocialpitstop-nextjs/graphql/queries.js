import { gql } from "@apollo/client";

export const LOAD_ALL_PROFILES = gql`
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
`

export const LOAD_PROFILE_CATEGORY = gql`
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
    }
  }
}
`;

export const LOAD_PROFILE = gql`
query MyQuery($pk: String!, $item_type: String!) {
  getItem(item_type: $item_type, user_id: $pk) {
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