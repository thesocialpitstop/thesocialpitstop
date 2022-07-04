import {
    FooterDiv,
    FooterLinks,
    FooterSocial,
    FooterLogo
} from "./footer.style.js"

const Footer = () => {
    return(
        <FooterDiv>
            <FooterLogo>The Social Pitstop</FooterLogo>
            <FooterLinks />
            <FooterSocial />
        </FooterDiv>
    )
}

export default Footer;