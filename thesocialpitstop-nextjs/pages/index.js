import styled from 'styled-components'
import ItemComponent from '../styles/item_component';
import CsrItem from '../components/home_page/csr_item';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`
const CarouselSection = styled.div`
  display: grid;
  align-content: center;
  height: 480px;
  background-image: url('/beach-cleanup.webp');
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
`;

const CarouselText = styled.div`
  background-color: rgba(127, 117, 174, 0.7);
  font-family: Montserrat, sans-serif;
  font-weight: 800;
  text-align: center;
  font-size: 58px;
  color: white ;
`;

//--------- INTRO SECTION ---------
const IntroSection = styled.div`
  height: 120px;
  //MOBILE SCREEN
  @media (max-width: 768px) {
    height: 200px;
  }
`;

const IntroTitle = styled.div`
  font-family: Montserrat, sans-serif;
  text-align: center;
  font-size: larger;
`;

const IntroText = styled.div`
  font-family: Montserrat, sans-serif;
  text-align: center;
`;

//--------- INTRO SECTION ---------


//--------- UPCOMING SECTION ---------
const UpcomingCarousel = styled.div`
  font-family: Montserrat, sans-serif;
  font-size: x-large;
`;

const CsrItemsDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));  
  grid-column: 1;
`;
const csrList = [
  {
    title: "Old Folks Home",
    description: "Volunteering at old folks home on 23rd March 2022",
    image_url: "https://blogassets.singsaver.com.sg/wp-content/uploads/sites/2/2022/05/11174518/blog-hero-.jpg"
  },
  {
    title: "Old Folks Home",
    description: "Volunteering at old folks home on 23rd March 2022",
    image_url: "https://blogassets.singsaver.com.sg/wp-content/uploads/sites/2/2022/05/11174518/blog-hero-.jpg"
  },
  {
    title: "Old Folks Home",
    description: "Volunteering at old folks home on 23rd March 2022",
    image_url: "https://blogassets.singsaver.com.sg/wp-content/uploads/sites/2/2022/05/11174518/blog-hero-.jpg"
  },
  {
    title: "Old Folks Home",
    description: "Volunteering at old folks home on 23rd March 2022",
    image_url: "https://blogassets.singsaver.com.sg/wp-content/uploads/sites/2/2022/05/11174518/blog-hero-.jpg"
  },
  {
    title: "Old Folks Home",
    description: "Volunteering at old folks home on 23rd March 2022",
    image_url: "https://blogassets.singsaver.com.sg/wp-content/uploads/sites/2/2022/05/11174518/blog-hero-.jpg"
  },
  {
    title: "Old Folks Home",
    description: "Volunteering at old folks home on 23rd March 2022",
    image_url: "https://blogassets.singsaver.com.sg/wp-content/uploads/sites/2/2022/05/11174518/blog-hero-.jpg"
  }
]

const csrItems = csrList.map((content) =>     <CsrItem key={content.title} item={content}></CsrItem> );
//--------- UPCOMING SECTION ---------

export default function HomePage() {
  return (
    <>
      <CarouselSection>
        <CarouselText>
          Welcome to 
        </CarouselText>
        <CarouselText>
          The Social Pitstop !
        </CarouselText>
      </CarouselSection>
      <IntroSection>
        <IntroTitle>The Social Pitstop</IntroTitle>
        <IntroText>
          The Social Pitstop is a platform for businesses to look for CSR initiatives. 
          Establish sustainable connections today!
        </IntroText>
      </IntroSection>
      <UpcomingCarousel>
        Upcoming CSR Events:
        <CsrItemsDiv>
          {csrItems}
        </CsrItemsDiv>
      </UpcomingCarousel>
    </>
  );
}
