import { Avatar, Rating } from "@mui/material";
import Link from "next/link";
import { CLOUDFRONT_URL } from "../../constants/constants";
import {
  ReviewItemDiv,
  ReviewUserDiv,
  ReviewContentDiv,
  ReviewNameDiv,
} from "./[id].style";

const ReviewItem = ({ data }) => {
  console.log(data);
  return (
    <ReviewItemDiv>
      <Rating name={data.reviewer_id} value={data.rating} readOnly />
      <ReviewUserDiv>
        <Avatar src={`${CLOUDFRONT_URL}/profile/${data.reviewer_id}`} />
        <ReviewNameDiv>
          <Link href={`/profile/${data.reviewer_id}`} passHref>
            <a>{data?.reviewer_name}</a>
          </Link>
        </ReviewNameDiv>
      </ReviewUserDiv>
      <ReviewContentDiv>{data.review}</ReviewContentDiv>
    </ReviewItemDiv>
  );
};

export default ReviewItem;
