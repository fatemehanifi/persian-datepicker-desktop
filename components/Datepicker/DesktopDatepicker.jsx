import { useState } from "react";

import SelectDayModal from "@/components/Datepicker/SelectDayModal";
import SelectMonthModal from "@/components/Datepicker/SelectMonthModal";
import SelectYearModal from "@/components/Datepicker/SelectYearModal";

const DesktopDatepicker = ({
    title,
    date,
    setDate,
    calendarType,
    disabled,
}) => {
    const [selectDay, setSelectDay] = useState(false);
    const [selectMonth, setSelectMonth] = useState(false);
    const [selectYear, setSelectYear] = useState(false);

    return (
        <div className="flex w-full flex-col gap-2">
            <label className="text-neutral-900 block text-sm font-normal xs:font-medium">
                {title}
            </label>
            <input
                type="text"
                disabled={disabled}
                value={date.format("YYYY/MM/DD")}
                onChange={() => {}}
                onClick={() => setSelectDay(true)}
                className="w-full rounded-lg border border-neutral-200 p-4 text-neutrall-900 transition duration-300 hover:border-neutral-400 focus:outline-none disabled:border-neutral-50 disabled:bg-primary-50 disabled:text-neutrall-200 disabled:placeholder:text-neutrall-200"
            />
            {selectDay && (
                <SelectDayModal
                    date={date}
                    setDate={setDate}
                    onClose={() => setSelectDay(false)}
                    selectMonth={() => {
                        setSelectMonth(true);
                        setSelectDay(false);
                    }}
                    calendarType={calendarType}
                />
            )}
            {selectMonth && (
                <SelectMonthModal
                    date={date}
                    setDate={setDate}
                    onClose={() => setSelectMonth(false)}
                    selectYear={() => {
                        setSelectYear(true);
                        setSelectMonth(false);
                    }}
                    onSubmit={() => {
                        setSelectMonth(false);
                        setSelectDay(true);
                    }}
                    calendarType={calendarType}
                />
            )}
            {selectYear && (
                <SelectYearModal
                    date={date}
                    setDate={setDate}
                    onClose={() => setSelectYear(false)}
                    onSubmit={() => {
                        setSelectYear(false);
                        setSelectMonth(true);
                    }}
                    calendarType={calendarType}
                />
            )}
        </div>
    );
};

export default DesktopDatepicker;
