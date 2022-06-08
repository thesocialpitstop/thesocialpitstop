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
      }) {
        category
        datetime
        address
        contact_num
        email
        details
      }
  }
`;