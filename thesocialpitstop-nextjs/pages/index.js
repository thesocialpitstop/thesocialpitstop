import CsrItem from '../components/home_page/csr_item';
import { 
  Title, 
  CarouselSection,
  CarouselText,
  CarouselSubtitle,
  IntroSection,
  IntroTitle,
  IntroText,
  UpcomingCarousel,
  CsrItemsDiv,
  HeroSection,
  CarouselImage,
  CarouselImageContainer
} from '../components/home_page/index.style'
import IntroItem from '../components/home_page/intro_item';
import firework from "../public/images/firework.jpg";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

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

const introListData = [
  {
    header: "Cost",
    content: "Price and Time is a major concern for many companies",
    image: "hourglass",
  },
  {
    header: "Communication",
    content: "Miscommunication and misalignment often happen, resulting in unsustainable partnerships",
    image: "chat"
  },
  {
    header: "Additional Overhead",
    content: "Not all companies can justify hiring a team just to work on CSR projects",
    image: "group"
  }
]

const introItems = introListData.map((content, index) => <IntroItem key={content.title} data={content} index={index}/>)

const csrItems = csrList.map((content) =>     <CsrItem key={content.title} item={content}></CsrItem> );
//--------- UPCOMING SECTION ---------

export default function HomePage() {
  return (
    <>
      <HeroSection>
        <CarouselSection>
          <CarouselText>
            Creating impactful, sustainable, and cost-effective CSR activities.
          </CarouselText>
          <CarouselSubtitle>
          We provide resources for SMEs to identify and connect with Social Enterprises that are aligned with the companies’ vision and mission,
          </CarouselSubtitle>
        </CarouselSection>
        <CarouselImageContainer>
          <CarouselImage src={firework} width={256} height={256}/>
        </CarouselImageContainer>
      </HeroSection>
      <IntroSection>
        {introItems}
      </IntroSection>
      {/* <UpcomingCarousel>
        Upcoming CSR Events:
        <CsrItemsDiv>
          {csrItems}
        </CsrItemsDiv>
      </UpcomingCarousel> */}
    </>
  );
}
