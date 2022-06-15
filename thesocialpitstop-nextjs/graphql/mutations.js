import { gql } from "@apollo/client";

export const CREATE_PROFILE = gql`
  mutation MyMutation(
    $address: String,
    $category: String,
    $contact_num: AWSPhone,
    $datetime: AWSDateTime,
    $details: String,
    $email: AWSEmail,
    $name: String!,
    $user_id: String!,
    $item_type: String!
  ) {
    createItem(
      input: {
        address: $address,
        category: $category,
        contact_num: $contact_num
        datetime: $datetime,
        details: $details,
        email: $email,
        name: $name,
        item_type: $item_type,
        user_id: $user_id,
      }
    ) {
      address
      category
      contact_num
      datetime
      details
      email
      name
      item_type
      user_id
    }
  }
`;

export const CREATE_POST = gql`
  mutation MyMutation(
    $content: String, 
    $datetime: AWSDateTime,
    $item_type: String, 
    $name: String, 
    $title: String!, 
    $user_id: String!
  ) {
    createItem(
      input: {
        content: $content, 
        datetime: $datetime, 
        item_type: $item_type, 
        name: $name, 
        title: $title,
        user_id: $user_id
      }
    ) {
      content
      datetime
      item_type
      name
      title
      user_id
    }
  }
`