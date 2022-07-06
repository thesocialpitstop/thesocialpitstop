import Footer from './footer'
import Navbar from './navbar'
import styled from "styled-components";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-content: stretch;
`;

const PageContent = styled.div`
  flex: auto;
`;

export default function Layout({ children }) {
  return (
    <Page>
      <Navbar />
      <PageContent>
        <main>{children}</main>
      </PageContent>
      <Footer />
    </Page>
  )
}
