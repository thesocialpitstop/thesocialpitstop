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
    $user_id: String!
  ) {
    createProfile(
      input: {
        address: $address,
        category: $category,
        datetime: $datetime,
        details: $details,
        email: $email,
        item_type: "SOO-PROFILE",
        name: $name,
        user_id: $user_id,
        contact_num: $contact_num
      }
    ) {
      category
      datetime
      address
      contact_num
      email
      details
    }
  }
`;

export const CREATE_POST = gql`
  mutation MyMutation(
    $content: String!, 
    $datetime: AWSDateTime,
    $item_type: String!, 
    $name: String!, 
    $title: String!, 
    $user_id: String!
  ) {
    createPost(
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