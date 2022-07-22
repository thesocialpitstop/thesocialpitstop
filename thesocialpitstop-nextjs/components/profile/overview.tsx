import { useMutation } from "@apollo/client";
import { useUser } from "@auth0/nextjs-auth0";
import { Button } from "@mui/material";
import { parsePhoneNumber } from "libphonenumber-js";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import categories from "../../constants/categories";
import { CLOUDFRONT_URL } from "../../constants/constants";
import { CREATE_FOLLOW, DELETE_ITEM } from "../../graphql/mutations";
import { useFollowers, usePartners } from "../../pages/profile/api";
import {
  DetailsDiv,
  InformationDiv,
  ItemDetail,
  ItemTitle,
  Title,
  TitleDiv,
} from "./[id].style";

export const Overview = ({ profileData, id, setPartnershipModalState }) => {
  const [src, setSrc] = useState(
    `${CLOUDFRONT_URL}/profile/${profileData?.user_id}`
  );
  const { user } = useUser();
  const [follow, setFollow] = useState(false);
  const [followText, setFollowText] = useState("");
  const partnerData = usePartners(id);
  const router = useRouter();

  const follower = useFollowers(id);
  const ownProfile = user && id == user.sub.split("|")[1];
  const [followButtonDisabledState, setFollowButtonDisabledState] =
    useState(false);
  const [deleteItem] = useMutation(DELETE_ITEM);
  const [createFollow] = useMutation(CREATE_FOLLOW);
  const [phone, setPhone] = useState<string>();

  useEffect(() => {
    setFollowText(user && follower?.getItem ? "FOLLOWING" : "FOLLOW");
    setFollow(user && follower?.getItem ? true : false);
  }, []);

  const partnerText =
    user && partnerData?.getItem
      ? "Cancel Partnership Request"
      : "Send Partnership Request";
  console.log(src);

  useEffect(() => {
    setPhone(profileData?.contact_num);
  }, []);

  const handlePartner = (event) => {
    setPartnershipModalState(true);
  };

  const handleFollow = (event) => {
    if (user) {
      if (follower?.getItem) {
        setFollowButtonDisabledState(true);
        deleteItem({
          variables: {
            item_type: `FOLLOW#${user.sub.split("|")[1]}`,
            user_id: id,
          },
          onCompleted: (data) => {
            console.log(data);
            setFollowButtonDisabledState(false);
            setFollow(false);
            setFollowText("FOLLOW");
            // router.reload();
          },
        });
      } else {
        setFollowButtonDisabledState(true);
        createFollow({
          variables: {
            datetime: new Date().toISOString(),
            item_type: `FOLLOW#${user.sub.split("|")[1]}`,
            user_id: id,
            follower_id: user.sub.split("|")[1],
            follower_name: user.nickname,
          },
          onCompleted: (data) => {
            console.log(data);
            // router.reload();
            setFollowButtonDisabledState(false);
            setFollow(true);
            setFollowText("FOLLOWING");
          },
        });
      }
    } else {
      router.push("/api/auth/login");
    }
  };

  return (
    <>
      <TitleDiv>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image
            src={src}
            alt="profile_picture"
            width={64}
            height={64}
            onError={() =>
              setSrc(`https://ui-avatars.com/api/?name=${profileData?.name}`)
            }
          />
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              variant={follow ? "contained" : "outlined"}
              onClick={ownProfile ? undefined : handleFollow}
              disabled={followButtonDisabledState || ownProfile}
            >
              {followText}
            </Button>
            <Button
              variant="contained"
              onClick={ownProfile ? undefined : handlePartner}
              disabled={ownProfile}
            >
              {partnerText}
            </Button>
          </div>
        </div>
        <InformationDiv>
          <div>
            <Title>{profileData?.name}</Title>
            {profileData?.details}
          </div>
          <DetailsDiv>
            <ItemTitle>Category</ItemTitle>
            <ItemDetail>
              {profileData?.category ? (
                <a href={`/search?category=${profileData?.category}`}>
                  {
                    categories.filter(
                      (cat) => cat.value === profileData?.category
                    )[0].name
                  }
                </a>
              ) : (
                "Others"
              )}
            </ItemDetail>
            <ItemTitle>Address</ItemTitle>
            <ItemDetail>{profileData?.address}</ItemDetail>
            <ItemTitle>Contact No.</ItemTitle>
            <ItemDetail>
              {phone ? (
                <a href={`tel:${profileData?.contact_num}`}>
                  {parsePhoneNumber(phone, "SG").formatInternational()}
                </a>
              ) : (
                <></>
              )}
            </ItemDetail>
            <ItemTitle>Email Address</ItemTitle>
            <ItemDetail>
              <a href={`mailto:${profileData?.email}`}>{profileData?.email}</a>
            </ItemDetail>
          </DetailsDiv>
        </InformationDiv>
      </TitleDiv>
    </>
  );
};