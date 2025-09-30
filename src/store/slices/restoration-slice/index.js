import { createSlice } from "@reduxjs/toolkit";
const fields = ["scannerType", "digitalOptions", "surgical_guide", "material", "lab", "crown", "Photogrammetry_files"];
const restorationSlice = createSlice({
    name: "restoration",
    initialState: {
        selectedTeeth: [],
        selectedTooth: [],
        toothSelections: [],
        totalPrice: 0,
        doctorOrderItems: [],
        doctor: [
            { id: 1, field: "doctorName", value: "" },
            { id: 2, field: "officeReg", value: "" },
            { id: 3, field: "createDate", value: "" },
            { id: 4, field: "dueDate", value: "" },
        ],
         patient: null,

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
            let tooth = state.toothSelections.find(t => t.toothId === toothId);
            if (!tooth) {
                tooth = { toothId };
                state.toothSelections.push(tooth);
            }
            tooth[field] = value;
            tooth[`${field}Price`] = price;
            tooth[`${field}Option`] = option;
            const items = [];
            let total = 0;

            state.toothSelections.forEach(t => {
                ["material", "shade", "crown", "lab"].forEach(f => {
                    if (t[f]) {
                        items.push({
                            id: `${t.toothId}-${f}`,
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
         setSelectedPatient: (state, action) => {
      state.patient = action.payload; // store full patient object
    },
        setDoctorField: (state, action) => {
            const { field, value } = action.payload;
            const idx = state.doctor.findIndex((d) => d.field === field);
            if (idx !== -1) state.doctor[idx].value = value;
        },


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

            state.note = "";
        },
    }
});

export const {
    selectTooth,
    updateToothSelection,
    resetRestoration,
    setDoctorField,
    setNote,
    setSelectedPatient 
} = restorationSlice.actions;

export default restorationSlice.reducer;
