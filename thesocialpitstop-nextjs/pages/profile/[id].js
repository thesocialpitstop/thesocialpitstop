import React,
{
    useEffect,
    useState
} from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { useUser } from '@auth0/nextjs-auth0';
import { LOAD_PROFILE } from '../../graphql/queries';
import { CREATE_REVIEW, CREATE_FOLLOW } from '../../graphql/mutations';
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
import { Button } from "@mui/material";


const ProfileID = () => {
    const [profileData, setProfileData] = useState();
    const router = useRouter();
    const { id } = router.query;
    const { user } = useUser();
    const { data, loading, error } = useQuery(LOAD_PROFILE, {
        variables: {
            pk: id,
            item_type: "SOO-PROFILE"
        }
    });

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
        }
    ]

    const pastCsrItems = pastCsrFakeData.map((content) => {
        return <PastCsrItem key={content.name}>{content.name}</PastCsrItem>
    })

    const [createFollow] = useMutation(CREATE_FOLLOW);

    const handleFollow = (event) => {
        console.log(user);
        createFollow({
            variables: {
                datetime: new Date().toISOString(),
                item_type: `FOLLOW#${user?.sub.split('|')[1]}`,
                user_id: id,
                follower_id: user?.sub.split('|')[1],
                follower_name: user?.nickname
            }
        })
    }

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

            <Button variant="outlined" onClick={handleFollow}>+ Follow</Button>

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

            <PastCsrDiv>
                {pastCsrItems}
            </PastCsrDiv>
        </ProfilePage>

    );
}

export default ProfileID;