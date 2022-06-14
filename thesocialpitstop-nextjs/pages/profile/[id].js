import React,
{
    useEffect,
    useState
} from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_PROFILE, GET_REVIEWS_OF_USER } from '../../graphql/queries';
import {
    ProfilePage,
    DetailsDiv,
    Title,
    ItemTitle,
    ItemDetail,
    TitleDiv,
    Subtitle,
    PastCsrDiv,
    PastCsrItem
} from '../../components/profile/[id].style';
import Image from 'next/image';
import profileImage from '../../public/beach-cleanup.webp';
import categories from '../../constants/categories';
import { Button } from '@mui/material';
import PostItem from '../../components/profile/post_item';

const ProfileID = () => {
    const [profileData, setProfileData] = useState();
    const [reviewData, setReviewData] = useState();
    const router = useRouter();
    const { id } = router.query;

    // Profile Data
    const { data: profile } = useQuery(GET_PROFILE, {
        variables: {
            user_id: id,
            item_type: "SOO-PROFILE"
        }
    });

    useEffect(() => {
        if (profile) {
            console.log(profile.getItem);
            setProfileData(profile.getItem);
        }
    }, [profile]);

    // Review Data
    const { data: reviews, loading, error } = useQuery(GET_REVIEWS_OF_USER, 
        {
        variables: {
            user_id: id,
        }
    });

    useEffect(() => {
        if (reviews) {
            console.log(reviews.queryUserWithItemTypePrefix.items);
            setReviewData(reviews.queryUserWithItemTypePrefix.items);
        }
    }, [reviews]);

    const reviewItems = reviewData.map((rev) => {
        return <div key={rev.reviewer_id}>
            <b>{rev.reviewer_name}: {rev.rating}/5</b><br />
            {rev.review}
        </div>
    });

    const pastCsrItems = pastCsrFakeData.map((content) => {
        return <PostItem key={content.name} content={content}/>
    })

    return (
        <ProfilePage>
            <Image
                src={profileImage}
                alt="profile_picture"
                layout="responsive"
                quality={100}
            />
            <TitleDiv>
                <Title>
                    {profileData?.name}
                </Title>
                <Subtitle>
                    {profileData?.details}
                </Subtitle>
            </TitleDiv>

            <DetailsDiv>
                <ItemTitle>Category</ItemTitle>
                <ItemDetail>
                    {profileData?.category
                        ? categories.filter((cat) => cat.value === profileData?.category)[0].name
                        : "Others"}
                </ItemDetail>
                <ItemTitle>Address</ItemTitle>
                <ItemDetail>{profileData?.address}</ItemDetail>
                <ItemTitle>Contact No.</ItemTitle>
                <ItemDetail>
                    <a href={`tel:${profileData?.contact_num}`}>{profileData?.contact_num}</a>
                </ItemDetail>
                <ItemTitle>Website</ItemTitle>
                <ItemDetail>
                    <a href={`mailto:${profileData?.email}`}>{profileData?.email}</a>
                </ItemDetail>
            </DetailsDiv>
            <h1>PAST CSR ACTIVITIES</h1>
            <PastCsrDiv>
                <h3>Past Events</h3>
                {pastCsrItems}
            </PastCsrDiv>

            <div>
                <h3>Reviews</h3>
                <Button>Leave A Review</Button>
                {reviewItems}
            </div>
        </ProfilePage>

    );
}

export default ProfileID;