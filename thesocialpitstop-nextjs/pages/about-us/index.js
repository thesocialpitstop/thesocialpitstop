import styled from "styled-components";

const Text = styled.div`
    padding: 0 2rem;
`;

const AboutUs = () => {
    return (
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
    )
}

export default AboutUs;