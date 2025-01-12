import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";

const FilterPage = ({ onFilterChange }) => {
    const filterData = [
        {
            filterType: "Location",
            array: ["Delhi", "Ahmedabad", "Bangalore", "Indore", "Mumbai"],
        },

        {
            filterType: "Salary",
            array: ["0-10 LPA", "10-20 LPA", "20-30 LPA", "30+ LPA"],
        },
    ];

    const [selectedFilters, setSelectedFilters] = useState({});
    console.log(selectedFilters);

    const changeHandler = (filterType, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterType]: value,
        }));
    };

    useEffect(() => {
        onFilterChange(selectedFilters);
    }, [selectedFilters, onFilterChange]);
    const resetFilters = () => {
        setSelectedFilters({});
    };
    return (
        <div>
            <h1 className="text-lg font-semibold hover:underline cursor-pointer">
                Filters
            </h1>
            {filterData.map((item, index) => (
                <div key={index}>
                    <h2 className="font-semibold p-1">{item.filterType}</h2>
                    {item.array.map((option, idx) => (
                        <div key={idx} className="flex gap-2">
                            <input
                                type="radio"
                                id={`${item.filterType}-${option}`}
                                name={item.filterType}
                                value={option}
                                onChange={(e) =>
                                    changeHandler(item.filterType, e.target.value)
                                }
                                checked={selectedFilters[item.filterType] === option}
                            />
                            <label htmlFor={`${item.filterType}-${option}`}>
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
            <div
                className="flex justify-center mt-4"
            >

                <Button
                    onClick={resetFilters}>
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default FilterPage;
