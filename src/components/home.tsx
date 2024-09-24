// "use client";

// import React, { lazy, Suspense, useEffect, useState } from "react";

// import {
//   CategoryType,
//   companyMemberType,
//   IntroDataType,
//   ProjectType,
// } from "@/components/types";

// import { FetchAboutUs, FetchImageAboutUs } from "@/apis/aboutUs";
// import { FetchCategory, FetchImageCategory } from "@/apis/category";
// import {
//   FetchButtonHomeMemberBox,
//   FetchHomeMember,
//   FetchHomeMemberBox,
//   FetchImageHomeMemberBox,
// } from "@/apis/homeMemberCompany";
// import {
//   FetchBlockProjectHomePage,
//   FetchImageBlockProject,
//   FetchProjectHomePage,
// } from "@/apis/projectHomePage";
// import { FetchSlideHome } from "@/apis/slideHomePage";
// // import AboutMe from "@/components/AboutMe";
// // import MemberCompanies from "@/components/MemberCompanies";
// // import Project from "@/components/Project";
// // import SlideHome from "@/components/SlideHome";
// // import ContactUs from "@/components/contactUs";
// const SlideHome = lazy(() => import("@/components/SlideHome"));
// const AboutMe = lazy(() => import("@/components/AboutMe"));
// const MemberCompanies = lazy(() => import("@/components/MemberCompanies"));
// const Project = lazy(() => import("@/components/Project"));
// const ContactUs = lazy(() => import("@/components/contactUs"));
// import { useTranslations } from "next-intl";

// const introDataApi = {
//   title: "Giới thiệu về chúng tôi",
//   description:
//     "Thành lập từ năm 2013, Công ty TNHH Kỹ thuật NTS định hướng trở thành nhà cung cấp hàng đầu cho các giải pháp kỹ thuật công trình. Theo đó những lĩnh vực chính mà NTS theo đuổi một cách tâm huyết ngay từ những ngày đầu là: Tư vấn cơ điện, Xử lý nước, Tái sử dụng nước; Cung cấp thiết bị sân vườn, thiết bị tưới cây; Thiết bị thu hồi nước mưa và các tiện ích khác…",
//   more: "Về chúng tôi",
//   images: [
//     { alt: "pic1", src: "/images/rectangle4768.png" },
//     { alt: "pic2", src: "/images/rectangle4769.png" },
//     { alt: "pic3", src: "/images/rectangle4770.png" },
//   ],
// };

// const categoriesApi = [
//   {
//     id: 0,
//     title: "Sản phẩm",
//     description:
//       "NTS Engineering với đội ngũ chuyên gia luôn tìm tòi các sản phẩm plastic nhằm nâng cao hiệu quả công nghệ xử lý nước thải, xử lý nước cấp.",
//     more: "Xem thêm",
//     src: "/images/20240821-140605.png",
//   },
//   {
//     id: 1,
//     title: "Dịch vụ",
//     description:
//       "NTS Engineering với đội ngũ chuyên gia luôn tìm tòi các sản phẩm plastic nhằm nâng cao hiệu quả công nghệ xử lý nước thải, xử lý nước cấp.",
//     more: "Xem thêm",
//     src: "/images/20240821-140611.png",
//   },
//   {
//     id: 2,
//     title: "Dự án cộng đồng",
//     description:
//       "Mang nước sạch cho cộng đồng được xem là nghĩa vụ và trách nhiệm của chúng tôi khi hoạt động trong lĩnh vực nước. Đây là cơ hội để chúng tôi được chia sẻ với những vùng đất, con người khó khăn.",
//     more: "Xem thêm",
//     src: "/images/20240821-140616.png",
//   },
// ];

