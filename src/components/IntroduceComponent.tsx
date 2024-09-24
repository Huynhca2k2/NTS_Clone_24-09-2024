import React from "react";
import Image from "next/image";

interface Props {
  title?: string;
  subtitle: string;
  description: string;
}

const IntroduceComponent = (props: Props) => {
  const { title, subtitle, description } = props;
  return (
    <div className="flex-col justify-start items-center gap-6 flex py-[40px] desktop:py-[80px]">
      {subtitle && (
        <h5 className="text-[#28A645] text-[16px] desktop:text-[20px] font-medium uppercase">
          {subtitle}
        </h5>
      )}
      <h1 className="text-black mobile:text-[28px] tablet:text-[40px] desktop:text-[54px] font-bold  capitalize leading-normal text-center">
        {title}
      </h1>
      <p className="text-gray-500 text-xl font-medium mobile:text-[16px] tablet:text-[20px] leading-normal desktop:px-[120px] text-center">
        {description}
      </p>
    </div>
  );
};

export default IntroduceComponent;
