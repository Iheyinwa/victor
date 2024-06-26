import styled, { keyframes } from "styled-components";
import {
  GButton,
  Product,
  GTextField,
  Chip,
  GModal,
  Carousel,
  ProductSkeleton,
  Empty,
  LineLoader,
} from "../../Ui_elements";
import React, { memo, useState, useEffect, useRef } from "react";
import Vector from "../../Assets/Images/vector-background.png";
import AddPicture from "../../Assets/Images/ad-picture.png";
import {
  BecomeSellerSection,
  BlogCard,
  GuideCard,
  InstaFooter,
  SellerCard,
} from "./Components";
import Partners from "../../Assets/Images/partners.png";
import PartnersMobile from "../../Assets/Images/partners-Mobile.png";
import HeroImage from "../../Assets/Images/hero-image.png";
import HeroMobile from "../../Assets/Images/landing_mobile.png"
import {
  CircleText,
  LeftArrow,
  Mail,
  RedRightArrow,
  RightArrow,
  UpArrow,
  WhiteX,
} from "../../Assets/Svgs";
import Swiper from "swiper";
import { useNavigate } from "react-router-dom";
import { useApiGet } from "../../Hooks";
import {
  getCategories,
  getProducts,
  getProductBrands,
  getAllStores,
} from "../../Urls";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { devices } from "../../Utils";
// import InstaFooter from "./Components/instaFooter";

