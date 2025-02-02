import { useState } from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../../../Components/ui/popover";
import { Button } from "../../../Components/ui/button";
import { Input } from "../../../Components/ui/input"; // Ensure you have an Input component for manual entry

export const ScoutDatePicker = ({ date, handleDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(date);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !selectedDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {selectedDate ? format(selectedDate, "PPP") : "Pick the Date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            handleDateChange(date);
          }}
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          dateFormat="MMMM d, yyyy"
          minDate={new Date("2006-02-01")} // Allow users to select a wide range of years
          maxDate={new Date()} // Prevent future dates
          customInput={<Input />} // Allow manual typing
        />
      </PopoverContent>
    </Popover>
  );
};
