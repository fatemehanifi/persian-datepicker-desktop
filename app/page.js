"use client"
import { useState } from "react";
import moment from "jalali-moment";

import DesktopDatepicker from "@/components/Datepicker/DesktopDatepicker";

export default function Home() {
  const [date, setDate] = useState(moment().locale("fa"));

  return (
    <div
        id="modal-root"
        className="w-1/4 h-svh p-4"
    >
      <DesktopDatepicker
          disabled={false}
          title={"تاریخ"}
          date={date}
          setDate={setDate}
          calendarType={"jalali"}
      />
    </div>
  );
}