const Home = () => {
  const navigate = useNavigate();
  const [selectCat, setSelectCat] = useState(0);
  const [openCookie, setOpenCookie] = useState(true);
  const [categoryId, setCategoryId] = useState("");
  const [openModal, setOpenModal] = useState(true);
  const sliderRef = useRef(null);
  const user = useSelector((state) => state.user);
  const acceptCookie = Cookies.get("ginger-cookie-policy");
  const swiper = new Swiper();
  const firstCatMount = useRef(true);
  const { isMobile } = useDeviceCheck()

  const { data: products, isLoading } = useApiGet(
    ["get-featured-products"],
    () => getProducts({ isFeatured: true }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  const { data, isLoading: isLoadingStores } = useApiGet(
    ["get-all-stores"],
    () => getAllStores(),
    {
      enable: true,
    }
  );

  const {
    data: topProducts,
    isLoading: isLoadingTopProducts,
    isFetching: isFetchingTopProducts,
    refetch: fetchProducts,
  } = useApiGet(
    ["get-top-products"],
    () =>
      getProducts({
        isTopSeller: true,
        categoryId: categoryId,
      }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  const { data: productbrands, isLoading: isLoadingProductBrands } = useApiGet(
    ["product-brands"],
    () => getProductBrands(),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: categories,
    isLoading: isLoadingCategories,
    refetch: fetchCat,
  } = useApiGet(["categories"], () => getCategories(), {
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const lastFourFeaturedProducts = products?.slice(-5);

  const slideNext = () => {
    if (sliderRef.current) {
      sliderRef.current.swiper.slideNext();
    }
  };

  const slidePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.swiper.slidePrev();
    }
  };

  const filterStoresWithImages = (data) => {
    // Filter the stores that have both background and mainImage properties
    if (data) {
      const filteredStores = data.filter((store) => {
        return (
          Object.prototype.hasOwnProperty.call(store, "backgroundImage") &&
          Object.prototype.hasOwnProperty.call(store, "mainImage")
        );
      });

      return filteredStores;
    }
  };
  const filteredStores = filterStoresWithImages(data);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const EndIcon = () => (
    <EndIconContainer>
      <Mail />
      <p>Subscribe</p>
    </EndIconContainer>
  );

  return (
    <Container>
      <Hero>
        <HeroDetails>
          {isMobile ? (
            <MobileDetails>
              <p>Explore, Buy Wholesale, Sell on Ginger</p>
              <>
                <h4>Discover the {""}</h4>
                <h4>convenience of</h4>
                <h4>wholesale marketplace</h4>
              </>
            </MobileDetails>
          ) : (
            <>
              <p>Explore, Buy Wholesale, Sell on Ginger</p>
              <h3>Discover the convenience of</h3>
              <h3>wholesale marketplace</h3>
            </>
          )}

          <ButtonContainer>
            {!user && (
              <GButton
                label="Sign up for free"
                onClick={() => navigate("/login")}
              />
            )}

            <GButton
              outline
              onClick={() => navigate("/sell-on-ginger")}
              label="Sell on ginger"
            />
          </ButtonContainer>
        </HeroDetails>
        <HeroImageContainer>
          <div>
            <hr />
            <p>world of limitless beauty options</p>
          </div>
        </HeroImageContainer>
      </Hero>

      {!isMobile && (
        <HowItWorks>
          <GuideCard />
          <GuideCard />
          <GuideCard />
          <GuideCard />
        </HowItWorks>
      )}

      <Category>
        <CategoryHeader>
          <h4>Beauty procurement, simplified for you</h4>
          <div>
            <p>
              Ginger’s wide network of local and international suppliers gives
              you access to all of your must-have brands and products in one
              place.
            </p>
          </div>
        </CategoryHeader>

        <CatergoryGridContainer>
          <CatFirstBox>
            <Barber>
              <CatShopBottom>
                <h6>Barbing</h6>

                <Shopbutton onClick={() => navigate("/categories/all")}>
                  Shop Now
                </Shopbutton>
              </CatShopBottom>
            </Barber>
            <NailSkinContianer>
              <Nails>
                <CatShopBottom>
                  <h6>Nails</h6>

                  <Shopbutton onClick={() => navigate("/categories/all")}>
                    Shop Now
                  </Shopbutton>
                </CatShopBottom>
              </Nails>
              <Skin>
                <CatShopBottom>
                  <h6>Skin & Body</h6>

                  <Shopbutton onClick={() => navigate("/categories/all")}>
                    Shop Now
                  </Shopbutton>
                </CatShopBottom>
              </Skin>
            </NailSkinContianer>
          </CatFirstBox>
          <CatSecondBox>
            <CatShopBottom>
              <h6>Braids & Weaves</h6>
              <Shopbutton onClick={() => navigate("/categories/all")}>
                Shop Now
              </Shopbutton>
            </CatShopBottom>
          </CatSecondBox>
        </CatergoryGridContainer>

        <ViewAllCat>
          <GButton
            outline
            label="See all categories"
            onClick={() => navigate("/categories/all")}
          />
        </ViewAllCat>
      </Category>

      <FeatureProductsContainer>
        <h4>Featured Products</h4>
        <FeaturedItemContainer>
          {lastFourFeaturedProducts ? (
            lastFourFeaturedProducts?.map((product, index) => (
              <Product
                item={product}
                key={index}
                skeletonNumber={5}
                padding={"10%"}
              />
            ))
          ) : (
            <Empty />
          )}
        </FeaturedItemContainer>
      </FeatureProductsContainer>

      <ViewAllCat>
        <GButton
          outline
          label="Shop more"
          onClick={() => navigate("/marketplace")}
        />
      </ViewAllCat>

      <LargeAd>
        <AdContainer>
          <div>
            <img src={AddPicture} />
          </div>

          <div>
            <h4>Pain relief CBD salve oil</h4>
            <p>Place your order now and buy get a better resale value</p>
            <GButton
              label={"Shop now"}
              width={isMobile && "fit-content"}
              outline
              onClick={() => navigate("/categories/all")}
            />
          </div>
        </AdContainer>

        <CircleItem>
          <div>
            <CircleText />
          </div>
          <h5>01</h5>
        </CircleItem>
      </LargeAd>

      <BecomeSellerSection />

      <TopSellerContainer>
        <TopSellerHeader>
          <div>
            <h4>Top sellers</h4>

            <p>
              Browse more top selling products from top brands and their
              categories
            </p>
          </div>
          <div>
            <div onClick={slidePrev}>
              <LeftArrow />
            </div>
            <div onClick={slideNext}>
              <RightArrow />
            </div>
          </div>
        </TopSellerHeader>

        <ChipContainer>
          {categories?.map((item, index) => (
            <Chip
              activeIndex={selectCat}
              onClick={() => {
                setCategoryId(item?._id);
                setSelectCat(index);
              }}
              index={index}
              key={index}
            >
              {item?.name}
            </Chip>
          ))}
        </ChipContainer>

        <SellerCardsContainer>
          <Carousel
            width={400}
            data={filteredStores}
            ref={sliderRef}
            renderCard={(item) => {
              return <SellerCard item={item} />;
            }}
          />
        </SellerCardsContainer>
      </TopSellerContainer>

      <Wholesale>
        <img src={Vector} />
        <div>
          <h4>All in one wholesale portal</h4>
          <p>
            Start exploring thousands of brands and enjoy wholesale purchases
          </p>
          <div>
            {!user && (
              <GButton
                label="Get started"
                alternate
                onClick={() => navigate("/signup")}
              />
            )}
            {isMobile ? (
              <GButton
                label="Learn More"
                alternateOutline
                onClick={() => navigate("/marketplace")}
              />
            ) : (
              <GButton
                label="Shop now"
                alternate
                onClick={() => navigate("/marketplace")}
              />
            )}
          </div>
        </div>
      </Wholesale>

      <BlogPosts>
        <BlogPostHeader>
          <h4>Recent Blog Post</h4>
          <div>
            <p>Read More</p>
            <RedRightArrow />
          </div>
        </BlogPostHeader>
        <BlogBody>
          {[...Array(4)].map((_, index) => (
            <BlogCard key={index} width={isMobile ? '100%': "23.8%"} />
          ))}
        </BlogBody>
      </BlogPosts>

      <PartnerSection>
        {isMobile ? <img src={PartnersMobile} /> : <img src={Partners} />}
      </PartnerSection>

      {!isMobile && (
        <Subscribe>
          <div>
            <h4>Subscribe to get 30% discount!</h4>
            <GTextField
              endIcon={<EndIcon />}
              placeholder={"Enter your email"}
            />
          </div>
        </Subscribe>
      )}

      <InstaFooter />

      {openCookie && !acceptCookie && (
        <CookieContainer>
          <div>
            <h6>Accept all Cookies</h6>

            <p>
              This website uses cookies to optimize your experience and to
              provide us insight on how to interact with the site. All
              information shared with us through cookies are secure and covered
              by our data privacy obligations. You can access our Privacy Policy
              here
            </p>
          </div>

          <div>
            <button
              onClick={() => {
                Cookies.set("ginger-cookie-policy", true);
                setOpenCookie(false);
              }}
            >
              Accept only essential
            </button>
            <button
              onClick={() => {
                Cookies.set("ginger-cookie-policy", true);
                setOpenCookie(false);
              }}
            >
              Accept
            </button>
          </div>
        </CookieContainer>
      )}

      <GModal open={openModal} handleClose={() => setOpenModal(false)}>
        <ModalContent>
          <img src="https://images.unsplash.com/photo-1500336624523-d727130c3328?q=80&w=3200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />

          <ModalRedbanner>
            <p>Never miss out on our discounts and promos</p>
          </ModalRedbanner>

          <ModalSub>
            <b>Subscribe to get 30% discount!</b>
          </ModalSub>

          <ModalFieldContainer>
            <GTextField placeholder={"Enter your email"} />
          </ModalFieldContainer>

          <ModalButton>
            <GButton label={"Subscribe"} />
          </ModalButton>

          <ModalClose onClick={() => setOpenModal(false)}>
            <WhiteX />
          </ModalClose>
        </ModalContent>
      </GModal>

      <LineLoader
        loading={
          isLoadingTopProducts ||
          isLoadingCategories ||
          isLoadingProductBrands ||
          isLoading ||
          isFetchingTopProducts
        }
      />
    </Container>
  );
};

export default memo(Home);

const Container = styled.main`
  width: inherit;
`;

const Hero = styled.section`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  /* background-color: red; */
  width: 100%;
  padding-left: 5%;

  @media ${devices.mobileL}{
    display: block;
    position: relative;
    padding-left: 0;
  }
`;

const HeroImageContainer = styled.div`
  /* background-color: green; */
  background-image: url(${HeroImage});
  width: 100%;
  flex: 1;
  height: 46.8rem;
  position: relative;
  background-position: center;
  background-color: aquamarine;
  background-size: cover;
  background-repeat: no-repeat;

  img {
    height: 46.8rem;
    width: auto;
  }

  div {
    position: absolute;
    width: 99%;
    /* width: 500px; */
    bottom: 5%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
    
    hr{
      border: transparent
    }
    p {
      color: white;
      justify-self: flex-end;
    }
  }

  @media ${devices.mobileL} {
    background-image: url(${HeroMobile});
    padding: 0px 10px;

    div {
      width: 90%;
      padding: 4px;

      hr {
        display: block;
        width: 45%;
        border: 1px solid white;
      }
    }
  }
`;
const HeroDetails = styled.div`
  flex: 0.39;
  height: 46.87rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  gap: 13.75rem;
  position: relative;
  p {
    font-size: 18px;
    font-weight: 500;
    color: var(--gray-300);
    margin-bottom: 30px;
  }
  h3 {
    background-color: white;
    position: absolute;
    padding: 10px 20px;
    white-space: nowrap;
    font-size: 3.7rem;
    font-weight: 500;
    z-index: 1;
    left: -5%;
    /* transform: translateX(-50%); */
  }
  h3:nth-child(3) {
    top: 21.8rem;
  }
  h3:nth-child(2) {
    bottom: 25rem;
  }

  @media ${devices.mobileL}{
    position: absolute;
    padding: 10px;
    h3{
      display: none;
    }
  }
  
`;

const MobileDetails = styled.div`
  z-index: 1;
  position: absolute;
  bottom: 30%;

  h4 {
    background-color: white;
    padding: 10px;
    white-space: nowrap;
    font-size: 28px;
    width: fit-content;
    font-weight: 500;
  }
  p {
    font-size: 14px;
    font-weight: 500;
    color: white;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  width: calc(100% - 3.56rem);

  @media ${devices.mobileL} {
    z-index: 1;
    position: absolute;
    bottom: 15%;
  }
`;

const Category = styled.section`
  height: auto;
`;
const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
  padding: 5%;
  h4 {
    font-weight: 500;
    font-size: 2.5rem;
    flex: 0.3;
    width: 100%;
  }
  div {
    display: flex;
    align-items: center;
    padding-left: 2rem;
    flex: 0.7;
    height: 6.25rem;
    border-left: 1px solid var(--gray-200);

    p {
      width: 50%;
      font-size: 1.25rem;
    }
  }
  @media ${devices.mobileL} {
    flex-direction: column;
    div {
      border-left: none;
      padding-left: 0;
      flex: 1;

      p {
        width: 100%;
      }
    }
  }
`;

const CatergoryGridContainer = styled.div`
  display: flex;
  padding: 5%;
  gap: 2%;
  height: 100%;

  @media ${devices.mobileL} {
    display: block;
  }
`;

const CatFirstBox = styled.div`
  flex: 0.5;
  width: 100%;
  height: 43.75rem;

  @media ${devices.mobileL}{
    height: fit-content;
  }
`;
const CatSecondBox = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
  justify-content: flex-end;
  background-image: url("https://images.unsplash.com/photo-1572955304332-bf714bd49add?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-position: center;
  background-color: var(--hover-color);
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 0.3s ease;
  position: relative;
  height: 43.75rem;

  &:hover {
    background-size: 105%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    z-index: 1;
    transition: background-color 0.3s ease;
  }

  &:hover::after {
    background-color: rgba(
      0,
      0,
      0,
      0.3
    ); /* Make the overlay slightly darker on hover */
  }

  @media ${devices.mobileL} {
    margin-top: 6%;
  height: 17.625rem;
  background-position: top;
  }
`;

const Barber = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 20px;
  height: 50px;
  padding: 1.2rem;
  margin-bottom: 20px;
  background-color: var(--hover-color);
  height: 18.75rem;
  background-image: url("https://images.unsplash.com/photo-1567894340315-735d7c361db0?q=80&w=3044&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 0.3s ease;

  &:hover {
    background-size: 105%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    z-index: 1;
    transition: background-color 0.3s ease;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @media ${devices.mobileL} {
    height: 17.625rem;
  }
`;

const NailSkinContianer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Nails = styled.div`
  width: 100%;
  background-color: var(--hover-color);
  height: 23.75rem;
  display: flex;
  flex-direction: column;
  padding: 1.2rem;
  justify-content: flex-end;
  padding-bottom: 20px;
  background-image: url("https://images.unsplash.com/photo-1604902396830-aca29e19b067?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  &:hover {
    background-size: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    z-index: 1;
    transition: background-color 0.3s ease;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @media ${devices.mobileL} {
    height: 14.93rem;
  }
`;

const Skin = styled.div`
  width: 100%;
  flex-direction: column;
  position: relative;
  display: flex;
  padding: 1.2rem;
  /* padding-right: 2rem; */
  justify-content: flex-end;
  padding-bottom: 20px;
  background-image: url("https://images.unsplash.com/photo-1561228987-8e7379dde477?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-position: center;
  height: 23.75rem;
  background-size: cover;
  background-repeat: no-repeat;

  &:hover {
    background-size: 105%;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    z-index: 1;
    transition: background-color 0.3s ease;
  }

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.3);
  }

  @media ${devices.mobileL} {
    height: 14.93rem;
  }
`;

const CatShopBottom = styled.div`
  /* position: absolute; */
  z-index: 4;
  /* bottom: 1.2rem; */
  /* left: 1.2rem; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: red; */
  flex-wrap: wrap;
  margin: 0 auto;
  h6 {
    font-size: 2rem;
    color: white;
    font-weight: 500;
  }
`;

const Shopbutton = styled.button`
  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 10px;
  outline: none;
  cursor: pointer;
  color: white;
  font-weight: 500;
  font-weight: 500;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

const ViewAllCat = styled.div`
  width: 11.12rem;
  margin: 0 auto;
`;
const FeatureProductsContainer = styled.section`
  width: 100vw;
  padding: 5%;

  h4 {
    font-weight: 500;
    font-size: 2.5rem;
    margin-bottom: 5%;

    @media ${devices.mobileL}{
      font-size: 24px;
    }
  }
`;

const FeaturedItemContainer = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;

  overflow-x: auto;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;

const LargeAd = styled.section`
  padding: 10% 5%;
  width: 100%;
  margin-top: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${Vector});
  background-position: center;
  background-size: cover;
  position: relative;
  background-repeat: no-repeat;
`;
const AdContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: relative;
  width: 100%;
  gap:2%;
  p {
    margin-bottom: 1rem;
  }
  /* gap:2rem; */
  h4 {
    font-size: 3rem;
    font-family: "Roboto Serif";
    font-weight: 400;
  }
  > div:nth-child(1) {
    /* flex: 0.5; */
  }
  > div:nth-child(2) {
    /* flex: 0.5; */
    margin-left: -40px;
    width: 20rem;
    height: inherit;
    /* max-width: 400px; */
  }
  @media ${devices.mobileL} {
    display: block;

    > div:nth-child(1) {
      width: 100%;

      img{
        width: 100%;
      }
    }
    > div:nth-child(2){
      margin-left: 0px;
      margin-top: 30%;
    }
  }
`;
const rotateAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const CircleItem = styled.div`
  position: absolute;
  left: 45%;
  background-color: white;
  width: 16rem;
  height: 16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  /* Apply animation */
  /* Adjust duration and timing function as needed */

  div {
    position: absolute;
    left: 10%;
    top: 10%;
    transform: translate(-50%, -50%);
    animation: ${rotateAnimation} 10s linear infinite;
  }

  h5 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 6rem;
    color: var(--light-lavendar);
  }

  @media ${devices.mobileL} {
    left: 50%;
    transform: translate(-50%, 0%);
    
    h5{
      font-size: 4.5rem;
    }
  }
`;

const TopSellerContainer = styled.section`
  margin-top: 18.75rem;
  width: 100%;
`;

const TopSellerHeader = styled.div`
  margin: 0 5%;
  display: flex;
  justify-content: space-between;

  > div:nth-child(1) {
    h4 {
      font-size: 2.5rem;
      font-weight: 500;
      margin-bottom: 1.75rem;
    }
    p {
      width: 80%;
      font-size: 1.25rem;
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    align-items: center;
    gap: 10px;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: var(--gray-100);
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const ChipContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  margin-left: 5%;
  margin-top: 5%;
  overflow-x: auto;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */

  &::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }
`;

const SellerCardsContainer = styled.div`
  max-width: 100vw;
  margin-top: 5%;
  display: flex;
  margin-left: 5%;
  gap: 1.2rem;

  @media ${devices.mobileL} {
    max-width: 95vw;
    overflow-x: auto;
    -ms-overflow-style: none; 
    scrollbar-width: none; 

    &::-webkit-scrollbar {
      display: none; 
    }
  }
`; import { useDeviceCheck } from '../../Hooks/useDeviceCheck';


const Wholesale = styled.div`
  padding: 10% 5%;
  margin-top: 5%;
  position: relative;
  background-color: var(--black);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    position: absolute;
    object-fit: cover;
    opacity: 0.3;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.8rem;
    position: relative;
    z-index: 2;
    h4 {
      color: white;
      font-size: 3rem;
      font-weight: 500;
    }
    p {
      color: white;
      text-align: center;
    }
    > div {
      display: flex;
      gap: 20px;
      width: fit-content;
      width: 60%;
      margin: 0 auto;
    }
  }

  @media ${devices.mobileL}{

    > div {
      h4{
        text-align: center;
        font-size: 2.5rem;
      }
      p{
        font-size: 20px;
      }
      > div{
        flex-direction: column;
      }
    }
  }
`;

const BlogPosts = styled.section`
  margin-bottom: 10%;
`;

const BlogPostHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 0 5%;
  margin-top: 10%;
  justify-content: space-between;
  h4 {
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  div {
    display: flex;
    justify-content: center;
    cursor: pointer;
    p {
      color: var(--primary-color);
      transition: all 0.2s ease;
    }
    &:hover {
      p {
        font-weight: 600;
      }
    }
  }

  @media ${devices.mobileL}{
    h4{
      font-size: 1.4rem;
    }
  }
`;

const BlogBody = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  justify-content: flex-start;
  padding: 0 5%;

  @media ${devices.mobileL} {
    flex-wrap: nowrap;
    max-width: 95%;
    overflow-x: auto;
    -ms-overflow-style: none; 
    scrollbar-width: none; 

    &::-webkit-scrollbar {
      display: none; 
    }
  }
`;

const PartnerSection = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5% 0;
  img {
    width: 80vw;
    height: auto;
  }
`;

const Subscribe = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10% 0;
  h4 {
    font-size: 1.3rem;
    font-weight: 400;
  }
  > div {
    width: 30%;
    display: flex;
    gap: 4rem;
    flex-direction: column;
    align-items: center;
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

const CookieContainer = styled.div`
  background-color: var(--black);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 5%;
  position: sticky;
  bottom: 0;
  z-index: 10;
  left: 0;
  div:nth-child(1) {
    width: 56%;
    h6 {
      color: #fff;
      font-family: "Roboto Serif";
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1rem;
      color: white;
    }
  }

  div:nth-child(2) {
    display: flex;
    align-items: center;
    gap: 20px;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      outline: none;
      padding: 1rem 2rem;
      border-radius: 100px;
      border: none;
      min-width: 150px;
      cursor: pointer;
    }

    button:nth-child(1) {
      color: white;
      background-color: var(--black);
    }
    button:nth-child(2) {
      background-color: white;
      color: black;
    }
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    height: 18.75rem;
    width: 50vw;
    object-fit: cover;
    margin-bottom: 0;
    filter: brightness(0.8);
  }
`;
const ModalRedbanner = styled.div`
  background-color: var(--primary-color);
  margin-top: -3px;
  padding: 12px 0;
  width: 100%;
  p {
    text-align: center;
    color: white;
  }
`;
const ModalSub = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 46px;
  margin-bottom: 50px;
  b {
    font-size: 1.75rem;
    font-weight: 500;
    text-align: center;
  }
`;
const ModalFieldContainer = styled.div`
  width: 70%;
  margin-bottom: 40px;
`;

const ModalButton = styled.div`
  width: 60%;
  margin-bottom: 45px;
`;

const ModalClose = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  cursor: pointer;
`;

const HowItWorks = styled.div`
  padding: 5%;
  display: flex;
  background-color: var(--lower-nav);
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;
