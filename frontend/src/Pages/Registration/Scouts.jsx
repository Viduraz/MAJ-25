import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { ScoutDatePicker } from "./Components/ScoutDatePicker";
import { Label } from "@/Components/ui/label";

import { Button } from "@/Components/ui/Button";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function Scouts({
  scoutCount,
  scouts,
  handleScoutCountChange,
  handleScoutChange,
  onNext,
  onPrevious,
}) {
  const validatePhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/; // Adjust regex as needed for your phone number format
    return regex.test(number);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return regex.test(email);
  };

  const validateFullName = (name) => {
    return name.trim() !== ""; // Ensure full name is not empty
  };

  // ... existing code ...
  const handleNext = () => {
    const minDate = new Date(2006, 1, 1); // February 1, 2006 (months are 0-indexed)

    for (let index = 0; index < scoutCount; index++) {
      const scout = scouts[index];

      // Check for empty fields
      if (!validateFullName(scout.fullName)) {
        toast.error(`Scout ${index + 1}: Full name cannot be empty.`);
        return; // Prevent going to the next page
      }
      if (!validateEmail(scout.email)) {
        toast.error(`Scout ${index + 1}: Invalid email address.`);
        return; // Prevent going to the next page
      }
      if (!validatePhoneNumber(scout.phoneNumber)) {
        toast.error(
          `Scout ${
            index + 1
          }: Invalid phone number. Please enter a 10-digit number.`
        );
        return; // Prevent going to the next page
      }
      if (!scout.gender) {
        // Check if gender is empty
        toast.error(`Scout ${index + 1}: Gender cannot be empty.`);
        return; // Prevent going to the next page
      }
      if (!scout.dateOfBirth) {
        // Check if date of birth is empty
        toast.error(`Scout ${index + 1}: Date of birth cannot be empty.`);
        return; // Prevent going to the next page
      }
      if (new Date(scout.dateOfBirth) < minDate) {
        // Check if date of birth is earlier than February 1, 2006
        toast.error(
          `Scout ${
            index + 1
          }: Date of birth cannot be earlier than February 1, 2006.`
        );
        return; // Prevent going to the next page
      }
    }
    onNext(); // Proceed to the next page if all validations pass
  };

  const scoutPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => prev - 1);

  const paginatedScouts = scouts?.slice(
    (currentPage - 1) * scoutPerPage,
    currentPage * scoutPerPage
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-gray-800 bg-opacity-50">
      <div className="w-full max-w-lg p-8 my-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-extrabold text-center">
          Register Your Scouts
        </h2>

        <div className="mb-6">
          <label
            htmlFor="scoutCount"
            className="block text-xl font-semibold text-gray-800"
          >
            How many Scouts participated?
          </label>
          <Input
            type="number"
            id="scoutCount"
            value={scoutCount}
            onChange={handleScoutCountChange}
            className=""
          />
        </div>

        <div className="mb-6 overflow-y-auto scrollbar-hide max-h-[25rem]">
          {scoutCount > 0 && paginatedScouts?.length > 0 ? (
            paginatedScouts?.map((scout, localIndex) => {
              const globalIndex = (currentPage - 1) * scoutPerPage + localIndex;

              return (
                <div
                  key={globalIndex}
                  className="flex flex-col gap-2.5 p-5 mb-6 border rounded-lg bg-gray-50"
                >
                  <h2 className="mb-3 text-xl font-semibold">
                    Scout {globalIndex + 1}
                  </h2>
                  <div className="flex flex-col gap-2 ">
                    <Label>Full Name</Label>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={scout.fullName}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleScoutChange(globalIndex, "fullName", value);
                      }}
                      onBlur={() => {
                        if (!validateFullName(scout.fullName)) {
                          toast.error("Full name cannot be empty."); // Use toast for error message
                        }
                      }}
                      className={` ${
                        validateFullName(scout.fullName) ? "" : "border-red-500"
                      } `}
                    />
                  </div>
                  <div className="flex justify-between gap-2 ">
                    <div className="flex flex-col gap-2 ">
                      <Label>Gender</Label>
                      <Select
                        onValueChange={(value) =>
                          handleScoutChange(globalIndex, "gender", value)
                        }
                      >
                        <SelectTrigger className=" w-[200px]">
                          <SelectValue
                            defaultValue={"Male"}
                            placeholder="Select Gender"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup label="Gender">
                            <SelectItem key={1} value="Male">
                              Male
                            </SelectItem>
                            <SelectItem key={2} value="Female">
                              Female
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-col gap-2 ">
                      <Label>Phone Number</Label>
                      <Input
                        type="text"
                        placeholder="Phone Number"
                        value={scout.phoneNumber}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^\d{0,10}$/.test(value)) {
                            handleScoutChange(
                              globalIndex,
                              "phoneNumber",
                              value
                            );
                          }
                        }}
                        onBlur={() => {
                          if (!validatePhoneNumber(scout.phoneNumber)) {
                            toast.error(
                              "Invalid phone number. Please enter a 10-digit number."
                            );
                          }
                        }}
                        maxLength={10}
                        className={` ${
                          validatePhoneNumber(scout.phoneNumber) ||
                          scout.phoneNumber === ""
                            ? ""
                            : "border-red-500"
                        } `}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="Email"
                      value={scout.email}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleScoutChange(globalIndex, "email", value);
                      }}
                      onBlur={() => {
                        if (!validateEmail(scout.email)) {
                          toast.error(
                            "Invalid email address. Please enter a valid email."
                          ); // Use toast for error message
                        }
                      }}
                      className={` ${
                        validateEmail(scout.email) || scout.email === ""
                          ? ""
                          : "border-red-500"
                      } `}
                    />
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <Label> Date of birth </Label>
                    <ScoutDatePicker
                      date={scout.dateOfBirth}
                      handleDateChange={(date) =>
                        handleScoutChange(globalIndex, "dateOfBirth", date)
                      }
                    />
                  </div>
                  <ul className="pl-1 text-xs text-gray-600 list-disc list-inside ">
                    <li>
                      You can register only scouts born after February 1, 2006.
                    </li>
                    <li>
                      Scouts over 18 years old must show their ID on the camp
                      day.
                    </li>
                  </ul>
                </div>
              );
            })
          ) : (
            <p className="p-5 text-center text-gray-500">
              No Scouts available.
            </p>
          )}
        </div>
        {scoutCount > 0 && (
          <div className="flex justify-between w-full px-2 mt-1 ">
            <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
              <ArrowBigLeft className="w-6 h-6" />
            </Button>
            <p className="text-lg font-semibold ">
              {currentPage} of {Math.ceil(scouts.length / scoutPerPage)}
            </p>
            <Button
              disabled={currentPage === Math.ceil(scouts.length / scoutPerPage)}
              onClick={handleNextPage}
            >
              <ArrowBigRight className="w-6 h-6" />
            </Button>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <Button
            onClick={onPrevious}
            className="bg-gray-400 hover:bg-gray-500"
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            className="bg-green-600 hover:bg-green-700"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
