import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
export default function TabsStepper({ steps, newClaimBtn }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="w-full">
      <div>
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <TabList className={`  flex flex-wrap gap-4 mb-8`}>
              {steps.map(({ name }) => (
                <Tab
                  key={name}
                  className={({ selected }) =>
                    `rounded-full py-3 px-6 text-xs font-semibold border border-textField
                                        focus:outline-none transition-colors duration-200 font-poppins capitalize
                                        ${
                                          selected
                                            ? "bg-gray-100 text-primary font-bold "
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
