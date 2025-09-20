import { createSlice } from "@reduxjs/toolkit";
const fields = ["scannerType", "digitalOptions", "surgical_guide", "material", "lab", "crown", "Photogrammetry_files"];
const restorationSlice = createSlice({
    name: "restoration",
    initialState: {
        selectedTeeth: [],
        selectedTooth: [],
        toothSelections: [], // or [] depending on your chosen shape
        totalPrice: 0,
        doctorOrderItems: [],     // flattened array
        doctor: [
            { id: 1, field: "doctorName", value: "" },
            { id: 2, field: "officeReg", value: "" },
            { id: 3, field: "createDate", value: "" },
            { id: 4, field: "dueDate", value: "" },
        ],

        patient: [
            { id: 1, field: "patientFirstName", value: "" },
            { id: 2, field: "patientLastName", value: "" },
            { id: 3, field: "subscriptionId", value: "" },
        ],
        note: "",
    },
    reducers: {
        setSelectedTeeth: (state, action) => {
            const arr = Array.isArray(action.payload) ? action.payload : [];
            state.selectedTeeth = arr;
            state.selectedTooth = arr.length ? arr[arr.length - 1] : null;
        },
        selectTooth: (state, action) => {
            const id = action.payload;
            if (!id) return;

            // toggle id in array
            if (state.selectedTeeth.includes(id)) {
                state.selectedTeeth = state.selectedTeeth.filter(t => t !== id);
            } else {
                state.selectedTeeth.push(id);
            }

            // last selected tooth
            state.selectedTooth = state.selectedTeeth.length
                ? state.selectedTeeth[state.selectedTeeth.length - 1]
                : null;
        },
        updateToothSelection: (state, action) => {
            const { toothId, field, value, price = 0, option = null } = action.payload;
            if (!toothId) return;

            // Find or create the tooth object
            let tooth = state.toothSelections.find(t => t.toothId === toothId);
            if (!tooth) {
                tooth = { toothId };
                state.toothSelections.push(tooth);
            }

            // Save the field selection
            tooth[field] = value;
            tooth[`${field}Price`] = price;
            tooth[`${field}Option`] = option;

            // Rebuild doctorOrderItems
            const items = [];
            let total = 0;

            state.toothSelections.forEach(t => {
                fields.forEach(f => {
                    if (t[f]) {
                        items.push({
                            id: `${t.toothId}-${f}`,  // unique id per tooth-field
                            toothId: t.toothId,
                            dropdownMasterId: t[f],
                            unitPrice: t[`${f}Price`] || 0,
                            dropdown: t[`${f}Option`] || null,
                            quantity: 1
                        });
                        total += t[`${f}Price`] || 0;
                    }
                });
            });

            state.doctorOrderItems = items;
            state.totalPrice = total;
        },

        setDoctorField: (state, action) => {
            const { field, value } = action.payload;
            const idx = state.doctor.findIndex((d) => d.field === field);
            if (idx !== -1) state.doctor[idx].value = value;
        },

        // Update a single patient field
        setPatientField: (state, action) => {
            const { field, value } = action.payload;
            const idx = state.patient.findIndex((p) => p.field === field);
            if (idx !== -1) state.patient[idx].value = value;
        },

        // Note update
        setNote: (state, action) => {
            state.note = action.payload;
        },





        resetRestoration: (state) => {
            state.selectedTeeth = [];
            state.selectedTooth = null;
            state.toothSelections = [];
            state.totalPrice = 0;
            state.doctorOrderItems = [];
            state.doctor.forEach((d) => (d.value = ""));
            state.patient.forEach((p) => (p.value = ""));
            state.note.forEach((n) => (n.value = ""));
        },
    }
});

export const {
    selectTooth,
    updateToothSelection,
    resetRestoration,
    setDoctorField,
    setPatientField,
    setNote
} = restorationSlice.actions;

export default restorationSlice.reducer;
