import * as React from "react";
import { Button } from "@/Components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export function SchoolSelect({ schools, onValueChange }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedSchool, setSelectedSchool] = React.useState("");

  // Filter schools based on the search term
  const filteredSchools = schools.filter((school) =>
    school.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value) => {
    setSelectedSchool(value); // Update local state
    onValueChange(value); // Trigger the external callback
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[280px] justify-start">
          {selectedSchool ? (
            <span>{selectedSchool}</span>
          ) : (
            <span>Select School</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search schools..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>No schools found.</CommandEmpty>
            <CommandGroup>
              {filteredSchools.map((school) => (
                <CommandItem key={school} onSelect={() => handleSelect(school)}>
                  <span>{school}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
