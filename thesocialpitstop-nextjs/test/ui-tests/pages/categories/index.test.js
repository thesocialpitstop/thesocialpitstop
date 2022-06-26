import React from 'react'
import CategoriesPage from "../../../../pages/categories"
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import { ThemeProvider } from 'styled-components'

test('loads and render category page', async () => {
    //Arrange
    //Act
    //Assert
    const theme = {
        colors: {
          primary: '#00539CFF',
        },
      }
    render(
        <ThemeProvider theme={theme}>
            <CategoriesPage />
        </ThemeProvider>
    )
})