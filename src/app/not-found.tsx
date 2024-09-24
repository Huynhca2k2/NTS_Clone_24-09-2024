import {
  FetchContact,
  FetchImageContact,
  FetchPhoneNumber,
} from "@/apis/contactHome";
import ContactUs from "@/components/ContactUs";
import Link from "next/link";

export default async function NotFound() {
  const contact = await FetchContact();
  const imageContact = await FetchImageContact();
  const phone = await FetchPhoneNumber();
  return (
    <div className="laptop:pt-[100px] pt-[78px]">
      <div className="flex laptop:h-[800px] mobile:h-[500px] bg-[#3B559E] mb-[80px] px-4">
        <div className="w-full h-full flex flex-col justify-center items-center gap-[35px]">
          <p className="text-center text-[#fff] text-[100px] font-bold leading-[130px]">
            404
          </p>
          <p className="text-[22px] font-[600] text-[#fff]">
            Oops! Trang này không thể tìm thấy
          </p>
          <p className="text-[16px] font-[400] text-[#fff]">
            Trang bạn đang tìm kiếm không tồn tại hoặc có thể đã bị xóa
          </p>
          <Link
            className="min-w-[187px] h-12 px-6 py-3 rounded-md border border-white justify-center items-center gap-2.5 inline-flex text-center text-white text-base font-medium leading-normal"
            href="/"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
      <ContactUs
        contactHome={contact}
        images={imageContact}
        phoneNumber={phone}
      />
    </div>
  );
}
