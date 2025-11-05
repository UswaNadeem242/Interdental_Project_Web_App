import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";

export default function TabsStepper({ steps, newClaimBtn, selectedIndex: controlledSelectedIndex, onTabChange }) {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState(0);
  
  // Use controlled or uncontrolled state
  const selectedIndex = controlledSelectedIndex !== undefined ? controlledSelectedIndex : internalSelectedIndex;
  
  const handleTabChange = (index) => {
    if (controlledSelectedIndex === undefined) {
      setInternalSelectedIndex(index);
    }
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className="w-full">
      <div>
        <TabGroup selectedIndex={selectedIndex} onChange={handleTabChange}>
          <div className="flex flex-col md:flex-row md:items-center justify-between  gap-4">
            <TabList className={`  flex flex-wrap gap-2 mb-6`}>
              {steps.map(({ name }) => (
                <Tab
                  key={name}
                  className={({ selected }) =>
                    `rounded-full py-3 px-6 text-xs  border border-textField text-primaryText
                                        focus:outline-none transition-colors duration-200 font-poppins capitalize
                                        ${selected
                      ? "bg-[#F8F8F8] font-bold text-base  "
                      : "bg-white text-primary  font-normal"
                    }`
                  }
                >
                  {name}
                </Tab>
              ))}
            </TabList>

            {newClaimBtn}
          </div>

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
