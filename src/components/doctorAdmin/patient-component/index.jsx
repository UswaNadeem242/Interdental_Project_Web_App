import { useEffect, useRef, useState } from "react";
import { getDoctorPatients } from "../../../api/doctorDasboard";
import { ChevronDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { setSelectedPatient } from "../../../store/slices/restoration-slice";

export function PatientDropdown({ className, dropdownClass, value, onChange }) {
    const [patientsList, setPatientsList] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await getDoctorPatients();
                if (response.status === 200) {
                    const patients = response.data.data.map((order) => {
                        const firstName = order?.firstName?.trim() || "";
                        const lastName = order?.lastName?.trim() || "";
                        const fullName = [firstName, lastName].filter(Boolean).join(" ");
                        return {
                            id: order.id,
                            name: fullName || "Unknown",
                            email: order?.email || "",
                            avatar: order?.avatar || null,
                        };
                    });
                    setPatientsList(patients);
                    setFilteredPatients(patients);
                }
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        };
        fetchPatients();
    }, []);

    // close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedPatient = patientsList.find((p) => p.id === value);

    const handleSelect = (patient) => {
        onChange(patient.id); // update formik value
        setOpen(false);
        dispatch(setSelectedPatient(patient));
    };


    // Filter patients by search term
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredPatients(patientsList);
        } else {
            const term = searchTerm.toLowerCase();
            setFilteredPatients(
                patientsList.filter(
                    (p) =>
                        p.name.toLowerCase().includes(term) ||
                        (p.email && p.email.toLowerCase().includes(term))
                )
            );
        }
    }, [searchTerm, patientsList]);
    return (
        <div className={`relative w-full ${className || ""}`} ref={dropdownRef}>
            {/* Button */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex w-full items-center justify-between border rounded-md p-2 bg-white shadow-sm"
            >
                {selectedPatient ? (
                    <span className="flex items-center gap-2">
                        {selectedPatient.avatar && (
                            <img
                                src={selectedPatient.avatar}
                                alt={selectedPatient.name}
                                className="w-6 h-6 rounded-full object-cover"
                            />
                        )}
                        <span>{selectedPatient.name}</span>
                    </span>
                ) : (
                    <span className="text-gray-400">Select Patient</span>
                )}
                <ChevronDownIcon
                    className={`h-4 w-4 text-[#949494] ${dropdownClass || ""}`}
                />
            </button>

            {/* Dropdown list */}

            {open && (
                <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
                    <div className="sticky top-0 bg-background p-2 ">
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-2 top-2.5 h-4 w-4 text-secondaryText" />
                            <input type="text"
                                placeholder="Search patient..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full  bg-background   pl-8 pr-2 py-1 text-sm outline-none"
                            />
                        </div>
                    </div>
                    {filteredPatients.length > 0 ? (
                        filteredPatients.map((p, idx) => {
                            const active = selectedPatient?.id === p.id;
                            const isLast = idx === filteredPatients.length - 1;
                            const maskName = (name) => {
                                if (!name) return "Unknown";
                                return name.slice(0, 4); // only first 4 chars
                            };
                            const maskEmail = (email) => {
                                if (!email) return "";
                                const [localPart, domain] = email.split("@");
                                if (!localPart || !domain) return email;
                                return (
                                    localPart.slice(0, 3) + "*****@" + domain
                                );
                            };
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => handleSelect(p)}
                                    className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors
                    ${active ? "bg-indigo-50" : "hover:bg-gray-50"}
                    ${!isLast ? "border-b border-gray-200" : ""}`}
                                >
                                    <img
                                        src={"/assets/users.png"}
                                        alt={p.name}
                                        className="w-9 h-9 rounded-full object-cover border border-[#285772]" />

                                    <div className="flex flex-col text-left">
                                        {/* <span className="text-primaryText font-medium">{p.name}</span>
                                        <span className="text-xs text-secondaryText">{p.email}</span> */}

                                        <span className="text-primaryText font-medium">
                                            {maskName(p.name)} - {maskEmail(p.email)}
                                        </span>
                                    </div>
                                </button>
                            );
                        })
                    ) : (
                        <p className="p-3 text-sm text-gray-400">No patients found</p>
                    )}
                </div>
            )}
        </div>
    );
}
