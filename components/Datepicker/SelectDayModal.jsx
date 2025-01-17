import { useState } from "react";
import Image from "next/image";

import Divider from "@/components/Divider";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

const SelectDayModal = ({
    date,
    setDate,
    onClose,
    selectMonth,
    calendarType,
}) => {
    const [selectedDate, setSelectedDate] = useState(date);

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

    const getWeeksInMonth = (date) => {
        let startOfMonth = date.clone().startOf("month");
        let endOfMonth = date.clone().endOf("month");

        let daysInMonth = endOfMonth.date();
        let weeks = [];
        let currentWeek = [];
        let currentDate = startOfMonth.clone();

        if (currentDate.day() !== 6) {
            let prevMonthDays = currentDate
                .clone()
                .subtract(
                    calendarType === "jalali" ? currentDate.day() + 1 : currentDate.day(),
                    "days",
                );
            for (
                let i = 0;
                calendarType === "jalali"
                    ? i <= currentDate.day()
                    : i < currentDate.day();
                i++
            ) {
                currentWeek.push({
                    day: prevMonthDays.date(),
                    currentMonth: false,
                });
                prevMonthDays.add(1, "day");
            }
        }

        for (let day = 1; day <= daysInMonth; day++) {
            currentWeek.push({
                day: currentDate.date(),
                currentMonth: true,
            });
            if (currentWeek.length === 7) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
            currentDate.add(1, "day");
        }

        if (currentWeek.length > 0) {
            let nextMonthDays = currentDate.clone();
            while (currentWeek.length < 7) {
                currentWeek.push({
                    day: nextMonthDays.date(),
                    currentMonth: false,
                });
                nextMonthDays.add(1, "day");
            }
            weeks.push(currentWeek);
        }

        return weeks;
    };

    const handlePrevMonth = () => {
        setDate((prevDate) => prevDate.clone().subtract(1, "month"));
    };

    const handleNextMonth = () => {
        setDate((prevDate) => prevDate.clone().add(1, "month"));
    };

    const handleDayClick = (day, currentMonth) => {
        if (currentMonth) {
            setSelectedDate(date.clone().date(day));
            setDate(date.clone().date(day));
            onClose();
        }
    };

    const monthNames =
        calendarType === "jalali" ? persianMonthNames : gregorianMonthNames;

    return (
        <Modal onClose={onClose}>
            <div className="flex w-full items-center justify-between p-4">
                <div
                    className="flex cursor-pointer items-center justify-center rounded-lg border border-neutral-200 p-2"
                    onClick={handlePrevMonth}
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
                    className="flex cursor-pointer items-center justify-between gap-2 text-base font-medium text-neutral-900"
                    onClick={selectMonth}
                >
                    <div>
                        {monthNames[date.month()]} {date.year()}
                    </div>
                    <Image
                        src="/icons/chevron-down-neutral.svg"
                        alt="chevron-down"
                        width={12}
                        height={12}
                        className="h-3 w-3"
                    />
                </div>
                <div
                    className="flex cursor-pointer items-center justify-center rounded-lg border border-neutral-200 p-2"
                    onClick={handleNextMonth}
                >
                    <Image
                        src="/icons/chevron-right-black.svg"
                        alt="chevron"
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px] rotate-180"
                    />
                </div>
            </div>
            <Divider dash={false} />
            <div className="flex w-full flex-col items-center justify-center p-4">
                <div className="grid w-full grid-cols-7 gap-2 text-center text-xs font-medium text-neutral-500">
                    {calendarType === "jalali"
                        ? ["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day, idx) => (
                            <div
                                key={idx}
                                className="col-span-1 flex h-10 items-center justify-center"
                            >
                                {day}
                            </div>
                        ))
                        : ["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                            <div
                                key={idx}
                                className="col-span-1 flex h-10 items-center justify-center"
                            >
                                {day}
                            </div>
                        ))}
                </div>
                {getWeeksInMonth(date).map((week, index) => (
                    <div
                        key={index}
                        className="grid w-full grid-cols-7 gap-2 text-center text-base font-normal text-neutral-900"
                    >
                        {week.map((dayObj, dayIndex) => (
                            <div
                                key={dayIndex}
                                className={`col-span-1 flex h-10 items-center justify-center 
                                                ${dayObj.currentMonth ? "cursor-pointer" : "cursor-not-allowed text-neutral-200"} 
                                                ${selectedDate && dayObj.currentMonth && selectedDate.date() === dayObj.day ? "rounded-lg bg-[#1f6be0] text-white" : ""}
                                            `}
                                onClick={() => handleDayClick(dayObj.day, dayObj.currentMonth)}
                            >
                                {dayObj.day}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Divider dash={false} />
            <div className="grid w-full grid-cols-2 gap-8 p-4">
                <div className="col-span-1 flex items-center justify-center rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900">
                    {date.format("YYYY/MM/DD")}
                </div>
                <div className="col-span-1">
                    <Button title="تایید" btnAction={onClose} />
                </div>
            </div>
        </Modal>
    );
};

export default SelectDayModal;
