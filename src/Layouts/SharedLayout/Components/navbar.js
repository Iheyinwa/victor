import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import {
  Account,
  Cart,
  Dollar,
  DownArrow,
  Like,
  Logo,
  Search,
  BlackX,
  HomeMenu,
  LogoMobile
} from "../../../Assets/Svgs";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Skeleton } from "@mui/material";
import { useApiGet, useDeviceCheck } from "../../../Hooks";
import {
  LineLoader,
  PopMenu,
  SearchOverlay,
} from "../../../Ui_elements";
import {
  getBrands,
  getCartItems,
  getCategories,
  getProducts,
} from "../../../Urls";
import {
  logout,
  setActiveIndex,
  setActiveInitialSubCateogry,
  setCategories,
  setInitialSubCateogry,
  setSelectedCategory,
} from "../../../Redux/Reducers";
import { debounce } from "lodash";
import { devices, filterSearchParams, generateQueryKey } from "../../../Utils";
import Badge from "@mui/material/Badge";

const imageLinks = [
  "https://images.unsplash.com/photo-1546877625-cb8c71916608?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1526413425697-1d271fdbe7a9?q=80&w=3328&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=3411&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const Navbar = () => {
  const [currentImage, setCurrentImage] = useState([0]);
  const [activeItem, setActiveItem] = useState(null);
  const [showFullOptions, setShowFullOptions] = useState(false);
  const [fullOptionsHovered, setFullOptionsHovered] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchFilter, setSearchFilter] = useState({
    name: "",
    brandId: "",
    categoryId: "",
    subCategoryId: "",
    rating: "",
    msrp: "",
    isFeatured: null,
    isTopSeller: null,
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  console.log(user, "user")
  const initialSubCatFromStore = useSelector(
    (state) => state.global?.initialSubCategory
  );

  const navigate = useNavigate();

  useEffect(() => {
    imageLinks.forEach((link) => {
      const image = new Image();
      image.src = link;
    });
  }, []);

  const { data: cartData, isLoading: isLoadingCart } = useApiGet(
    ["nav-cart-data"],
    () => getCartItems(user?._id),
    {
      enabled: true,
      refetchOnWindowFocus: true,
      cacheTime: 0,
    }
  );

  const { data, isLoading } = useApiGet(
    ["navbar-categories"],
    () => getCategories(),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    data && dispatch(setCategories(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const { data: brands, isLoading: isLoadingBrands } = useApiGet(
    ["navbar-brandss"],
    () => getBrands(),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  const {
    data: products,
    isLoading: isLoadingProducts,
    refetch: fetchProduct,
  } = useApiGet(
    [generateQueryKey("products", searchFilter)],
    () => getProducts(filterSearchParams(searchFilter)),
    {
      enabled: !!searchFilter,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFilter]);

  const debouncedSearchFilterUpdate = debounce((value) => {
    setSearchFilter((prev) => ({
      ...prev,
      name: value,
    }));
  }, 1500);

  const debouncedMSPRFilterUpdate = debounce((value) => {
    setSearchFilter((prev) => ({
      ...prev,
      msrp: value,
    }));
  }, 1500);

  const handleSearchFilter = (value) => {
    const searchValue = value;
    debouncedSearchFilterUpdate(searchValue.trim());
  };

  const handleMSRPFilter = (value) => {
    const searchValue = value;
    debouncedMSPRFilterUpdate(searchValue.trim());
  };

  const extractCategories = (data) => {
    if (data) {
      return data?.map(({ _id, name }) => ({ value: _id, label: name }));
    }
  };

  const extractBrands = (data) => {
    return data?.map(({ _id, name }) => ({ value: _id, label: name }));
  };

  const extractSubCategories = (data) => {
    if (data) {
      return data?.reduce((acc, category) => {
        const subCategories = category.subCategories.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }));
        return [...acc, ...subCategories];
      }, []);
    }
  };

  const categories = useMemo(() => extractCategories(data), [data]);
  const subCategories = useMemo(() => extractSubCategories(data), [data]);
  const allBrands = useMemo(() => extractBrands(brands), [brands]);
  const {isMobile} = useDeviceCheck()

  // useEffect(() => {
  //   dispatch(setSelectedCategory(null))
  //   dispatch(setInitialSubCateogry(null))
  // }, [initialSubCatFromStore])

  const handleNavLinkHover = (index) => {
    setCurrentImage(imageLinks[index]);
    setActiveItem(data[index]);
    setShowFullOptions(true);
  };

  const handleFullOptionsHover = () => {
    setShowFullOptions(true);
    setFullOptionsHovered(true);
  };

  const handleFullOptionsLeave = () => {
    setFullOptionsHovered(false);
    setShowFullOptions(false);
  };

  const handleLowerNavLeave = () => {
    if (!fullOptionsHovered) {
      setShowFullOptions(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout(null));
  };

  const menuItems = [
    {
      item: user ? "Logout" : "Login",
      action: user ? () => handleLogout() : () => navigate("/login"),
    },
  ];

  const handleScroll = (event) => {
    const container = event.target;
    const links = container.querySelectorAll("a");

    links.forEach((link) => {
      const rect = link.getBoundingClientRect();
      const isVisible = rect.left >= 0 && rect.right <= container.clientWidth;

      link.style.opacity = isVisible ? 1 : 0.5;
    });
  };

  return (
    <OuterContainer>
      {isMobile ? (
        <Container>
          <LogoContainer>
            <NavLink to={"/"}>
              <LogoMobile />
            </NavLink>
          </LogoContainer>

          <Link to={"/cart"}>
            <Flex>
              <Badge
                badgeContent={cartData?.items?.length}
                sx={{
                  "& .MuiBadge-badge": {
                    color: "white",
                    backgroundColor: "var(--primary-color)",
                  },
                }}
              >
                <Cart />
              </Badge>
            </Flex>
          </Link>
          <Search />
          <HomeMenu />
        </Container>
      ) : (
        <Container>
          <LogoContainer>
            <NavLink to={"/"}>
              <Logo />
            </NavLink>
          </LogoContainer>

          <SearchContainer>
            <input
              onFocus={() => setShowSearch(true)}
              placeholder={"What are you searching for?"}
              onChange={(value) => handleSearchFilter(value)}
            />
            <Search />
          </SearchContainer>

          <Utility>
            <>
              {user?.accessToken ? (
                <Flex onClick={() => navigate("/account")}>
                  <Avatar
                    sx={{
                      bgcolor: "var(--primary-color)",
                      width: "24px",
                      height: "24px",
                    }}
                    alt={`${user.firstName} ${user.lastName}`}
                    src="https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=3279&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />

                  <p>{user?.firstName}</p>
                </Flex>
              ) : (
                <Flex>
                  <Account />
                  <Link to={"/signup"}>Sign up</Link>
                </Flex>
              )}

              <Flex>
                <Badge
                  badgeContent={cartData?.items?.length}
                  sx={{
                    "& .MuiBadge-badge": {
                      color: "white",
                      backgroundColor: "var(--primary-color)",
                    },
                  }}
                >
                  <Cart />
                </Badge>

                <Link to={"/cart"}>Cart</Link>
              </Flex>
            </>

            <Icons>
              <Link to="/wish-list">
                <Like />
              </Link>
              <Dollar />
              <PopMenu menuItems={menuItems}>
                <DownArrow />
              </PopMenu>
            </Icons>
          </Utility>
        </Container>
      )}
      <LowerNav onMouseLeave={handleLowerNavLeave}>
        {isLoading ? (
          <SkeletonContainer>
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={30} />
          </SkeletonContainer>
        ) : (
          <LowerNavItemContainer>
            <MenuLinksContainer onScroll={handleScroll}>
              <NavLink to={"/categories/all"}>All</NavLink>
              {data?.map((category, index) => (
                <NavLink
                  key={index}
                  to={`/categories/${encodeURIComponent(
                    category?.name
                  )}?cat=${encodeURIComponent(
                    JSON.stringify(category)
                  )}&sub_cat=${encodeURIComponent(
                    JSON.stringify(category?.subCategories[0])
                  )}&activeInit=${decodeURIComponent(
                    category?.subCategories[0]?._id
                  )}&init=${category?.subCategories[0]?.name}&activeIndex=0`}
                  onMouseEnter={() => handleNavLinkHover(index)}
                >
                  {category.name}
                </NavLink>
              ))}
            </MenuLinksContainer>

            {!isMobile && (
              <Links>
                <NavLink to={"/about-us"}>About us</NavLink>
                <NavLink to={"/sell-on-ginger"}>Sell on ginger</NavLink>
              </Links>
            )}
          </LowerNavItemContainer>
        )}
      </LowerNav>

      {/* {showFullOptions && (
        <FullOptions
          onMouseEnter={handleFullOptionsHover}
          onMouseLeave={handleFullOptionsLeave}
        >
          <div>
            <div>
              {activeItem?.subCategories?.map((item, index) => {
                return (
                  <NavLink
                    onClick={() => {
                      dispatch(setSelectedCategory(activeItem));
                      dispatch(setInitialSubCateogry(item));
                      dispatch(setActiveInitialSubCateogry(item?._id))
                      console.log(item, activeItem, "Iwas cloa")
                    }}
                    key={index}
                    to={`/categories/${encodeURIComponent(activeItem?.name)}?cat=${encodeURIComponent(JSON.stringify(activeItem))}&sub_cat=${encodeURIComponent(JSON.stringify(item))}&activeInit=${decodeURIComponent(item?._id)}&init=${item?.name}`}
                    onMouseEnter={() =>
                      setCurrentImage(
                        `http://172.104.147.51/${item?.images[0]}`
                      )
                    }
                  >
                    {item?.name}
                  </NavLink>
                );
              })}
            </div>

             <div>
              second list for sub category
              <NavLink
                to="/perm"
                onMouseEnter={() => setCurrentImage(imageLinks[0])}
              >
                Perm and relaxer
              </NavLink>
              <NavLink
                to="/texturizer"
                onMouseEnter={() => setCurrentImage(imageLinks[1])}
              >
                Texturizer
              </NavLink>
              <NavLink
                to="/wig"
                onMouseEnter={() => setCurrentImage(imageLinks[2])}
              >
                Wigs and extensions
              </NavLink>
              <NavLink
                to="/wig-tools"
                onMouseEnter={() => setCurrentImage(imageLinks[1])}
              >
                Wig tools
              </NavLink> 
            </div>
          </div>

          <ImageHolder>
            <img src={currentImage} />
          </ImageHolder>
        </FullOptions>
      )} */}
      <SearchOverlay
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        data={products}
        categories={categories}
        subCategories={subCategories}
        brands={allBrands}
        setSearchFilter={setSearchFilter}
        msrpUpdate={debouncedMSPRFilterUpdate}
        handleMSRPFilter={handleMSRPFilter}
      />
      <LineLoader loading={isLoadingProducts} />
    </OuterContainer>
  );
};

const OuterContainer = styled.nav`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 50 !important;
`;
const Container = styled.div`
  width: 100%;
  padding: 0 5%;
  display: flex;
  height: 10vh;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const ImageHolder = styled.div`
  background-color: var(--primary-coor);
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-self: flex-start;
`;

const Utility = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-self: flex-end;
  float: right;
`;
// const AccountCart = styled.div`
//     display: flex;
//     align-items: center;
//     gap: 1.5rem;
// `

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    opacity: 0.85;

    a {
      color: unset;
    }
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 5vh;
  padding-left: 1.2rem;
  border-left: 1px solid var(--gray-300);
`;

const LowerNav = styled.div`
  width: 100%;
  background-color: var(--lower-nav);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.3s ease;

  > a {
    transition: all 0.3s ease;
    &:hover {
      color: var(--primary-color) !important;
      color: var(--primary-color) !important;
    }
  }
  > a.active {
    color: var(--black);
    border-bottom: 1px solid var(--primary-color) !important;
    padding-bottom: 3px !important;
  }

  @media ${devices.mobileL} {
    padding: 2rem 0;
  }
`;

const LowerNavItemContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 0 3%;
  justify-content: space-between;
`;
const LogoContainer = styled.div``;

const FullOptions = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40vh;
  gap: 5%;
  padding: 5%;
  position: absolute;
  top: 18vh;
  left: 0;
  z-index: 10;
  border: 1px solid var(--gray-200);

  img {
    width: 24rem;
    height: 15.2rem;
    border: 1px solid var(--gray-200);
    object-fit: cover;
    background-color: var(--hover-color);
  }

  > div:nth-child(1) {
    display: flex;
    width: fit-content;
    justify-content: center;
    min-width: fit-content;
    gap: 20%;
    div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 50%;
  background-color: var(--gray-100);
  border-color: var(--gray-300);
  padding: 10px 20px;
  border-radius: 100px;

  input {
    display: flex;
    width: 100%;
    align-items: center;
    align-self: stretch;
    color: #151515;
    background: transparent;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    border: none;
    outline: none;

    :-webkit-autofill {
      -webkit-text-fill-color: #151515;
      opacity: 0.5;
    }
  }

  p {
    font-size: 2rem;
    font-weight: 500;
  }
`;
const Cancel = styled(BlackX)`
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const MenuLinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 90%;
  overflow-x: auto;
  -ms-overflow-style: none;
  white-space: nowrap;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${devices.mobileL} {
    max-width: 90%;
  }
`;

const CartContainer = styled.div``;
