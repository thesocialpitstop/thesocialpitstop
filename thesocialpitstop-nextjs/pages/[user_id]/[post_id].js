import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { LOAD_POST } from '../../graphql/queries';
import { 
    ProfilePage,
    DetailsDiv,
    Title,
    ItemTitle,
    ItemDetail,
    TitleDiv,
    Subtitle
} from '../../components/profile/[id].style';
import { BlogPostAuthor, BlogPostPage, BlogPostSubtitle, BlogPostTitle } from '../../components/[user_id]/[post_id].style';
import {parseISO} from 'date-fns'
import Link from 'next/link';


const Post = () => {
    const [postData, setPostData] = useState();
    const router = useRouter();
    const { user_id, post_id } = router.query;
    const { data, loading, error } = useQuery(LOAD_POST, {
        variables: {
          pk: user_id,
          item_type: `SOO-POST#${post_id}`
        }
    });
    console.log('error', error);
    console.log('loading', loading);

    useEffect(() => {
        if(data) {
            console.log(data);
            setPostData(data.getPost)
        }
    },[data]);

    


  return (
    <BlogPostPage>
        <TitleDiv>
            <BlogPostTitle>
              {postData?.title}
            </BlogPostTitle>
            <BlogPostSubtitle>
              <span>Posted By </span>
              <BlogPostAuthor>
                <Link href={`/profile/${postData?.user_id}`} passHref>
                  {postData ? postData?.name : ""}
                </Link>
              </BlogPostAuthor>
              <span> on </span>
              {parseISO(postData?.datetime).toDateString()}
            </BlogPostSubtitle>
        </TitleDiv>

        {postData?.content}
    </BlogPostPage>

    );
}

export default Post;