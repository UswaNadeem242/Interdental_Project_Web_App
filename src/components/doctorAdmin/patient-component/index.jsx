import { useEffect, useState } from "react";
import { getDoctorPatients } from "../../../api/doctorDasboard";


export function PatientDropdown({ className }) {
    const [patientsList, setPatientsList] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patients, setPatients] = useState([]);
    const [open, setOpen] = useState(false);
    const transformPatientsData = (apiData) => {
        if (!apiData || !Array.isArray(apiData)) return [];

        return apiData.map((order) => ({
            name: `${order?.firstName || "-"} ${order?.lastName || "-"}`,
            email: order?.email,
            linkName: "View Detail",
            status: order?.status,
            phone: order?.phoneNumber,
            address: order?.address || "abc....",
        }));
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await getDoctorPatients();

                if (response.status === 200) {
                    setPatientsList(transformPatientsData(response.data.data));
                }
                console.log('response: patient , ', response);

            } catch (error) {
                console.log(error);
            }
        };

        fetchPatients();
    }, []);

    const handleChange = (e) => {
        const selectedId = e.target.value;
        const patient = patientsList.find((p) => p.id === selectedId);
        setSelectedPatient(patient || null);
    };

    console.log('patientsList:', patientsList);
    const handleSelect = (patient) => {
        setSelectedPatient(patient);

    };
    return (
        <>
         


            <div className="relative w-full">
                {/* Dropdown button */}
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="flex w-full items-center justify-between border rounded p-2 bg-white shadow-sm"
                >
                    {selectedPatient ? (
                        <span className="flex items-center gap-2">
                            {selectedPatient.avatar && (
                                <img
                                    src={selectedPatient.avatar}
                                    alt={`${selectedPatient.name} `}
                                    className="w-6 h-6 rounded-full object-cover"
                                />
                            )}
                            <span>
                                {selectedPatient.name}
                            </span>
                        </span>
                    ) : (
                        <span className="text-gray-400">Select Patient</span>
                    )}
                    <span className="text-gray-500">▼</span>
                </button>

                {/* Dropdown list */}
                {open && (
                    <div className="absolute z-20 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-lg max-h-60 overflow-y-auto">
                        {patientsList.map((p, idx) => {
                            const active = selectedPatient?.id === p.id;
                            const isLast = idx === patientsList.length - 1;
                            return (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => handleSelect(p)}
                                    className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors 
                  ${active ? "bg-indigo-50" : "hover:bg-gray-50"} 
                  ${!isLast ? "border-b border-gray-200" : ""}`}
                                >
                                    {p.avatar && (
                                        <img
                                            src={p.avatar}
                                            alt={`${p.firstName} ${p.lastName}`}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    )}
                                    <span className="text-[#001D58] font-medium">
                                        {p.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                )}   
            </div>
        </>
    );
}

