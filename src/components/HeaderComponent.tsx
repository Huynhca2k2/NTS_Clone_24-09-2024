"use client";

import { NavbarModel, Url } from "@/models/navbarModel";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import ChildrenHeaderComponent from "./ChildrenHeaderComponent";
import { redirect, usePathname, useRouter } from "../routing";
import Image from "next/image";
import Link from "next/link";
import type { MenuProps } from "antd";
import "../styles/globals.css";
import { useCookies } from "react-cookie";
import { Button, Dropdown } from "antd";

import LanguageOutLine from "./LanguageOutLine";
import CustomDownOutline from "./CustomDownOutline";
import CustomUpnOutline from "./CustomUpOutline";
import IconLanguage from "./IconLanguage";
import IconCloseTab from "./IconCloseTab";
import IconMenuAlt from "./IconMenuAlt";
import HeaderTablet from "./HeaderTablet";
import { apiService } from "@/services/api.service";
import { get } from "http";
import { useTranslations } from "next-intl";

const HeaderComponent: React.FC = () => {
  const t = useTranslations("navbar");
  const tTitle = useTranslations("titles");
  const tLang = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(["NEXT_LOCALE"]);
  const [logo, setLogo] = useState("/images/logo.png");
  const [language, setLanguage] = useState("vi");
  const [hoveredItem, setHoveredItem] = useState<string | null>("");
  const [isNavHidden, setIsNavHidden] = useState(true);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [isLgScreen, setIsLgScreen] = useState(false);

  const [itemsNav, setItemsNav] = useState<NavbarModel[]>([
    {
      label: t("aboutUs"),
      key: "09x",
      icon: <CustomDownOutline fill="#3b559e" />,
      hoverIcon: <CustomUpnOutline />,
      title: tTitle("aboutUsTitle"),
      link: "/ve-chung-toi",
      urls: [
        {
          key: "88",
          title: "Góc chuyên gia",
          slug: "/goc-chuyen-gia",
        },
        {
          key: "99",
          title: "Công ty thành viên",
          slug: "/cong-ty-thanh-vien",
        },
      ],
    },
    {
      label: t("products"),
      link: "/san-pham",
      key: "29x",
      icon: <CustomDownOutline fill="#3b559e" />,
      hoverIcon: <CustomUpnOutline />,
      title: tTitle("productsTitle"),
      urls: [],
    },
    {
      label: t("services"),
      link: "/dich-vu",
      key: "39x",
      icon: <CustomDownOutline fill="#3b559e" />,
      hoverIcon: <CustomUpnOutline />,
      title: tTitle("servicesTitle"),
      urls: [],
    },
    {
      label: t("projects"),
      link: "/du-an",
      key: "49x",
      icon: <CustomDownOutline fill="#3b559e" />,
      hoverIcon: <CustomUpnOutline />,
      title: tTitle("projectsTitle"),
      urls: [],
    },
    {
      label: t("partners"),
      link: "/doi-tac",
      key: "59x",
      introducts: {
        background: "/images/Rectangle_4767.png",
        alt: "doitac",
        title: t("partners"),
        subtitle: "Hợp tác chiến lược",
        description: tTitle("partnersTitle"),
      },
    },
    {
      label: t("news"),
      key: "69x",
      link: "/tin-tuc",
    },
    {
      label: t("regulations"),
      link: "/thong-tu-nghi-dinh",
      key: "79x",
      icon: <CustomDownOutline fill="#3b559e" />,
      hoverIcon: <CustomUpnOutline />,
      title: tTitle("regulationsTitle"),
      urls: [],
    },
  ]);

  useEffect(() => {
    getVeChungToi("trang-goc-chuyen-gia");
    getVeChungToi("cong-ty-thanh-vien");
    getVeChungToi("doi-tac");
    getAboutUs();
  }, []);

  const searchData = {
    populate: ["intro"].toString(),
  };
  const searchParams = new URLSearchParams(searchData).toString();
  //  const aboutUs: any = await apiService.get(`/api/about-us?${searchParams}`);

  const getVeChungToi = async (type: string) => {
    const response: any = await apiService.get(`/api/${type}?${searchParams}`);

    console.log("ve-chung-toi", response.data.attributes.intro.description);
  };

  const getAboutUs = async () => {
    const response: any = await apiService.get(`/api/about-us?${searchParams}`);
    console.log("about-us", response.data.attributes.description);
  };

  useEffect(() => {
    const fetchData = async (
      type: string,
      index: number,
      limitCategory: number,
      limiArticle: number
    ) => {
      try {
        const response = await apiService.get<{ data: Url[] }>(
          `/api/custom-category?type=${type}&limitCategory=${limitCategory}&limitArticle=${limiArticle}`
        );

        setItemsNav((prevData) => {
          const newData: NavbarModel[] = [...prevData];
          newData[index].urls = response.data;
          // console.log(newData);
          return newData;
        });
      } catch (error) {
        console.error(`Error fetching data for ${type}:`, error);
      }
    };

    //đứng ở vị trí 1 trong mảng itemsnav và lấy 3 danh mục 3 bài viết
    fetchData("san-pham", 1, 3, 3);
    fetchData("dich-vu", 2, 6, 0);
    fetchData("du-an", 3, 3, 3);
    fetchData("thong-tu-nghi-dinh", 6, 6, 0);
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div onClick={() => handleLanguageChange("vi")}>Tiếng Việt</div>,
    },
    {
      key: "2",
      label: <div onClick={() => handleLanguageChange("en")}>English</div>,
    },
  ];

  useEffect(() => {
    setLanguage(cookies.NEXT_LOCALE);
    const handleResize = () => {
      const width = window.innerWidth;

      setIsLgScreen(width >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = (key: string) => {
    setHoveredItem(key);
  };

  const handleMouseLeave = () => {
    setHoveredItem("");
  };

  const handleLanguageChange = (lang: string) => {
    let newPath = "";
    if (lang === "en") {
      newPath = `/en${pathname}`;
      setCookie("NEXT_LOCALE", "en");
    } else if (lang === "vi") {
      newPath = `/vi${pathname}`;
      setCookie("NEXT_LOCALE", "vi");
    }
    window.location.href = newPath;
  };

  const toggleNav = () => {
    setIsNavHidden(!isNavHidden);
    setHoveredItem(null);
  };

  const handleItemClick = (key: string) => {
    setActiveItem((prev) => (prev === key ? null : key));
  };
  useEffect(() => {
    isLgScreen && setIsNavHidden(true);
  }, [isLgScreen]);

  return (
    <div>
      <header className="w-full z-50 fixed bg-white">
        <div className="px-4">
          <div className="flex p-4 laptop:max-w-[1024px] desktop:max-w-[1440px] lg:mx-auto  laptop:justify-center justify-between items-center border-b-1  laptop:h-[100px] h-[78px] ">
            <Link href={"/"}>
              <Image
                width={300}
                height={200}
                src={logo || "/images/logo.png"}
                alt="logo"
                className="laptop:w-[68px] laptop:h-auto w-[60px] h-[40px] object-cover"
              />
            </Link>
            <nav
              className={`${
                isNavHidden
                  ? "hidden"
                  : "flex flex-col absolute top-[79px] left-0 bg-[#ffff] w-full h-screen overflow-y-auto "
              } lg:flex lg:flex-row lg:w-full`}
            >
              <div className="lg:hidden flex items-center flex-row justify-between mx-4 py-2 h">
                <p className="font-semibold text-[18px] leading-4 text-[#637381] my-8">
                  {tLang("language")}
                </p>
                <div className="flex flex-row h-max justify-center items-center gap-4">
                  <div
                    className={`flex flex-row gap-2 items-center cursor-pointer px-4 py-1 rounded-[4px] ${
                      language === "vi" ? "bg-[#e1e8ff]" : "bg-white"
                    }`}
                    onClick={() => handleLanguageChange("vi")}
                  >
                    <div className="font-semibold">VI</div>
                    <div className="!text-[20px] ">
                      <IconLanguage />
                    </div>
                  </div>
                  <div
                    className={`flex flex-row gap-2 items-center cursor-pointer px-4 py-1  rounded-[4px] ${
                      language === "vi" ? "bg-white" : "bg-[#e1e8ff]"
                    }`}
                    onClick={() => handleLanguageChange("en")}
                  >
                    <div className="font-semibold">EN</div>
                    <div className="!text-[20px] ">
                      <IconLanguage />
                    </div>
                  </div>
                </div>
              </div>
              {/* day la phan cua header childernt tablet */}
              <ul className="list-none flex flex-col gap-[24px] lg:hidden justify-around w-full">
                <HeaderTablet
                  itemsNav={itemsNav}
                  setIsNavHidden={setIsNavHidden}
                />
              </ul>

              {/* phan header cua laptop */}
              <ul className="list-none hidden lg:flex flex-col lg:flex-row desktop:gap-[24px] lg:justify-around w-full ">
                {itemsNav.map((item) => {
                  // console.log("day la link ", item.link);
                  return (
                    <li
                      key={item.key}
                      className="relative cursor-pointer group flex flex-col items-center lg:items-center h-[100px] justify-center desktop:px-6"
                      onMouseEnter={() => handleMouseEnter(item.key)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleItemClick(item.key)}
                    >
                      <div className="flex items-center justify-between w-full lg:w-max gap-2">
                        <Link
                          href={item.link ? `/${language}${item.link}` : "#"}
                          className="lg:text-[#3b559e] text-[#000] !font-medium leading-6 lg:group-hover:text-[#28A645] hidden lg:block"
                        >
                          {item.label}
                        </Link>
                        {item.urls !== undefined && (
                          <p className="text-[#000] font-normal leading-6 lg:hidden mb-2">
                            {item.label}
                          </p>
                        )}
                        {item.urls === undefined && (
                          <Link
                            href={item.link ? `/${language}${item.link}` : "#"}
                            className="text-[#000] font-normal leading-6 lg:hidden mb-2"
                            onClick={toggleNav}
                          >
                            {item.label}
                          </Link>
                        )}

                        <div className="lg:text-[#3b559e] w-3 h-3 text-[#000] text-xs group-hover:hidden">
                          {item.icon}
                        </div>
                        <div className="lg:text-[#3b559e] w-3 h-3 text-xs hidden group-hover:block lg:group-hover:text-[#28A645]">
                          {item.hoverIcon}
                        </div>
                      </div>
                      {activeItem === item.key && (
                        <div className="lg:hidden w-full h-full ">
                          {
                            <Link
                              onClick={toggleNav}
                              className="text-[#3b559e] text-[14px] line-clamp-1 mx-2 mb-2"
                              href={
                                item.link ? `/${language}${item.link}` : "#"
                              }
                            >
                              {`Đi đến trang ${item.label}`}123
                            </Link>
                          }
                          <ChildrenHeaderComponent
                            key={item.key}
                            lable={item.label}
                            title={item.title}
                            urls={item.urls}
                            language={language}
                            slug={item.link}
                            onclick={toggleNav}
                          />
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <Dropdown menu={{ items }} placement="topRight">
              <div className="lg:flex flex-row gap-2 items-center cursor-pointer hidden">
                <div className="!text-[#3b559e] text-[16px]">
                  {language.toLocaleUpperCase()}
                </div>
                <div className="!text-[20px] ">
                  <IconLanguage />
                </div>
              </div>
            </Dropdown>

            <button onClick={toggleNav} className="lg:hidden">
              {isNavHidden ? <IconMenuAlt /> : <IconCloseTab />}
            </button>
          </div>
        </div>

        {/* day la phan cua header childrent laptop */}
        <div className="border-b-[1px] border-[#DFE4EA] shadow-sm ">
          {itemsNav.map(
            (item) =>
              item.icon &&
              hoveredItem === item.key &&
              isNavHidden && (
                <div
                  key={item.key}
                  className="absolute z-10 lg:top-[100px] left-0 w-full bg-white shadow-[10px] lg:border-t-[1px] lg:border-[#28A645]  "
                  onMouseEnter={() => handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-[38px] px-[95px] ">
                    <ChildrenHeaderComponent
                      key={item.key}
                      lable={item.label}
                      title={item.title}
                      urls={item.urls}
                      slug={item.link}
                      language={language}
                    />
                  </div>
                </div>
              )
          )}
        </div>
      </header>
      <div
        className={`fixed w-full h-full z-40 top-0 left-0 bg-[#000] bg-opacity-30 ${
          (!hoveredItem || hoveredItem === "5" || hoveredItem === "6") &&
          "hidden"
        }`}
      ></div>
    </div>
  );
};

export default HeaderComponent;
