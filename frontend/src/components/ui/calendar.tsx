"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "rounded-md border bg-background p-3",
        className
      )}
      classNames={{
        months: "space-y-4",
        month: "space-y-4",
        caption: "flex justify-between items-center px-2",
        caption_label: "text-sm font-medium",
        nav: "flex items-center justify-between space-x-1",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-75 hover:opacity-100 transition-opacity",
          "flex items-center justify-center rounded-md hover:bg-accent"
        ),
        table: "w-full border-collapse",
        head_row: "grid grid-cols-7",
        head_cell: "text-muted-foreground font-normal text-[0.8rem] text-center",
        row: "grid grid-cols-7 mt-2",
        cell: "text-center text-sm relative p-0 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        day: "h-9 w-9 p-0 font-normal hover:bg-accent hover:text-accent-foreground mx-auto",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };