import {
    FooterDiv,
    FooterLinks,
    FooterSocial,
    FooterLogo
} from "./footer.style.js"
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
    return(
        <FooterDiv >
            <FooterLogo>The Social Pitstop</FooterLogo>
            <FooterLinks />
            <FooterSocial>
                <SocialIcon url="https://www.linkedin.com/company/the-social-pitstop" bgColor="white" fgColor="#000C26"/>
            </FooterSocial>
        </FooterDiv>
    )
}

export default Footer;