// const companiesApi = [
//   {
//     alt: "pic1",
//     src: "/images/irritecAnniversaryLogo1.png",
//     name: "Irritec",
//     more: "Truy cập trang web",
//     desc: "Đây là mô tả ngắn về thẻ này. Đây là mô tả ngắn về thẻ này.",
//   },
//   {
//     alt: "pic2",
//     src: "/images/clearfoxLogoWeiss1.png",
//     name: "ClearFox",
//     more: "Truy cập trang web",
//     desc: "Đây là mô tả ngắn về thẻ này. Đây là mô tả ngắn về thẻ này. Đây là mô tả ngắn về thẻ này. Đây là mô tả ngắn về thẻ này.",
//   },
//   {
//     alt: "pic3",
//     src: "/images/econityLogo1.png",
//     name: "Econity",
//     more: "Truy cập trang web",
//     desc: "Đây là mô tả ngắn về thẻ này. Đây là mô tả ngắn về thẻ này.",
//   },
// ];

// const memberCompanyApi = {
//   title: "Các công ty thành viên",
//   more: "Xem thêm",
//   description:
//     "Thành lập từ năm 2013, Công ty TNHH Kỹ thuật NTS định hướng trở thành nhà cung cấp hàng đầu cho các giải pháp kỹ thuật công trình. Tất cả đều hướng đến trọng tâm là phục vụ tiện ích cho cuộc sống một cách bền vững và lâu dài.",
// };

// const projectsApi = [
//   {
//     alt: "pic1",
//     src: "/images/project1.png",
//     name: "Xử lý nước",
//     title: "Dự án xử lý nước thải tòa nhà văn phòng FPT 3 - quận 9",
//     more: "Đọc ngay",
//     desc: "Đây là mô tả ngắn gọn về dự án này. Đây là mô tả ngắn gọn về dự án này.",
//   },
//   {
//     alt: "pic2",
//     src: "/images/project2.png",
//     name: "Xử lý nước",
//     title: "Dự án xử lý nước thải tòa nhà văn phòng FPT 3 - quận 9",
//     more: "Đọc ngay",
//     desc: "Đây là mô tả ngắn gọn về dự án này. Đây là mô tả ngắn gọn về dự án này.",
//   },
//   {
//     name: "Xử lý nước",
//     title: "Dự án xử lý nước thải tòa nhà văn phòng FPT 3 - quận 9",
//     more: "Đọc ngay",
//     desc: "Đây là mô tả ngắn gọn về dự án này. Đây là mô tả ngắn gọn về dự án này.",
//   },
//   {
//     name: "Xử lý nước",
//     title: "Dự án xử lý nước thải tòa nhà văn phòng FPT 3 - quận 9",
//     more: "Đọc ngay",
//     desc: "Đây là mô tả ngắn gọn về dự án này. Đây là mô tả ngắn gọn về dự án này.",
//   },
// ];
// const project = {
//   title: "",
//   description: "",
//   more: "",
//   images: [],
// };

// const dataApi = {
//   title: "",
//   description: "",
//   Preamble: "",
// };

// const introDataInit = {
//   title: "",
//   description: "",
//   more: "",
//   images: [],
// };

// const companyMemberInit = {
//   title: "",
//   description: "",
//   more: "",
// };

// const projectInit = {
//   title: "",
//   description: "",
//   Preamble: "",
// };

// const Home: React.FC = () => {
//   const t = useTranslations("slidesApi");
//   const t1 = useTranslations("imageCompaniesApi");

