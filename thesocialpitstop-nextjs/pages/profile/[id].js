import React,
{
    useEffect,
    useState
} from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_PROFILE, GET_REVIEWS_OF_USER_LIMIT } from '../../graphql/queries';
import {
    ProfilePage,
    DetailsDiv,
    Title,
    ItemTitle,
    ItemDetail,
    TitleDiv,
    Subtitle,
    PastCsrDiv,
    PastCsrItem,
    ReviewDiv,
    ReviewItem,
    ReviewUserDiv,
    ReviewNameDiv,
    ReviewContentDiv,
    ReviewTitleDiv
} from '../../components/profile/[id].style';
import Image from 'next/image';
import profileImage from '../../public/beach-cleanup.webp';
import categories from '../../constants/categories';
import { Avatar, Button, Rating } from '@mui/material';
import PostItem from '../../components/profile/post_item';
import ReviewModal from '../../components/profile/review_modal';

const ProfileID = () => {
    const [profileData, setProfileData] = useState();
    const [reviewData, setReviewData] = useState();
    const [reviewModal, setReviewModalState] = useState(false);
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
    const { data: reviews, loading, error } = useQuery(GET_REVIEWS_OF_USER_LIMIT, 
        {
        variables: {
            user_id: id,
            limit: 2
        }
    });

    useEffect(() => {
        if (reviews) {
            console.log(reviews.queryUserWithItemTypePrefix.items);
            setReviewData(reviews.queryUserWithItemTypePrefix.items);
        }
    }, [reviews]);

    const pastCsrFakeData = [
        {
            "name": "Beach Clean up at East Coast Park on 25th June",
            "date": "16049387483"
        }
    ]

    const reviewItems = reviewData?.map((rev) => {
        return(
            <ReviewItem key={rev.reviewer_id}>
                <Rating 
                    name={rev.reviewer_id}
                    value={rev.rating}
                    readOnly
                />
                <ReviewUserDiv>
                    <Avatar>{rev.reviewer_name[0]}</Avatar>
                    <ReviewNameDiv>{rev.reviewer_name}</ReviewNameDiv>
                </ReviewUserDiv>
                <ReviewContentDiv>
                    {rev.review}
                </ReviewContentDiv>
            </ReviewItem>
        )
    });

    const pastCsrItems = pastCsrFakeData.map((content) => {
        return <PostItem key={content.name} content={content}/>
    })

    return (
        <ProfilePage>
            <ReviewModal 
                open={reviewModal}
                setOpen={setReviewModalState}
                id={id}
            />
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
            <h1>Past CSR Activities</h1>
            <PastCsrDiv>
                {pastCsrItems}
            </PastCsrDiv>

            <ReviewDiv>
                <ReviewTitleDiv>
                    <h1>Reviews</h1>
                    <Button variant='contained'>Leave A Review</Button>
                </ReviewTitleDiv>
                {reviewItems}
                <Button variant='outlined' onClick={() => setReviewModalState(true)}>View More Reviews</Button>
            </ReviewDiv>
        </ProfilePage>
    );
}

export default ProfileID;