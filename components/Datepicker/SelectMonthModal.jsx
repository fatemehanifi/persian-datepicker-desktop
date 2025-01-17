import { useState } from "react";
import Image from "next/image";

import Divider from "@/components/Divider";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

const SelectMonthModal = ({
  date,
  setDate,
  onClose,
  selectYear,
  onSubmit,
  calendarType,
}) => {
    const [month, setMonth] = useState(date.month());

    const persianMonthNames = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
    ];

    const gregorianMonthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const monthNames =
        calendarType === "jalali" ? persianMonthNames : gregorianMonthNames;

    const handlePrevYear = () => {
        setDate((prevDate) => prevDate.clone().subtract(1, "year"));
    };

    const handleNextYear = () => {
        setDate((prevDate) => prevDate.clone().add(1, "year"));
    };

    const handleMonthClick = (month) => {
        setMonth(month);
        setDate(date.clone().month(month));
        onSubmit();
    };

    return (
        <Modal onClose={onClose}>
            <div className="flex w-full items-center justify-between p-4">
                <div
                    className="flex cursor-pointer items-center justify-center rounded-6 border border-neutrall-100 p-2"
                    onClick={handlePrevYear}
                >
                    <Image
                        src="/icons/chevron-right-black.svg"
                        alt="chevron"
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                    />
                </div>
                <div
                    className="flex cursor-pointer items-center justify-between gap-2 text-base font-medium text-neutrall-900"
                    onClick={selectYear}
                >
                    <div>{date.year()}</div>
                    <Image
                        src="/icons/chevron-down-neutral.svg"
                        alt="chevron-down"
                        width={12}
                        height={12}
                        className="h-3 w-3"
                    />
                </div>
                <div
                    className="flex cursor-pointer items-center justify-center rounded-6 border border-neutrall-100 p-2"
                    onClick={handleNextYear}
                >
                    <Image
                        src="/icons/chevron-right-black.svg"
                        alt="chevron"
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                    />
                </div>
            </div>
            <Divider dash={false} />
            <div className="flex w-full flex-col items-center justify-center p-4">
                <div className="grid w-full grid-cols-3 gap-2 text-center text-base font-normal text-neutrall-900">
                    {monthNames.map((item, index) => (
                        <div
                            key={index}
                            className={`col-span-1 flex h-[60px] cursor-pointer items-center justify-center ${month === index && "rounded-10 bg-primary-500 text-white"}`}
                            onClick={() => handleMonthClick(index)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <Divider dash={false} />
            <div className="grid w-full grid-cols-2 gap-8 p-4">
                <div className="col-span-1 flex items-center justify-center rounded-6 border border-neutrall-100 px-4 py-2 text-sm font-medium text-neutrall-900">
                    {date.format("YYYY/MM/DD")}
                </div>
                <div className="col-span-1">
                    <Button title="تایید" btnAction={onSubmit} />
                </div>
            </div>
        </Modal>
    );
};

export default SelectMonthModal;
