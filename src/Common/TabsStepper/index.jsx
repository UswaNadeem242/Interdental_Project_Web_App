import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState } from 'react';
export default function TabsStepper({ steps }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <div className="w-full">
            <div>
                <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                    <TabList className={`  flex flex-wrap gap-4 mb-8`}>
                        {steps.map(({ name }) => (
                            <Tab
                                key={name}
                                className={({ selected }) =>
                                    `rounded-full md:py-3 py-2 px-6 text-xs font-semibold border border-textField
                                        focus:outline-none transition-colors duration-200 font-poppins capitalize 
                                        ${selected
                                        ? "bg-gray-100 text-primary font-bold "
                                        : "bg-white text-primary  font-normal"
                                    }`
                                }
                            >
                                {name}
                            </Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {steps.map((step, idx) => (
                            <TabPanel key={idx}>
                                {step.content}
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
            </div>
        </div >
    )
}