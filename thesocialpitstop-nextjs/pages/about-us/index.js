import styled from "styled-components";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const Text = styled.div`
    padding: 0 2rem;
    
    a:hover {
        text-decoration: underline;
    }
`;

const AboutUs = () => {
    return (
        <>
            <Text>
                <h1>About Us</h1>
                <p>
                    TheSocialPitstop is an online platform designed with businesses and socially-oriented organisations (SOOs) in mind,
                    including <b>social enterprises, charities, and non-profit organisations</b>.
                </p>
                <p>
                    Our goal is to give back to the community by making Corporate Social Responsibility (CSR) activities more
                    convenient and meaningful for businesses to carry out. Concurrently, we hope that SOOs will be able to effect
                    greater change for their beneficiaries with more abundant resources provided by their business partners
                    such as <b>volunteer manpower, funding, and services</b>.
                </p>
            </Text>

            <Text>
                <h3><a href="/docs/graphql">GraphQL API <OpenInNewIcon fontSize="small" /></a></h3>
                <p>
                    We have documented our GraphQL schema for our technically-inclined users. We will ensure that this API reference is always up-to-date!
                </p>
            </Text>
        </>
    )
}

export default AboutUs;