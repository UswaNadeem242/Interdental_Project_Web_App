import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { useState } from 'react';
export default function Stepper({ steps }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
        <div className="px-2 sm:px-4 w-full">
            <div>
                <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                    <TabList className="flex md:w-1/3 border border-black/10 rounded-lg  ">
                        {steps.map(({ name }) => (
                            <Tab
                                key={name}
                                className={({ selected }) =>
                                    `rounded-xl py-4 px-6 my-2 mx-2 text-xs font-normal border w-1/2 border-textField
                                        focus:outline-none transition-colors duration-200 font-poppins capitalize 
                                        ${selected
                                        ? "bg-white text-primary font-bold "
                                        : " text-primary  font-normal text-[#949494]"
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