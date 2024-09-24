"use server";
import { RightOutlined } from "@ant-design/icons";
import Image from "next/image";
import Link from "next/link";
import { link } from "node:fs";
import React from "react";
import NewsComponent from "./NewsComponent";
const posts = [
  {
    title: "Dự án cộng đồng gần đây",
    description:
      "Trong thiết kế cơ điện công trình, cấp thoát nước là một hạng mục quan trọng...",
    image: "/images/du-an-cong-dong-gan-day.png",
    link: "/du-an-cong-dong-2",
  },
  {
    title: "Dự án cộng đồng địa phương",
    description:
      "Trong thiết kế cơ điện công trình, cấp thoát nước là một hạng mục quan trọng...",
    image: "/images/du-an-cong-dong-dia-phuong.png",
    link: "/du-an-cong-dong-1",
  },
  {
    title: "Thu gom và sử dụng nước mưa",
    description: "Ngày nay việc sản xuất nước sạch ngày càng gặp khó khăn...",
    image: "/images/thu-gom-su-dung-nuoc-mua.png",
    link: "/thu-gom-va-xu-ly-nuoc-mua",
  },
];
const RelatedPosts: React.FC = () => {
  return (
    <div className=" bg-gray-100  w-screen h-[660px]">
      {/* Phần tiêu đề và liên kết */}
      <div className="max-w-6xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Bài Viết Liên Quan</h1>
        <Link href="#" className="text-[#3B559E] hover:underline">
          Tới trang tin tức &rarr;
        </Link>
      </div>

      {/* Phần danh sách bài viết */}
      <div className=" w-full grid grid-cols-3 md:grid-cols-3 gap-6 ">
        {posts.map((post, index) => {
          return (
            <>
              <Link href={"/du-an-cong-dong"} key={index}>
                <Image
                  src={post.image}
                  alt={post.description}
                  width={500}
                  height={500}
                  className="w-full h-48 object-cover  mt-5"
                />

                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm">{post.description}</p>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPosts;
