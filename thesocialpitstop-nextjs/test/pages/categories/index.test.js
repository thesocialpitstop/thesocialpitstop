import CategoriesPage from "../../../pages/categories"
import { render, screen } from '@testing-library/react'

describe('Categories', () => {
    it('renders categories heading', () => {
        render(<CategoriesPage/>)
        expect(screen.get)
    })
})