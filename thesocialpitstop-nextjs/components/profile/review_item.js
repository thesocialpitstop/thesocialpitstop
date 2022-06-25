import { Avatar, Rating } from "@mui/material"
import { 
    ReviewItemDiv, 
    ReviewUserDiv,
    ReviewContentDiv,
    ReviewNameDiv
} from "./[id].style"

const ReviewItem = ({data}) => {
    console.log(data);
    return (
        <ReviewItemDiv >
            <Rating 
                name={data.reviewer_id}
                value={data.rating}
                readOnly
            />
            <ReviewUserDiv>
                <Avatar>{data.reviewer_name[0]}</Avatar>
                <ReviewNameDiv>{data.reviewer_name}</ReviewNameDiv>
            </ReviewUserDiv>
            <ReviewContentDiv>
                {data.review}
            </ReviewContentDiv>
        </ReviewItemDiv>
    )
}

export default ReviewItem;