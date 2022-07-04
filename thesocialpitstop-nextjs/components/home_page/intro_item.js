import {
  IntroItemDiv,
  IntroItemHeader,
  IntroItemContent,
  IntroItemImage,
  IntroItemIconDiv,
} from "./intro_item.style";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';

const IntroItem = ({ data, index }) => {
  function getIcon() {
    switch(data.image) {
      case "hourglass" :
        return <HourglassBottomIcon fontSize="large"/>;
      case "chat" :
        return <ForumIcon fontSize="large"/>;
      case "group" :
        return <GroupIcon fontSize="large"/>;
    }
  }
  return (
    <IntroItemDiv index={index}>
      <IntroItemIconDiv>
        {getIcon()}
      </IntroItemIconDiv>
      <div>
        <IntroItemHeader>{data.header}</IntroItemHeader>
        <IntroItemContent>{data.content}</IntroItemContent>
      </div>
    </IntroItemDiv>
  );
};

export default IntroItem;
