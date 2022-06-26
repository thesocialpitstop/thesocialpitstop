import { gql } from "@apollo/client";

// DELETE
export const DELETE_ITEM = gql`
  mutation MyMutation($item_type: String!, $user_id: String!) {
    deleteItem(input: {item_type: $item_type, user_id: $user_id}) {
      user_id
      item_type
    }
  }
`

// PROFILE
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

export const UPDATE_PROFILE = gql`
  mutation MyMutation(
    $user_id: String!, 
    $item_type: String!,
    $address: String,
    $category: String,
    $details: String,
    $email: String,
    $name: String
  ) {
    updateItem(
      input: {
        name: $name,
        email: $email,
        details: $details,
        category: $category,
        address: $address,
      }
    ) {
      name
    }
  }
`

// POST
export const CREATE_POST = gql`
  mutation MyMutation(
    $content: String, 
    $datetime: AWSDateTime,
    $item_type: String!, 
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

export const UPDATE_POST = gql`
  mutation MyMutation(
    $user_id: String!,
    $item_type: String!,
    $content: String!,
    $title: String!,
  ) {
    updateItem(
      input: {
        user_id: $user_id,
        item_type: $item_type,
        content: $content,
        title: $title,
      }
    )  {
      user_id
      item_type
      content
      title
    }
  }
`

// REVIEW
export const CREATE_REVIEW = gql`
  mutation MyMutation(
    $datetime: AWSDateTime,
    $item_type: String!, 
    $user_id: String!,
    $reviewer_id: String!,
    $reviewer_name: String!,
    $rating: Int!,
    $review: String
  ) {
    createItem(
      input: {
        datetime: $datetime,
        item_type: $item_type, 
        user_id: $user_id,
        reviewer_id: $reviewer_id,
        reviewer_name: $reviewer_name,
        rating: $rating,
        review: $review
      }
    ) {
      datetime
      item_type
      user_id
      reviewer_id
      reviewer_name
      rating,
      review
    }
  }
`

// FOLLOW
export const CREATE_FOLLOW = gql`
  mutation MyMutation(
    $datetime: AWSDateTime,
    $item_type: String!, 
    $user_id: String!,
    $follower_id: String!,
    $follower_name: String!
  ) {
    createItem(
      input: {
        datetime: $datetime
        item_type: $item_type
        user_id: $user_id
        follower_id: $follower_id
        follower_name: $follower_name
      }
    ) {
      datetime
      item_type
      user_id
      follower_id
      follower_name
    }
  }
`

// PARTNER
export const CREATE_PARTNER = gql`
  mutation MyMutation(
    $datetime: AWSDateTime,
    $item_type: String!, 
    $user_id: String!,
    $partner_id: String,
    $partner_name: String,
    $partner_status: String
  ) {
    createItem(
      input: {
        datetime: $datetime
        item_type: $item_type
        user_id: $user_id
        partner_id: $partner_id
        partner_name: $partner_name
        partner_status: $partner_status
      }
    ) {
      datetime
      item_type
      user_id
      partner_id
      partner_name
      partner_status
    }
  }
`

export const UPDATE_PARTNER = gql`
  mutation MyMutation(
    $datetime: AWSDateTime,
    $item_type: String!, 
    $user_id: String!,
    $partner_id: String,
    $partner_name: String,
    $partner_status: String
  ) {
    updateItem(
      input: {
        datetime: $datetime
        item_type: $item_type
        user_id: $user_id
        partner_id: $partner_id
        partner_name: $partner_name
        partner_status: $partner_status
      }
    ) {
      partner_status
    }
  }
`