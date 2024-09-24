"use client";
import React, { useEffect, useState } from "react";

import ProjectItem from "./ProjectsItem";
import { Divider } from "antd";
import { IntroDataType, ProjectType } from "./types";
import { FetchImageBlockProject } from "@/apis/projectHomePage";

interface ProjectProps {
  data: ProjectType;
  projects: any[];
  images: any[];
}
const introDataInit = {
  Premble: "Dự án",
  title: "Công Trình Đã Thực Hiện",
  description: "",
  more: "",
  images: [],
  alt: "",
  createdAt: "",
};
const Project: React.FC<ProjectProps> = ({ data, projects, images = [] }) => {
  const [ImageProject, setImageProject] = useState<any[]>([]);
  const [intro, setIntro] = useState<IntroDataType>(introDataInit);
  useEffect(() => {
    const fetchProjectImageData = async () => {
      try {
        const fetchedProjectImageData = await FetchImageBlockProject();
        setImageProject(fetchedProjectImageData);
      } catch (error) {
        console.error("Error fetching project image data:", error);
      }
    };

    fetchProjectImageData();
  }, []);
  return (
    <div className="custom-container laptop:max-w-[1024px] desktop:max-w-[1440px] mx-auto mt-[80px] tablet:mt-[200px] flex flex-col gap-10 items-center px-4">
      <div className="flex flex-col items-center">
        <h2 className="uppercase font-bold text-[#28A645] text-[20px] leading-[32px]">
          {introDataInit.Premble}
        </h2>
        <h1 className="font-semibold text-black text-[28px] tablet:text-[40px] laptop:text-[48px] tablet:leading-[76.8px]">
          {introDataInit?.title}
        </h1>
        <h4 className="text-[#637381] font-normal text-base tablet:text-[20px] leading-[32px] text-center w-full laptop:max-w-[527px]">
          {data?.description}
        </h4>
      </div>
      <div className="flex flex-row gap-6 w-full">
        <div className="w-full laptop:w-8/12 flex flex-col gap-[25px] ">
          {projects &&
            projects
              .slice(0, 2)
              .map((project, index) => (
                <ProjectItem
                  key={index}
                  images={ImageProject[1]}
                  title={project.bannerTitle}
                  Preamble={project.bannerPreamble}
                  more={project.more || "Đọc ngay"}
                  description={project.bannerDescription}
                />
              ))}
        </div>
        <div className="w-4/12 bg-[#F3FFF8] shadow-project laptop:flex flex-col h-full hidden">
          {projects &&
            projects.slice(2).map((project, index) => (
              <React.Fragment key={index}>
                <ProjectItem
                  images={project.src}
                  title={project.bannerTitle}
                  Preamble={project.bannerPreamble}
                  more={project.more || "Đọc ngay"}
                  description={project.bannerDescription}
                  isHighlighted
                />
                {index === 0 && <Divider className="bg-[#28A645] my-[12px]" />}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
