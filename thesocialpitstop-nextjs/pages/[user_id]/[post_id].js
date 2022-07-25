import { useQuery } from "@apollo/client";
import { parseISO } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { TitleDiv } from "../../components/profile/[id].style";
import {
  BlogPostAuthor,
  BlogPostPage,
  BlogPostSubtitle,
  BlogPostTitle,
} from "../../components/[user_id]/[post_id].style";
import { SOO_PROFILE_STRING } from "../../constants/constants";
import { GET_POST, GET_PROFILE } from "../../graphql/queries";

const Post = () => {
  const [postData, setPostData] = useState();
  const [userProfile, setUserProfile] = useState();
  const router = useRouter();
  const { user_id, post_id } = router.query;
  const { data: profile } = useQuery(GET_PROFILE, {
    variables: {
      user_id: user_id,
      item_type: SOO_PROFILE_STRING,
    },
  });
  const { data: post } = useQuery(GET_POST, {
    variables: {
      user_id: user_id,
      item_type: `POST#${post_id}`,
    },
  });

  useEffect(() => {
    if (post) setPostData(post.getItem);
  }, [post]);

  useEffect(() => {
    if (profile) {
      setUserProfile(profile.getItem);
    }
  }, [profile]);

  return (
    <BlogPostPage>
      {userProfile ? <TitleDiv>
        <BlogPostTitle>{postData?.title}</BlogPostTitle>
        <BlogPostSubtitle>
          <span>Posted By </span>
          <BlogPostAuthor>
            <Link href={`/profile/${postData?.user_id}`} passHref>
              {userProfile?.name}
            </Link>
          </BlogPostAuthor>
          <span> on </span>
          {parseISO(postData?.datetime).toDateString()}
        </BlogPostSubtitle>
      </TitleDiv> : <></>}

      <div className="ql-editor" v-html="result">
        <div dangerouslySetInnerHTML={{ __html: postData?.content }}></div>
      </div>
    </BlogPostPage>
  );
};

export default Post;
