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
            console.log('data', data.getItem);
            setPostData(data.getItem)
        }
    },[data]);

    


  return (
    <ProfilePage>
        <TitleDiv>
            <Title>
              {postData?.title}
            </Title>
            <Subtitle>
              {postData?.name}
              {postData?.datetime}
            </Subtitle>
        </TitleDiv>

        <DetailsDiv>
          {postData?.content}
        </DetailsDiv>
    </ProfilePage>

    );
}

export default Post;