import { useState, useEffect } from "react";

import Divider from "@/components/Divider";
import Button from "@/components/Button";
import Modal from "@/components//Modal";
import moment from "jalali-moment";

const SelectYearModal = ({
     date,
     setDate,
     onClose,
     onSubmit,
     calendarType,
}) => {
    const [years, setYears] = useState([]);
    const [year, setYear] = useState(date.year());

    useEffect(() => {
        const endYear = calendarType === "jalali" ? 1270 : 1891;
        const startYear =
            calendarType === "jalali"
                ? moment().locale("fa").year()
                : new Date().getFullYear();
        const yearsList = [];
        for (let y = startYear; y >= endYear; y--) {
            yearsList.push(y);
        }
        setYears(yearsList);
    }, []);

    const handleYearClick = (y) => {
        setYear(y);
        setDate(date.clone().year(y));
        onSubmit();
    };

    return (
        <Modal onClose={onClose}>
            <div className="flex cursor-pointer items-center justify-center gap-2 p-4 text-sm font-medium text-neutral-900">
                <div>انتخاب سال</div>
            </div>
            <Divider dash={false} />
            <div className="flex w-full flex-col items-center justify-center p-2">
                <div className="grid max-h-[275px] w-full grid-cols-3 gap-2 overflow-y-auto px-2 text-center text-sm font-normal text-neutral-900">
                    {years.map((item, index) => (
                        <div
                            key={index}
                            className={`col-span-1 flex h-[60px] cursor-pointer items-center justify-center ${year === item && "rounded-lg bg-[#1f6be0] text-white"}`}
                            onClick={() => handleYearClick(item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </div>
            <Divider dash={false} />
            <div className="grid w-full grid-cols-2 gap-8 p-4">
                <div className="col-span-1 flex items-center justify-center rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-900">
                    {date.format("YYYY/MM/DD")}
                </div>
                <div className="col-span-1">
                    <Button title="تایید" btnAction={onSubmit} />
                </div>
            </div>
        </Modal>
    );
};

export default SelectYearModal;