//   const imageCompaniesApi = [
//     { alt: "Company 1", src: "/images/company1.png" }, // Ví dụ
//     { alt: t1("0.alt"), src: t1("0.src") },
//     { alt: "tata garden", src: "/images/tataGardenBanner1.png" },
//     { alt: "clearfox", src: "/images/clearfoxLogoWeiss1.png" },
//     { alt: "econity", src: "/images/econityLogo1.png" },
//     { alt: "irritec", src: "/images/irritecAnniversaryLogo1.png" },
//   ];
//   const [slideList, setSlideList] = useState<any[]>(slidesApi);
//   const [intro, setIntro] = useState<IntroDataType>(introDataInit);
//   // const [categorys, setCategorys] = useState<CategoryType[]>([]);
//   const [categorys, setCategorys] = useState<CategoryType[]>([introDataInit]);
//   const [memberCompany, setMemberCompany] =
//     useState<companyMemberType>(companyMemberInit);
//   const [companies, setCompanies] = useState<any[]>([]);
//   const [data, setData] = useState<ProjectType>(projectInit);
//   const [projects, setProjects] = useState<any[]>([]);
//   const [imageCompanies, setImageCompanies] = useState<string[]>([]);
//   const [imageCategory, setImageCategory] = useState<string[]>([]);
//   const [imageSlide, setImageSlide] = useState<string[]>([]);
//   const [imageHomeMemberBox, setImageHomeMemberBox] = useState<string[]>([]);
//   const [imageProject, setImageProject] = useState<string[]>([]);
//   const [buttonMemberBox, setButtonMemberBox] = useState();
//   interface Props {
//     slideList: any[];
//     intro: IntroDataType;
//     categorys: CategoryType[];
//     memberCompany: companyMemberType;
//     companies: any[];
//     data: ProjectType;
//     projects: any[];
//     imageCompanies: string[];
//     imageCategory: string[];
//     imageSlide: string[];
//     imageHomeMemberBox: string[];
//     imageProject: string[];
//     buttonMemberBox: any;
//   }
//   //sau nay se xu ly bang SSR
//   useEffect(() => {
//     setSlideList(slidesApi);

//     setIntro(introDataApi);
//     setCategorys(categoriesApi);
//     // setMemberCompany(companyMemberInit);

//     setCompanies(companiesApi);
//     setData(dataApi);

//     setProjects(projectsApi);
//   }, []);

//   useEffect(() => {
//     // Fetching intro data from the API
//     const fetchIntroData = async () => {
//       try {
//         const fetchedIntroData = await FetchAboutUs();

//         setIntro(fetchedIntroData); // Update the state with fetched data
//       } catch (error) {
//         console.error("Error fetching About Us data:", error);
//       }
//     };

//     // Call the function to fetch the data
//     fetchIntroData();
//   }, []);

//   useEffect(() => {
//     const fetchImageIntroData = async () => {
//       try {
//         const fetchedImageUrls = await FetchImageAboutUs(); // Fetch the image URLs

//         setImageCompanies(fetchedImageUrls); // Set the state with the image URLs
//       } catch (error) {
//         console.error("Error fetching About Us image data:", error);
//       }
//     };

//     fetchImageIntroData(); // Call the function to fetch the data
//   }, []);

//   useEffect(() => {
//     // Fetching intro data from the API
//     const fetchIntroDataCategory = async () => {
//       try {
//         const fetchedIntroData = await FetchCategory();

//         setCategorys(fetchedIntroData); // Update the state with fetched data
//       } catch (error) {
//         console.error("Error fetching intro data:", error);
//       }
//     };

//     // Call the function to fetch the data
//     fetchIntroDataCategory();
//   }, []); // Make sure dependencies are correct

//   useEffect(() => {
//     const fetchImageCateGory = async () => {
//       try {
//         const fetchedImageUrls = await FetchImageCategory(); // Fetch the image URLs

//         setImageCategory(fetchedImageUrls); // Set the state with the image URLs
//       } catch (error) {
//         console.error("Error fetching About Us image data:", error);
//       }
//     };

//     fetchImageCateGory(); // Call the function to fetch the data
//   }, []);
//   useEffect(() => {
//     const fetchImageSlideHome = async () => {
//       try {
//         const fetchedImageUrls = await FetchSlideHome(); // Fetch the image URLs

//         setImageSlide(fetchedImageUrls); // Set the state with the image URLs
//       } catch (error) {
//         console.error("Error fetching About Us image data:", error);
//       }
//     };

//     fetchImageSlideHome(); // Call the function to fetch the data
//   }, []);

//   useEffect(() => {
//     // Fetching intro data from the API
//     const fetchIntroData = async () => {
//       try {
//         const fetchedIntroData = await FetchHomeMember();

