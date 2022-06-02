import styled from 'styled-components'
import ItemComponent from '../styles/item_component';
import CsrItem from '../components/home_page/csr_item';
import { 
  Title, 
  CarouselSection,
  CarouselText,
  IntroSection,
  IntroTitle,
  IntroText,
  UpcomingCarousel,
  CsrItemsDiv
} from '../components/home_page/index.style'

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
