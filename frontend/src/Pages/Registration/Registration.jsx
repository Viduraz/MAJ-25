import React, { useState } from "react";
import Scouts from "./Scouts";
import PaymentReceipt from "./PaymentReceipt";
import { toast } from "react-hot-toast";
import { Label } from "@/Components/ui/label";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/Components/ui/button";
import { SchoolSelect } from "./Components/ScoolSelect";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

export default function Registration() {
  const schools = [
    "Giri/Dammaloka Vidyalaya",
    "Giri/Kalundawa Saranankara Maha Vidyalaya",
    "Giri/Mayurapada K.V.",
    "Giri/Mayurapada N.S.",
    "Giri/Ruggassagara Kanishta Vidyalaya",
    "Giri/Wennoruwa Vijayaba M.V.",
    "Ibbagamuwa Central College",
    "Kuli/Assedduma Subarathi Vidyalaya",
    "Kuli/Bibiladeniya M.M.V.",
    "Kuli/Ethungahakotuwa M.C.C.",
    "Kuli/Holy Angels Girl's College",
    "Kuli/Kanadulla M.V.",
    "Kuli/Magulagama Maha Vidyalaya",
    "Kuli/Moragane Maha Vidyalaya",
    "Kuli/Saranath N.S.",
    "Ku/Athugalpura Prince College",
    "Ku/Athugalpura Vidyadeepa College",
    "Ku/Boyagane Maha Vidyalaya",
    "Ku/D.B. Welagedara M.V.",
    "Ku/D.P. Wickramasinghe College",
    "Ku/D.S. Senanayaka National School",
    "Ku/Gallehera Maha Vidyalaya",
    "Ku/Humbuluwa Central College",
    "Ku/Lakdas De Mel College",
    "Ku/Mahinda Vidyalaya",
    "Ku/Maliyadeva Adarsha College",
    "Ku/Maliyadeva College",
    "Ku/Rambadagalla Central College",
    "Ku/Royal International School",
    "Ku/Shantha Bernadet Maha Vidyalaya",
    "Ku/Sir John Kothalawala College",
    "Ku/St.Anne's College",
    "Ku/Wellawa Central College",
    "Nika/Isipathana Central College",
    "Nika/Jayanthi Vidyalaya",
    "Nika/Kebellewa Maha Vidyalaya",
    "Nika/Mahasen National School",
    "Nika/Rajabima College",
    "Nika/Sangabodhi Central College",
    "Nika/Sri Dheerananda M.V.",
    "Nika/Sri Sarananda Maha Vidyalaya",
    "Nika/Thumbulla Maha Vidyalaya",
    "Nika/Wari/Sri Sumangala Central College",
    "Nika/Wari/Sri Sunanda Maha Vidyalaya",
    "Ku/Sussex College",
    "Ku/Vishvoda College",
    "W/Giri/Boyawalana Maha Vidyalaya",
    "W/Giri/Gemunu Central College",
    "W/Giri/Pannala National School",
    "W/Giri/Rathanalankara Maha Vidyalaya",
    "W/Giri/Sri Rahula Central College",
    "W/Giri/Wayamba President College",
    "W/Giri/Welpalla Sri Sangarathana M.V.",
    "W/IB/Weera Colonel Niyomal Palipana College",
    "Wayamba International School",
    "Wayamba Royal College",
    "NW/M/Giri Sole Maha Vidyalaya",
  ];

  const [step, setStep] = useState(1);
  const [leaderCount, setLeaderCount] = useState(0);
  const [leaders, setLeaders] = useState([
    { fullName: "", idNumber: "", gender: "", phoneNumber: "", email: "" },
  ]);
  const [scoutCount, setScoutCount] = useState(0);
  const [scouts, setScouts] = useState([
    { fullName: "", gender: "", phoneNumber: "", email: "" },
  ]);
  const [school, setSchool] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [receiptImage, setReceiptImage] = useState("");
  const [leaderErrors, setLeaderErrors] = useState([]);
  const [touchedFields, setTouchedFields] = useState([]);

  const handleLeaderCountChange = (e) => {
    const count = parseInt(e.target.value);
    setLeaderCount(count);
    setLeaders(
      Array.from({ length: count }, () => ({
        fullName: "",
        idNumber: "",
        gender: "",
        phoneNumber: "",
        email: "",
      }))
    );
  };

  const handleScoutCountChange = (e) => {
    const count = parseInt(e.target.value);
    setScoutCount(count);
    setScouts(
      Array.from({ length: count }, () => ({
        fullName: "",
        gender: "",
        phoneNumber: "",
        email: "",
      }))
    );
  };

  const validateLeader = (leader) => {
    const errors = [];
    if (!leader.fullName) errors.push("Full Name is required.");
    if (!leader.idNumber) errors.push("ID Number is required.");
    else if (leader.idNumber.length > 12 || !/^[V0-9]*$/.test(leader.idNumber))
      errors.push(
        "ID Number must be a maximum of 12 characters and can include 'V'."
      );
    if (!leader.phoneNumber) errors.push("Phone Number is required.");
    else if (
      leader.phoneNumber.length !== 10 ||
      !/^\d{10}$/.test(leader.phoneNumber)
    )
      errors.push("Phone Number must be exactly 10 digits.");
    if (!leader.gender) errors.push("Gender is required.");
    if (!leader.email) errors.push("Email is required.");
    else if (!/\S+@\S+\.\S+/.test(leader.email))
      errors.push("Email is invalid.");
    return errors;
  };

  const handleLeaderChange = (index, field, value) => {
    const updatedLeaders = [...leaders];
    updatedLeaders[index][field] = value;

    // Mark the field as touched
    const updatedTouchedFields = [...touchedFields];
    if (!updatedTouchedFields[index]) {
      updatedTouchedFields[index] = {};
    }
    updatedTouchedFields[index][field] = true;

    const errors = validateLeader(updatedLeaders[index]);

    // Only show errors for touched fields
    const filteredErrors = errors.filter((error) => {
      if (error.includes("Full Name") && updatedTouchedFields[index]?.fullName)
        return true;
      if (error.includes("ID Number") && updatedTouchedFields[index]?.idNumber)
        return true;
      if (
        error.includes("Phone Number") &&
        updatedTouchedFields[index]?.phoneNumber
      )
        return true;
      if (error.includes("Gender") && updatedTouchedFields[index]?.gender)
        return true;
      if (error.includes("Email") && updatedTouchedFields[index]?.email)
        return true;
      return false;
    });

    const updatedErrors = [...leaderErrors];
    updatedErrors[index] = filteredErrors;

    setTouchedFields(updatedTouchedFields);
    setLeaderErrors(updatedErrors);
    setLeaders(updatedLeaders);
  };

  const handleScoutChange = (index, field, value) => {
    const updatedScouts = [...scouts];
    updatedScouts[index][field] = value;
    setScouts(updatedScouts);
  };

  const handleNextStep = () => {
    // Validate all leaders and school before proceeding to the next step
    const allErrors = leaders.map((leader) => validateLeader(leader));
    const hasErrors = allErrors.some((errors) => errors.length > 0);

    // Check if school is selected
    const schoolError = !school ? ["School is required."] : [];
    if (schoolError.length > 0) {
      toast.error(schoolError[0]); // Show toast for school error
    }

    if (hasErrors || schoolError.length > 0) {
      // If there are errors, show toast notifications for each error
      allErrors.forEach((errors, index) => {
        if (errors.length > 0) {
          errors.forEach((error) => {
            toast.error(`Leader ${index + 1}: ${error}`);
          });
        }
      });
    } else {
      // Proceed to the next step if no errors
      setStep(2);
    }
  };

  const leadersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => prev - 1);

  const paginatedLeaders = leaders.slice(
    (currentPage - 1) * leadersPerPage,
    currentPage * leadersPerPage
  );

  return (
    <>
      <h1 className="mb-6 text-4xl font-extrabold text-center text-green-600">
        MAJ-25 Registration
      </h1>

      {step === 1 && (
        <div className="max-w-2xl p-8 mx-auto mb-4 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-3xl font-extrabold text-center">
            Register Your Adult Scout Leaders
          </h2>
          <div className="flex flex-col mb-2 ">
            <label className="block text-lg font-semibold text-gray-800">
              Select Your School
            </label>

            <SchoolSelect
              schools={schools}
              onValueChange={(value) => setSchool(value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="leaderCount"
              className="block text-lg font-semibold text-gray-800"
            >
              How many adult leaders participated?
            </label>
            <Input
              type="number"
              id="leaderCount"
              value={leaderCount}
              onChange={handleLeaderCountChange}
              className=""
            />
          </div>
          <div className=" max-h-[28rem] overflow-y-auto scrollbar-hide">
            <div className="w-full gap-2 px-2 mb-2 ">
              <p className="text-xl font-semibold text-center ">Leader List</p>
            </div>
            {paginatedLeaders.length > 0 ? (
              paginatedLeaders.map((leader, localIndex) => {
                const globalIndex =
                  (currentPage - 1) * leadersPerPage + localIndex;

                return (
                  <div
                    key={globalIndex}
                    className="flex flex-col w-full gap-2.5 p-5 mb-6 border rounded-lg bg-gray-50"
                  >
                    <h2 className="mb-3 text-lg font-medium">
                      Leader {globalIndex + 1}
                    </h2>

                    {/* Full Name Input */}
                    <InputField
                      type="text"
                      label={"Full Name"}
                      placeholder="Full Name"
                      value={leader.fullName}
                      onChange={(value) =>
                        handleLeaderChange(globalIndex, "fullName", value)
                      }
                      error={leaderErrors[globalIndex]?.find((error) =>
                        error.includes("Full Name")
                      )}
                    />

                    <div className="flex items-center justify-between w-full gap-3">
                      {/* ID Number Input */}
                      <InputField
                        type="text"
                        label={"ID Number"}
                        placeholder="ID Number"
                        value={leader.idNumber}
                        onChange={(value) =>
                          handleLeaderChange(
                            globalIndex,
                            "idNumber",
                            value
                              .toUpperCase()
                              .replace(/[^V0-9]/g, "")
                              .slice(0, 12)
                          )
                        }
                        maxLength={12}
                        error={leaderErrors[globalIndex]?.find((error) =>
                          error.includes("ID Number")
                        )}
                      />

                      {/* Gender Select */}
                      <div className="flex flex-col gap-2 ">
                        <Label>Gender</Label>
                        <Select
                          className="w-full"
                          onValueChange={(value) =>
                            handleLeaderChange(globalIndex, "gender", value)
                          }
                        >
                          <SelectTrigger className="w-[280px]">
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
                        {leaderErrors[globalIndex]?.find((error) =>
                          error.includes("Gender")
                        ) && (
                          <p className="text-xs text-red-500">
                            {leaderErrors[globalIndex].find((error) =>
                              error.includes("Gender")
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone Number Input */}
                    <div className="flex justify-between gap-2 ">
                      <InputField
                        type="text"
                        label={"Phone Number"}
                        placeholder="Phone Number"
                        value={leader.phoneNumber}
                        onChange={(value) =>
                          handleLeaderChange(
                            globalIndex,
                            "phoneNumber",
                            value.replace(/[^0-9]/g, "").slice(0, 10)
                          )
                        }
                        maxLength={10}
                        error={leaderErrors[globalIndex]?.find((error) =>
                          error.includes("Phone Number")
                        )}
                      />

                      {/* Email Input */}
                      <InputField
                        type="email"
                        placeholder="Email"
                        label={"Email"}
                        value={leader.email}
                        onChange={(value) =>
                          handleLeaderChange(globalIndex, "email", value)
                        }
                        error={leaderErrors[globalIndex]?.find((error) =>
                          error.includes("Email")
                        )}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="p-5 text-center text-gray-500">
                No leaders available.
              </p>
            )}
          </div>
          <div className="flex justify-between w-full px-2 mt-2 ">
            <Button disabled={currentPage === 1} onClick={handlePreviousPage}>
              <ArrowBigLeft className="w-6 h-6" />
            </Button>
            <p className="text-lg font-semibold ">
              {currentPage} of {Math.ceil(leaders.length / leadersPerPage)}
            </p>
            <Button
              disabled={
                currentPage === Math.ceil(leaders.length / leadersPerPage)
              }
              onClick={handleNextPage}
            >
              <ArrowBigRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex justify-center mt-6">
            <Button
              onClick={handleNextStep}
              className="bg-green-600 hover:bg-green-600"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <Scouts
          scoutCount={scoutCount}
          scouts={scouts}
          handleScoutCountChange={handleScoutCountChange}
          handleScoutChange={handleScoutChange}
          onNext={() => setStep(3)}
          onPrevious={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <PaymentReceipt
          school={school}
          leaders={leaders}
          scouts={scouts}
          amount={amount}
          paymentDate={paymentDate}
          receiptImage={receiptImage}
          setAmount={setAmount}
          setPaymentDate={setPaymentDate}
          setReceiptImage={setReceiptImage}
          onPrevious={() => setStep(2)}
        />
      )}
    </>
  );
}

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  maxLength,
  error,
  label,
}) => (
  <div className="flex flex-col w-full gap-2">
    {label && <Label>{label}</Label>}
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      className=""
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);
