import { useQuery } from '@apollo/client';
import { SOO_PROFILE_STRING } from '../constants/constants';
import { GET_PROFILE } from '../graphql/queries';

export class APIInterface {
    getProfile(user_id: string) {
        const { data: profile } = useQuery(GET_PROFILE, {
            variables: {
            user_id: user_id,
            item_type: SOO_PROFILE_STRING,
            },
        });
        return profile;
    }
}

