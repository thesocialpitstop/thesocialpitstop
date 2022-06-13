import React,
{
    useEffect,
    useState
} from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { LOAD_PROFILE } from '../../graphql/queries';
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
import PostItem from '../../components/profile/post_item';


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


    const { data, loading, error } = queryParams;
    useEffect(() => {
        if (data) {
            console.log(data.getItem);
            setProfileData(data.getItem);
        }
    }, [data])

    const pastCsrFakeData = [
        {
            "name": "beach Clean up",
            "date": "16049387483"
        },
        {
            "name": "beach Clean up",
            "date": "16049387483"
        },
        {
            "name": "beach Clean up",
            "date": "16049387483"
        },
        {
            "name": "beach Clean up",
            "date": "16049387483"
        },
        {
            "name": "beach Clean up",
            "date": "16049387483"
        },
    ]

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
                {pastCsrItems}
            </PastCsrDiv>
        </ProfilePage>

    );
}

export default ProfileID;