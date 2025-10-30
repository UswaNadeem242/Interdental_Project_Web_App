import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { Xmark } from "../../icon/xmark";

export default function Drawers({
  isOpen = false,
  onClose = () => { },
  title,
  Content, 
  status,
}) {
  const [open, setOpen] = useState(true);

  const statusStyles = {
    PENDING: "bg-[#1F27EF0D] text-[#1F27EF]",
    ACCEPTED: "bg-[#4ECC530D] text-[#4ECC53]",
    REJECTED: "bg-[#FF57570D] text-[#FF5757]",
};
const badgeClass = statusStyles[status] || "text-gray-700 bg-gray-100";

  return (
    <div> 
      <Dialog open={isOpen} onClose={onClose} className="relative z-40">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      {/* <XMarkIcon aria-hidden="true" className="size-6" /> */}
                    </button>
                  </div>
                </TransitionChild>
                <div className="relative flex h-full flex-col overflow-y-auto bg-white rounded-tl-2xl py-6 shadow-xl">
                  <div className="px-4 sm:px-6 flex justify-between item-center">
                    <DialogTitle className="text-xl font-bold font-poppins text-[#0F153E]">
                      <div className="flex justify-between items-center gap-3">
                        {title}
                        {status && (
                          <span className={`text-xs px-2 py-1 rounded-full ${badgeClass}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)?.toLowerCase()}
                          </span>
                        )}
                      </div>
                    </DialogTitle>
                    <button onClick={onClose} className="border rounded-lg p-2">
                      <Xmark className="w-8 h-8 " />
                    </button>
                  </div>
                  <div className="relative  flex-1 px-4 sm:px-6 mt-5">
                    {Content}
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
