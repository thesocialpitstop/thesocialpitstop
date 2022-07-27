import { useState } from "react";
import { CLOUDFRONT_URL } from "../../constants/constants";
import {
    PostImage,
  PostItemDiv,
  PostItemTitleDiv,
} from "./post_item.style";

const PostItem = ({ content }) => {
  const [src, setSrc] = useState(`${CLOUDFRONT_URL}/posts/${content.item_type.split("#")[1]}`);
  console.log(src);
  return (
    <PostItemDiv>
      <PostImage
        src={src ? src : `https://ui-avatars.com/api/?name=${content.title}`}
        height={128}
        width={128}
        quality={100}
      />
      <PostItemTitleDiv>{content.title}</PostItemTitleDiv>
    </PostItemDiv>
  );
};

export default PostItem;
