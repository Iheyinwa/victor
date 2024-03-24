import { GButton, GTextField } from "../../../Ui_elements";

import { Link } from "react-router-dom";
import { styled } from "styled-components";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Logo,
  Twitter,
  Mail,
} from "../../../Assets/Svgs";
import { useDeviceCheck } from "../../../Hooks";
import { devices } from "../../../Utils";
export const Footer = () => {
  const {isMobile} = useDeviceCheck()
  const EndIcon = () => (
    <EndIconContainer>
      <Mail />
      <p>Subscribe</p>
    </EndIconContainer>
  );

  return (
    <Container>
      <FooterBody>
        <LogoContainer>
          <Logo />
          <p>Building the best and more efficient product for businesses</p>
        </LogoContainer>

        {isMobile && (
          <LeftWrapper>
            <h6>Stay up to date</h6>
            <p>Join over 5,000+ people in our community!</p>

            <SubscribeContainer>
              <GTextField placeholder="Enter your email" endIcon={EndIcon} />
              <SubscribeButton>
                <GButton label={"Subscribe"} />
              </SubscribeButton>
            </SubscribeContainer>
          </LeftWrapper>
        )}

        <LinksContainer>
          <BottomItems>
            <h6>Product</h6>
            <Link>Overview</Link>
            <Link>Features</Link>
            <Link>Solutions</Link>
            <Link>Tutorials</Link>
            <Link>Pricing</Link>
          </BottomItems>

          <BottomItems>
            <h6>Company</h6>
            <Link>About us</Link>
            <Link>Careers</Link>
          </BottomItems>

          <BottomItems>
            <h6>Resources</h6>
            <Link>Blog</Link>
            <Link>Newsletter</Link>
            <Link>Events</Link>
            <Link>Help centre</Link>
          </BottomItems>
        </LinksContainer>

        {!isMobile && (
          <LeftWrapper>
            <h6>Stay up to date</h6>
            <p>Join over 5,000+ people in our community!</p>

            <SubscribeContainer>
              <GTextField placeholder="Enter your email" endIcon={EndIcon} />
            </SubscribeContainer>
          </LeftWrapper>
        )}
      </FooterBody>

      <FooterBottom>
        <p>All rights reserved © 2023 Ginger Technologies, Inc. </p>

        <IconContainer>
          <Icon>
            <Instagram />
          </Icon>
          <Icon>
            <Facebook />
          </Icon>
          <Icon>
            <Twitter />
          </Icon>
          <Icon>
            <LinkedIn />
          </Icon>
        </IconContainer>
      </FooterBottom>
    </Container>
  );
};

const Container = styled.footer`
  height: auto;
  background: #f9f9f9;
`;

const Icon = styled.div`
  padding: 8px;
  background-color: var(--gray-200);
  border-radius: 6px;
  transition: all 0.5s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    background-color: gray;
  }
`;

const IconContainer = styled.aside`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media ${devices.mobileL}{
    padding: 5%;
  }
`;

const FooterBottom = styled.section`
  width: 100%;
  background-color: var(--gray-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3% 5%;

  @media ${devices.mobileL}{
    flex-direction: column;
  }
`;

const FooterBody = styled.div`
  padding: 5%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media ${devices.mobileL}{
    flex-direction: column;
    gap: 2rem;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  gap: 30%;

  @media ${devices.mobileL} {
    flex-wrap: wrap;
    justify-content: space-between;

    & > :last-child {
      margin-top: 10%;
    }
  }
`;
const BottomItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media ${devices.mobileL}{
    h6{
      font-weight: 500;
    }
  }

`;

const LeftWrapper = styled.div`
  & > h6 {
    margin-bottom: 8px;
  }

  @media ${devices.mobileL}{
    width: 100%;
    & > h6{
      font-size: 16px;
    }
  }
`;
// const BigLogo = styled(Logo)`
//     transform: scale(1.2);
// `

const LogoContainer = styled.div`
  p {
    margin-top: 10px;
  }
`;

const EndIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  p {
    font-size: 1rem;
    color: var(--black);
    font-weight: 500;
  }
`;

const SubscribeContainer = styled.div`
  margin-top: 2rem;

`;

const SubscribeButton = styled.div`
  margin: 5% auto;
  float: right;
  width: fit-content;
`;