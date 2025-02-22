import React, { useState } from "react";

interface DropdownProps {
  options: { [key: string]: number };
  selectedValue: string;
  handleSelect: (value: string) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  handleSelect,
}) => {
  const [openOptions, setOpenOptions] = React.useState<boolean>(false);
  const [selectedOption, setSelectedOption] =
    React.useState<string>(selectedValue);

  const showOptions = () => {
    setOpenOptions(!openOptions);
  };

  const handleSelectOption = (option: string) => {
    showOptions();
    setSelectedOption(option);
    handleSelect(option);
  };

  return (
    <div>
      <button
        id="dropdownDefaultButton"
        onClick={showOptions}
        className="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        type="button"
      >
        {selectedOption}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {openOptions && (
        <div
          id="dropdown"
          className="border z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44"
        >
          <ul
            className="py-2 text-sm text-black"
            aria-labelledby="dropdownDefaultButton"
          >
            {Object.keys(options).map((option: string) => (
              <li
                onClick={() => handleSelectOption(option)}
                className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${
                  selectedOption === option ? "bg-blue-100" : ""
                }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
