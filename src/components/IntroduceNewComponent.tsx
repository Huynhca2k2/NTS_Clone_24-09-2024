import React from "react";
import Image from "next/image";

interface Props {
  title: string;
  subtitle: string;
  description: string;
}

const IntroduceNewComponent = (props: Props) => {
  const { title, subtitle, description } = props;
  return (
    <div className="text-center leading-10">
      <h5 className="text-[#28A645] font-bold text-[18px] laptop:block mobile:hidden  uppercase">
        {title}
      </h5>
      <h2 className="text-[#111928] font-bold text-[40px] laptop:block mobile:hidden">
        {subtitle}
      </h2>
      <h2 className="text-[#111928] font-bold text-[24px] laptop:hidden mobile:block">
        {subtitle}
      </h2>
      <div className="laptop:flex mobile:hidden justify-center pt-5 ">
        <div className="max-w-[40%]">
          <p className="text-[#637381] leading-7">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default IntroduceNewComponent;
