import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Stepper({ steps, className, selectedColor }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  console.log(role, "[ROLE]");

  useEffect(() => {
    if (role) {
      setSelectedIndex(
        steps.findIndex(
          (step) => step.name?.toLowerCase() === role?.toLowerCase()
        )
      );
    }
  }, [role, steps]);

  return (
    <div className="px-2 sm:px-4 w-full">
      <div>
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabList
            className={`flex border border-black/10 rounded-lg ${className}`}
          >
            {steps.map(({ name }) => (
              <Tab
                key={name}
                className={({ selected }) =>
                  `rounded-xl py-4 px-6 my-2 mx-2 text-xs border w-1/2 border-textField
   focus:outline-none transition-colors duration-200 font-poppins capitalize 
   ${
     selected
       ? `text-primary font-bold ${selectedColor}`
       : "text-primary font-normal text-[#949494]"
   }`
                }
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {steps.map((step, idx) => (
              <TabPanel key={idx}>{step.content}</TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
