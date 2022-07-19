import React from 'react';
// import CategoriesPage from "../../../../pages/categories";
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import ProfileID from '../../../../pages/profile/[id]';
import { MockedProvider } from '@apollo/client/testing';

jest.mock('next/router', () => ({
    useRouter() {
      return ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn()
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null)
      });
    },
  }));

  jest.mock('@auth0/nextjs-auth0', () => ({
    useUser() {
      return ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn()
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null)
      });
    },
  }));
  

test('loads and render profile page', async () => {
    //Arrange
    //Act
    //Assert

    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn()
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null)
    }));

    const theme = {
        colors: {
          primary: '#00539CFF',
        },
      }
    render(
        <MockedProvider>
            <ThemeProvider theme={theme}>
                <ProfileID />
            </ThemeProvider>
        </MockedProvider>
    )
})