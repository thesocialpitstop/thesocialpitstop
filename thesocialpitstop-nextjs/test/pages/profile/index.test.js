import ProfilePage from "../../../pages/profile";
import { render, screen } from "../../test-utils";
import "@testing-library/jest-dom/extend-expect";
import { UserProvider } from "@auth0/nextjs-auth0";



describe("ProfilePage", () => {
    it("should render profile page", () => {
        render(
            <UserProvider>
                <ProfilePage />
            </UserProvider>
        )
        expect(screen.getByTitle("Past CSR Activities"))
    })
})