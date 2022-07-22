import {
    PostImage,
  PostItemDiv,
  PostItemTitleDiv,
} from "./post_item.style";

const PostItem = ({ content }) => {
  return (
    <PostItemDiv>
      <PostImage
        src="https://blogassets.singsaver.com.sg/wp-content/uploads/sites/2/2022/05/11174518/blog-hero-.jpg"
        height={128}
        width={128}
      />
      <PostItemTitleDiv>{content.title}</PostItemTitleDiv>
    </PostItemDiv>
  );
};

export default PostItem;
