import React, 
    { 
        useEffect, 
        useState 
    } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { LOAD_PROFILE } from '../../graphql/queries';
import { 
    DetailsDiv,
    Title,
    ItemTitle,
    ItemDetail
} from '../../components/profile/[id].style';


const ProfileID = () => {
    const [profileData, setProfileData] = useState();
    const router = useRouter();
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
            {profileData?.name}
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