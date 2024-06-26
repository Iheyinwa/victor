import React from "react";
import { styled } from "styled-components";
import mainAuthBg from "../../Assets/Images/sign_up.png";
import authGradient from "../../Assets/Images/sign_up_gradient.png";
import { WhiteLogo } from "../../Assets/Svgs";
import { devices } from "../../Utils/mediaQueryBreakPoints";

const AuthLayout = ({ children }) => {
  return (
    <Container>
      <LeftSection>
        <BgImage src={mainAuthBg} />
        <AuthBgGradient src={authGradient} />
        <AuthWhiteLogo />
        <LeftTextWrapper>
          <LeftTitle>Infinite beauty awaits</LeftTitle>
          <LeftSubtitle>
            Building the best and more efficient product for businesses
          </LeftSubtitle>
        </LeftTextWrapper>
      </LeftSection>
      
      <RightSection>
        <ContentWrapper>{children}</ContentWrapper>
      </RightSection>
    </Container>
  );
};

export default AuthLayout;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  @media ${devices.mobileL} {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 47%;
  padding: 64px 80px;
  overflow: hidden;

  @media ${devices.mobileL} {
    width: 100%;
    height: 400px;
    align-items: center;
    padding: 55px 70px;
  }
`;

const AuthWhiteLogo = styled(WhiteLogo)`
  width: 162px;
  height: 32px;

  @media ${devices.mobileL} {
    width: 121px;
    height: 24px;
  }
`;

const AuthBgGradient = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
`;

const BgImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;

  @media ${devices.mobileL} {
    top: -15px;
  }
`;

const LeftTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1;

  @media ${devices.mobileL} {
    display: none;
  }
`;

const LeftTitle = styled.h2`
  font-size: 52px;
  font-weight: 500;
  line-height: 62px;
  letter-spacing: 0em;
  text-align: left;
  color: #fefefe;
`;

const LeftSubtitle = styled.p`
  font-family: Barlow;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: left;
  color: #fefefe;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 53%;
  background: #fff;

  @media ${devices.mobileL} {
    position: absolute;
    top: 192px;
    left: 0;
    width: 100%;
    padding: 40px 24px 50px;
  }
`;

const ContentWrapper = styled.div`
  width: 80%;
  max-width: 579px;

  @media ${devices.mobileL} {
    width: 100%;
  }
`;
