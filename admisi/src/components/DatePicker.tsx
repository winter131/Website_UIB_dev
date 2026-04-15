"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IndonesianDateFormat } from "@/utils/IndonesianDateFormat";

export function DatePicker({
  placeholder,
  value,
  setValue,
  className,
}: {
  placeholder: string;
  value: string;
  setValue: (unformatted: string) => void;
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={`w-full justify-between font-normal text-xs ${className}`}
          >
            {value ? IndonesianDateFormat(value) : `${placeholder}`}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            defaultMonth={value ? new Date(value) : undefined}
            mode="single"
            selected={value ? new Date(value) : undefined}
            captionLayout="dropdown"
            onSelect={(date) => {
              // setValue(date!.toISOString());
              if (date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");

                // Set explicitly to midnight in Jakarta Time
                setValue(`${year}-${month}-${day}T00:00:00.000+07:00`);
              }
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
