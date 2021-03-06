import { Button } from "@mui/material"
import { useContext } from "react"
import { EventModalContext } from "./event_context"
import Events from "./events/events"
import { Overview } from "./overview"
import { DesktopView, PastCsrDiv, ReviewDiv, ReviewTitleDiv } from "./[id].style"
import { useUser } from "@auth0/nextjs-auth0"

export const ProfileDesktopView = ( {id, profileData, pastCsrItems,reviewItems, setPartnershipModalState, setCreateReviewModalState, setListReviewModalState,} ) => {
    const { user } = useUser();
    
    return (<DesktopView>
        <Overview id={id} profileData={profileData} setPartnershipModalState={setPartnershipModalState}/>
        <h1>Past CSR Activities</h1>
        <PastCsrDiv>
          {pastCsrItems?.length == 0 ? <>No CSR Items</> : pastCsrItems}
        </PastCsrDiv>
        <Events id={id} />

        <ReviewDiv>
          <ReviewTitleDiv>
           <h1>Reviews</h1>
            <Button
              variant="contained"
              onClick={() => setCreateReviewModalState(true)}
              disabled={id == user?.sub.split("|")[1]}
            >
              Leave A Review
            </Button>
          </ReviewTitleDiv>
          {reviewItems?.length == 0 ? <div>No Reviews Yet</div> : reviewItems}
          {reviewItems?.length == 0 ? (
            <></>
          ) : (
            <Button
              variant="outlined"
              onClick={() => setListReviewModalState(true)}
            >
              View More Reviews
            </Button>
          )}
        </ReviewDiv> 
      </DesktopView>)
}