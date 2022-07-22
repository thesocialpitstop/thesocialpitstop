import { Button } from "@mui/material"
import Events from "./events/events"
import { Overview } from "./overview"
import { DesktopView, PastCsrDiv, ReviewDiv, ReviewTitleDiv } from "./[id].style"

export const ProfileDesktopView = ( {id, profileData, pastCsrItems,reviewItems, setPartnershipModalState, setCreateReviewModalState, setListReviewModalState,} ) => {
    
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