//         setMemberCompany(fetchedIntroData); // Update the state with fetched data
//       } catch (error) {
//         console.error("Error fetching About Us data:", error);
//       }
//     };

//     // Call the function to fetch the data
//     fetchIntroData();
//   }, []);
//   useEffect(() => {
//     const fetchProjectData = async () => {
//       try {
//         const fetchedProjectData = await FetchProjectHomePage(); // Fetch the project data
//         setData(fetchedProjectData); // Set the state with the project data
//       } catch (error) {
//         console.error("Error fetching project data:", error);
//       }
//     };

//     fetchProjectData(); // Call the function to fetch the data
//   }, []);
//   useEffect(() => {
//     const fetchProjectImageData = async () => {
//       try {
//         const fetchedProjectImageData = await FetchImageBlockProject(); // Fetch the image URLs for projects
//         setImageProject(fetchedProjectImageData); // Set the state with the image URLs for projects
//       } catch (error) {
//         console.error("Error fetching project image data:", error);
//       }
//     };

//     fetchProjectImageData(); // Call the function to fetch the data
//   }, []);
//   useEffect(() => {
//     const fetchProjectImageData = async () => {
//       try {
//         const fetchedProjectImageData = await FetchImageBlockProject(); // Fetch the image URLs for projects
//         setImageProject(fetchedProjectImageData); // Set the state with the image URLs for projects
//       } catch (error) {
//         console.error("Error fetching project image data:", error);
//       }
//     };

//     fetchProjectImageData(); // Call the function to fetch the data
//   }, []);
//   useEffect(() => {
//     const fetchButtonData = async () => {
//       try {
//         const fetchedButtonData = await FetchButtonHomeMemberBox();
//         setButtonMemberBox(fetchedButtonData);
//       } catch (error) {
//         console.error("Error fetching button data:", error);
//       }
//     };
//     fetchButtonData();
//   }, []);
//   useEffect(() => {q
//     const fetchCompaniesData = async () => {
//       try {
//         const fetchedCompaniesData = await FetchHomeMemberBox();
//         setCompanies(fetchedCompaniesData);
//       } catch (error) {
//         console.error("Error fetching companies data:", error);
//       }
//     };
//     fetchCompaniesData();
//   }, []);
//   useEffect(() => {
//     const fetchImageHomeMemberBoxData = async () => {
//       try {
//         const fetchedImageData = await FetchImageHomeMemberBox();
//         setImageHomeMemberBox(fetchedImageData);
//       } catch (error) {
//         console.error("Error fetching Home Member Box image data:", error);
//       }
//     };
//     fetchImageHomeMemberBoxData();
//   }, []);
//   // useEffect(() => {
//   //   // Function to fetch all data concurrently
//   //   const fetchAllData = async () => {
//   //     try {
//   //       // Fetch all data concurrently using Promise.all
//   //       const [
//   //         fetchedIntroData,
//   //         fetchedImageUrlsAboutUs,
//   //         fetchedCategoryData,
//   //         fetchedImageUrlsCategory,
//   //         fetchedImageUrlsSlide,
//   //         fetchedHomeMember,
//   //         fetchIntroDataHomeMemberBox,
//   //         fetchImageDataHomeMemberBox,
//   //         fetchButtonMemberBox,
//   //         fetchProjectHomePage,
//   //         fetchBlockProjectHomePage,
//   //         fetchImageBlock,
//   //       ] = await Promise.all([
//   //         FetchAboutUs(),
//   //         FetchImageAboutUs(),
//   //         FetchCategory(),
//   //         FetchImageCategory(),
//   //         FetchSlideHome(),
//   //         FetchHomeMember(),
//   //         FetchHomeMemberBox(),
//   //         FetchImageHomeMemberBox(),
//   //         FetchButtonHomeMemberBox(),
//   //         FetchProjectHomePage(),
//   //         FetchBlockProjectHomePage(),
//   //         FetchImageBlockProject(),
//   //       ]);

