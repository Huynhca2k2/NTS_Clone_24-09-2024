import React, { useState } from "react";
import { Menu } from "antd";
import { NavbarModel } from "@/models/navbarModel";
import type { MenuProps } from "antd";
import CustomDownOutline from "./CustomDownOutline";
import CustomUpOutline from "./CustomUpOutline";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

const { SubMenu } = Menu;

type MenuItem = Required<MenuProps>["items"][number];

interface HeaderTabletProps {
  itemsNav: NavbarModel[];
  setIsNavHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderTablet: React.FC<HeaderTabletProps> = ({
  itemsNav,
  setIsNavHidden,
}) => {
  const [stateOpenKeys, setStateOpenKeys] = useState<string[]>([]);

  // Xử lý dữ liệu cho menu
  const processedItemsNav = itemsNav.map((item) => {
    const updatedUrls =
      item.urls?.map((url, index) => ({
        ...url,
        articles: url.articles?.length
          ? [
              {
                key: `${url.key}-0`,
                title: "Đến trang " + url.title,
                slug: url.slug,
              },
              ...url.articles.map((subUrl, subIndex) => ({
                ...subUrl,
                key: `${url.key}-${subIndex + 1}`,
              })),
            ]
          : [],
      })) ?? [];

    return {
      label: item.label || "",
      key: item.key,
      icon: item.icon,
      hoverIcon: item.hoverIcon,
      title: item.title,
      link: item.link,
      introducts: item.introducts,
      urls:
        item.urls && item.key !== "1"
          ? [
              {
                key: `${item.key}-0`, // Suffix để đảm bảo duy nhất
                title: "Đến trang " + item.label,
                slug: item.link,
              },
              ...updatedUrls,
            ]
          : updatedUrls.length > 0
          ? updatedUrls
          : undefined,
    };
  });

  const transformToMenuItems = (
    items: NavbarModel[],
    openKeys: string[]
  ): MenuItem[] => {
    return items.map((item) => ({
      key: item.key,
      label:
        item.urls && item.urls.length > 0 ? (
          <div className="flex flex-row items-center justify-between h-[48px]">
            <div className="text-black text-lg font-semibold">{item.label}</div>
            {openKeys.includes(item.key) ? (
              <CustomUpOutline width={16} height={16} fill="#1d1d1d" />
            ) : (
              <CustomDownOutline width={16} height={16} fill="#1d1d1d" />
            )}
          </div>
        ) : (
          <Link
            onClick={() => setIsNavHidden(true)}
            href={`${item.link || "#"}`}
            className="flex flex-row items-center justify-between h-[48px]"
          >
            <div className="text-black text-lg font-semibold">{item.label}</div>
          </Link>
        ),
      children: item.urls?.map((url, index) => {
        // In ra giá trị của url.key để kiểm tra
        // console.log("URL Key new:", url.key);

        return {
          key: url.key,
          label: url.articles?.length ? (
            <div
              className={`flex flex-row items-center justify-between text-base ${
                index === 0 ? "!text-[#3B559E]" : "!text-[#000000e0]"
              } h-[40px]`}
            >
              <div>{url.title}</div>
              {openKeys.includes(url.key.toString()) ? (
                <MinusOutlined />
              ) : (
                <PlusOutlined />
              )}
            </div>
          ) : (
            <Link
              onClick={() => setIsNavHidden(true)}
              href={url.slug || "/"}
              className={`flex flex-row items-center justify-between text-base ${
                index === 0 ? "!text-[#3B559E]" : "!text-[#000000e0]"
              } h-[40px]`}
            >
              <div>{url.title}</div>
            </Link>
          ),
          children: url.articles?.map((subUrl, subIndex) => ({
            key: subUrl.key,
            label: (
              <Link
                onClick={() => setIsNavHidden(true)}
                href={subUrl.slug || "/"}
                className={`text-base font-normal leading-relaxed ${
                  subIndex === 0 ? "!text-[#3B559E]" : "!text-gray-500"
                }`}
              >
                {subUrl.title}
              </Link>
            ),
          })),
        };
      }),
    }));
  };

  interface LevelKeysProps {
    key?: string;
    children?: LevelKeysProps[];
  }

  const getLevelKeys = (items1: LevelKeysProps[]) => {
    const key: Record<string, number> = {};
    const func = (items2: LevelKeysProps[], level = 1) => {
      items2.forEach((item) => {
        if (item.key) {
          key[item.key] = level;
        }
        if (item.children) {
          func(item.children, level + 1);
        }
      });
    };
    func(items1);
    return key;
  };

  const items = transformToMenuItems(processedItemsNav, stateOpenKeys);
  const levelKeys = getLevelKeys(items as LevelKeysProps[]);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // Mở
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys

          .filter((_, index) => index !== repeatIndex)

          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // Đóng
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      className="flex flex-col gap-2"
      mode="inline"
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      items={items}
      expandIcon={() => null}
    />
  );
};

export default HeaderTablet;
