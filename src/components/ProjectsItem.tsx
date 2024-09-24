import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { FetchImageBlockProject } from "@/apis/projectHomePage";

interface ProjectItemProps {
  // images?: { alt: string; src: string };
  images: any[]; // Adjusted images prop to be an object
  // image: any[];
  title: string;
  Preamble: string;
  description: string;
  more: string;
  isHighlighted?: boolean;
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  Preamble,
  description,
  images,
  more,
  isHighlighted,
}) => {
  const [ImageProject, setImageProject] = useState<any[]>([]);

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
    <div
      className={`flex flex-col tablet:flex-row ${
        isHighlighted ? "bg-[#F3FFF8]" : "bg-[#F4F7FF]"
      } tablet:h-[280px] h-max`}
    >
      <div
        className={`w-full tablet:w-4/12 min-w-[312px] tablet:h-[280px] h-full max-w-600 max-h-600 ${
          isHighlighted && "hidden"
        }`}
      >
        {images && (
          <Image
            alt={"image1"}
            src={ImageProject[0]}
            width={400}
            height={400}
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div
        className={`flex flex-col justify-evenly tablet:py-0 py-6 px-6 ${
          isHighlighted ? "w-full" : "w-full tablet:w-8/12"
        }`}
      >
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold text-[#28A645] text-[16px] leading-[24px]">
            {title}
          </h4>
          <h4 className="font-semibold text-[#374151] max-w-[394px] text-[18px] leading-[24px]">
            {Preamble}
          </h4>
        </div>

        <span className="w-full tablet:mt-0 mt-10 laptop:max-w-[394px] text-[#9CA3AF] leading-[25.6px] line-clamp-3 laptop:line-clamp-2">
          {description}
        </span>
        <Button
          type="link"
          icon={<ArrowRightOutlined />}
          iconPosition={"end"}
          className="!w-[max-content] px-0 mt-4 tablet:mt-0 text-[#3B559E] font-medium"
        >
          {more}
        </Button>
      </div>
    </div>
  );
};

export default ProjectItem;
