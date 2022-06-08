import React from "react";
import ProfilePage from "../../../pages/profile";
import { render, screen } from "../../test-utils";

describe("ProfilePage", () => {
    it("should render profile page", () => {
        render(<ProfilePage />)
        expect(screen.get)
    })
})