//   //       // Set the state for each fetched data
//   //       setIntro(fetchedIntroData);
//   //       setImageCompanies(fetchedImageUrlsAboutUs);
//   //       setCategorys(fetchedCategoryData);
//   //       setImageCategory(fetchedImageUrlsCategory);
//   //       setImageSlide(fetchedImageUrlsSlide);
//   //       setMemberCompany(fetchedHomeMember);
//   //       setCompanies(fetchIntroDataHomeMemberBox);
//   //       setImageHomeMemberBox(fetchImageDataHomeMemberBox);
//   //       setButtonMemberBox(fetchButtonMemberBox);
//   //       setData(fetchProjectHomePage);
//   //       setProjects(fetchBlockProjectHomePage);
//   //       setImageProject(fetchImageBlock);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };

//   //   // Call the function to fetch all data
//   //   fetchAllData();
//   // }, []);

//   return (
//     <main>
//       <Suspense fallback={<div>Loading...</div>}>
//         <SlideHome slides={slideList ? slideList : []} />
//         <AboutMe
//           // Pass the API data
//           imageSlide={imageSlide}
//           imageCategory={imageCategory}
//           imageCompanies={imageCompanies} // Pass the API images
//           introData={intro}
//           categorys={categorys}
//         />
//         <MemberCompanies
//           memberCompany={memberCompany}
//           companies={companies}
//           imageHomeMember={imageHomeMemberBox}
//           buttonMemberBox={buttonMemberBox}
//         />
//         <Project data={data} projects={projects} image={imageProject} />
//         <ContactUs />
//       </Suspense>
//     </main>
//   );
// };

// export default Home;

import React, { Suspense, lazy, useState } from "react";
import { useTranslations } from "next-intl";
import { Props } from "./types";

const SlideHome = lazy(() => import("@/components/SlideHome"));
const AboutMe = lazy(() => import("@/components/AboutMe"));
const MemberCompanies = lazy(() => import("@/components/MemberCompanies"));
const Project = lazy(() => import("@/components/Project"));
const ContactUs = lazy(() => import("@/components/ContactUs"));
const contact = import ("@/components/ContactUs")
const imageContact = await ("@/components/imageContact");
const phone = await ;
const Home: React.FC<Props> = ({
  //slideList,
  intro,
  categorys,
  memberCompany,
  companies,
  data,
  projects,
  imageCompanies,
  imageCategory,
  imageSlide,
  imageHomeMemberBox,
  imageProject,
  buttonMemberBox,
}) => {
  const t = useTranslations("slidesApi");
  const t1 = useTranslations("imageCompaniesApi");

  const slidesApi = [
    {
      id: 0,
      img: t("0.img"),
      title: t("0.title"),
      content: t("0.content"),
      desc: t("0.desc"),
      more: t("0.more"),
    },
    {
      id: 1,
      img: t("1.img"),
      title: t("1.title"),
      content: t("1.content"),
      desc: t("1.desc"),
      more: t("1.more"),
    },
    {
      id: 2,
      img: t("2.img"),
      title: t("2.title"),
      content: t("2.content"),
      desc: t("2.desc"),
      more: t("2.more"),
    },
  ];
  const [slideList, setSlideList] = useState<any[]>(slidesApi);
  return (
    <main>
<SlideHome slides={banner} image={imagebanner} />
      <AboutMe
        // Pass the API data
        imageSlide={imageSlide}
        //imageCategory={imageCategory}
        // imageCompanies={imageCompanies} // Pass the API images
        //introData={intro}
        categorys={categorys}
      />
      <MemberCompanies
        memberCompany={memberCompany}
        companies={companies}
        imageHomeMember={imageHomeMemberBox}
        buttonMemberBox={buttonMemberBox}
      />
      <Project data={data} projects={projects} images={imageProject} />
      <ContactUs
        contactHome={contact}
        images={imageContact}
        phoneNumber={phone}
      />
    </main>
  );
};

export default Home;
