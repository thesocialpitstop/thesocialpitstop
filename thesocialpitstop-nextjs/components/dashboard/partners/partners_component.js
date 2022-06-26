import { useQuery } from "@apollo/client";
import { AccessTime } from "@mui/icons-material";
import { Card } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0";
import { parseISO } from "date-fns";
import { LIST_PARTNERS_OF_USER } from "../../../graphql/queries";

const PartnersComponent = () => {
    const [postData, setPostData] = useState([]);
    const { user, error, isLoading } = useUser();
    const [openModal, setOpenModal] = useState(false);
    const [postId, setPostId] = useState(false);

    const { data: posts, loading: postsLoading, error: postsError  } = useQuery(GET_ALL_POSTS_OF_USER, {
        variables: {
          user_id: user?.sub,
        },
      });

      console.log(user)
    useEffect(() => {
        if(posts) {
            console.log(posts);
            console.log(posts.queryUserWithItemTypePrefix.items.length);
            setPostData(posts.queryUserWithItemTypePrefix.items);
        }
    },[posts])

    const onClickOpenModal = (data) => {
        console.log(data);
        setPostId(data);
        setOpenModal(true);
    }

    const postItems = postData.map((data) => {
        return(
            <PostComponentItem key={data?.datetime}>
                <Card>
                    <PostCardDiv onClick={() => onClickOpenModal(data.item_type)}>
                        <PostComponentItemTitle>
                            {data?.title}
                        </PostComponentItemTitle>
                        <PostComponentItemDate>
                            <AccessTime />
                            {parseISO(data?.datetime).toDateString()}
                        </PostComponentItemDate>
                    </PostCardDiv>
                </Card>
            </PostComponentItem>
        )
    });
    if(postsLoading || postsError) return (<div> Loading</div>);
    if(posts.queryUserWithItemTypePrefix.items.length == 0) return (<div> No posts yet </div>)
    return (
        <PostsComponentDiv>
            <PostEditModal open={openModal} setOpen={setOpenModal} postId={postId}/>
            {posts?.length == 0 ? <div>empty</div> : postItems}
        </PostsComponentDiv>
    )
}

export default PartnersComponent;