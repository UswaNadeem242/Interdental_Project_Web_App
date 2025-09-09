import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { categories } from '../../Constant'


export default function TabsStepper({ tabPanel }) {
    return (
        <div className="h-screen  px-4">
            <div className="">
                {/* w-full max-w-md */}
                <TabGroup>
                    <TabList className="flex gap-4">

                        {categories.map(({ name }) => (
                            <Tab
                                key={name}
                                className={({ selected }) =>
                                    `rounded-full py-4 px-6 text-xs font-semibold border border-textField
       focus:outline-none transition-colors duration-200 font-poppins 
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
                    <TabPanels className="mt-3">
                        {categories.map(({ name, posts }) => (
                            <TabPanel key={name} className="rounded-xl  p-3">
                                <ul>
                                    {tabPanel}
                                    {/* {posts.map((post) => (
                                        <li key={post.id} className="relative rounded-md p-3 text-sm/6 transition hover:bg-black/5">
                                            <a href="#" className="font-semibold text-black">
                                                <span className="absolute inset-0" />
                                                {post.title}
                                            </a>
                                            <ul className="flex gap-2 text-black/50" aria-hidden="true">
                                                <li>{post.date}</li>
                                                <li aria-hidden="true">&middot;</li>
                                                <li>{post.commentCount} comments</li>
                                                <li aria-hidden="true">&middot;</li>
                                                <li>{post.shareCount} shares</li>
                                            </ul>
                                        </li>
                                    ))} */}
                                </ul>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    )
}