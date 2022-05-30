import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { LOAD_PROFILE } from '../../graphql/queries';
import styled from 'styled-components';

const Title = styled.h1`
font-family: Montserrat, sans-serif;
font-size: xx-large;
`;

const DetailsDiv = styled.div``;
const ItemTitle = styled.div`
font-family: Montserrat, sans-serif;
color: gray;
`;

const ItemDetail = styled.div`
font-family: Montserrat, sans-serif;
font-size: large;
`;
const ProfileID = () => {
    const [profileData, setProfileData] = useState();
    const router = useRouter();
    const { user, error, isLoading } = useUser();
    const { id } = router.query;
    const withSearch = useQuery(LOAD_PROFILE, {
        variables: {
          pk: id,
          item_type: "SOO-PROFILE"
        }
      });
    const queryParams = withSearch;


    const { data, loading, profileError } = queryParams;
    useEffect(() => {
        if(data) {
            console.log(data.getItem);
            setProfileData(data.getItem)
        }
    },[data])


  return (
    <>
        <Title>
            {/* {profileData.item.name} */}
            hello
        </Title>
        <DetailsDiv>
            <ItemTitle>Category</ItemTitle>
                <ItemDetail>{profileData?.category}</ItemDetail>
            <ItemTitle>Address</ItemTitle>
                <ItemDetail>{profileData?.address}</ItemDetail>
            <ItemTitle>Contact No.</ItemTitle>
                <ItemDetail>{profileData?.contact_num}</ItemDetail>
            <ItemTitle>Details</ItemTitle>
                <ItemDetail>{profileData?.details}</ItemDetail>
            <ItemTitle>Website</ItemTitle>
                <ItemDetail>www.mysoo.com</ItemDetail>

        </DetailsDiv>
    </>

    );
}

export default ProfileID;