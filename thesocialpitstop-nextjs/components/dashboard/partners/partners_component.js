import { useQuery, useMutation } from "@apollo/client";
import { AccessTime } from "@mui/icons-material";
import { Button, Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0";
import { parseISO } from "date-fns";
import { LIST_PARTNERS_OF_USER } from "../../../graphql/queries";
import { CREATE_PARTNER, UPDATE_PARTNER, DELETE_ITEM } from "../../../graphql/mutations";
import {
    PartnerComponentItem,
    PartnerCardDiv,
    PartnerComponentItemTitle,
    PartnersComponentDiv,
    PartnerComponentItemDate,
} from "./partners_component.style";
import { ActionContainer } from "./partners_component.style";
import { useRouter } from 'next/router';


const PartnersComponent = () => {
    const [partnerData, setPartnerData] = useState([]);
    const { user, error, isLoading } = useUser();
    const [createPartner] = useMutation(CREATE_PARTNER);
    const [deleteItem] = useMutation(DELETE_ITEM, {
        refetchQueries: [{query: LIST_PARTNERS_OF_USER}, "MyQuery"]
    });
    const router = useRouter();
    const [updatePartner] = useMutation(UPDATE_PARTNER, {
        refetchQueries: [{query: LIST_PARTNERS_OF_USER}, "MyQuery"]
    });

    const { data: partners, loading: partnersLoading, error: partnersError } = useQuery(LIST_PARTNERS_OF_USER, {
        variables: {
            user_id: user?.sub.split('|')[1],
        },
    });

    useEffect(() => {
        if (partners) {
            console.log(partners.queryUserWithItemTypePrefix.items.length);
            setPartnerData(partners.queryUserWithItemTypePrefix.items);
        }
    }, [partners])

    // Handle incoming partner requests
    const acceptPartner = (partner_id) => {
        updatePartner({
            variables: {
                item_type: `PARTNER#${partner_id}`,
                user_id: user.sub.split('|')[1],
                partner_status: 'accepted'
            }
        });
        createPartner({
            variables: {
                datetime: new Date().toISOString(),
                item_type: `PARTNER#${user.sub.split('|')[1]}`,
                user_id: partner_id,
                partner_id: user.sub.split('|')[1],
                partner_name: user.nickname,
                partner_status: 'accepted'
              }
        });
    }

    const rejectPartner = (partner_id) => {
        deleteItem({
            variables: {
                item_type: `PARTNER#${partner_id}`,
                user_id: user.sub.split('|')[1],
            }
        });
    }

    const actionableButton = (data) => {
        if (data.partner_status == 'pending') {
            return (
                <ActionContainer>
                    <p>Wants to be partners!</p>
                    <Button variant="contained" onClick={() => acceptPartner(data.partner_id)} sx={{ bgcolor: 'green', height: '3rem' }}>Accept</Button>
                    <Button variant="contained" onClick={() => rejectPartner(data.partner_id)} sx={{ bgcolor: 'red', height: '3rem' }}>Reject</Button>
                </ActionContainer>
            );
        } else {
            return <></>;
        }
    }

    const partnerItems = partnerData.map((data) => {
        console.log(data);
        return (
            <PartnerComponentItem key={data.datetime}>
                <Card>
                    <PartnerCardDiv>
                        <PartnerComponentItemTitle href={`/profile/${data.partner_id}`}>
                            {data.partner_name}
                        </PartnerComponentItemTitle>
                        {actionableButton(data)}
                        <PartnerComponentItemDate>
                            <AccessTime />
                            {parseISO(data?.datetime).toDateString()}
                        </PartnerComponentItemDate>
                    </PartnerCardDiv>
                </Card>
            </PartnerComponentItem>
        )
    });

    if (partnersLoading || partnersError) return (<div> Loading</div>);
    if (partners.queryUserWithItemTypePrefix.items.length == 0) return (<div> No partners yet </div>)
    return (
        <PartnersComponentDiv>
            {partners?.length == 0 ? <div>empty</div> : partnerItems}
        </PartnersComponentDiv>
    )
}

export default PartnersComponent;