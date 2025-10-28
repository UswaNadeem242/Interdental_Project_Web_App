import { createSlice } from "@reduxjs/toolkit";
const fields = [
  "scannerType",
  "digitalOptions",
  "surgical_guide",
  "material",
  "lab",
  "crown",
  "Photogrammetry_files",
];
const restorationSlice = createSlice({
  name: "restoration",
  initialState: {
    selectedTeeth: [],
    selectedTooth: [],
    toothSelections: [],
    totalPrice: 0,
    doctorOrderItems: [],
    doctor: [
      { field: "officeReg", value: "", id: "" }, // added id field upfront
      { field: "dueDate", value: "" },
    ],
    patient: null,
    // Global dropdown selections that apply to all teeth
  globalSelections: {
    scannerType: null,
    digitalOptions: null,
    surgical_guide: null,
    material: null,
    lab: null,
    crown: null,
    Model_type: null,
    photogrammetryfiles: null,
    shades: {}, // Changed from single shade to multiple shades object
  },
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
        state.selectedTeeth = state.selectedTeeth.filter((t) => t !== id);
      } else {
        state.selectedTeeth.push(id);
      }

      // last selected tooth
      state.selectedTooth = state.selectedTeeth.length
        ? state.selectedTeeth[state.selectedTeeth.length - 1]
        : null;
    },
    updateToothSelection: (state, action) => {
      const {
        toothId,
        field,
        value,
        price = 0,
        option = null,
      } = action.payload;
      if (!toothId) return;
      let tooth = state.toothSelections.find((t) => t.toothId === toothId);
      if (!tooth) {
        tooth = { toothId };
        state.toothSelections.push(tooth);
      }
      tooth[field] = value;
      tooth[`${field}Price`] = price;
      tooth[`${field}Option`] = option;
      const items = [];
      let total = 0;

      state.toothSelections.forEach((t) => {
        ["material", "shade", "crown", "lab", "Model_type"].forEach((f) => {
          if (t[f]) {
            items.push({
              id: `${t.toothId}-${f}`,
              toothId: t.toothId,
              dropdownMasterId: t[f],
              unitPrice: t[`${f}Price`] || 0,
              dropdown: t[`${f}Option`] || null,
              quantity: 1,
            });
            total += t[`${f}Price`] || 0;
          }
        });
      });

      state.doctorOrderItems = items;
      state.totalPrice = total;
    },
    updateGlobalSelection: (state, action) => {
      const { field, value, price = 0, option = null } = action.payload;
      
      // Update global selection
      state.globalSelections[field] = {
        value,
        price,
        option,
      };

      // Recalculate total price and doctor order items based on selected teeth
      const items = [];
      let total = 0;

      state.selectedTeeth.forEach((toothId) => {
        // Apply global selections to each selected tooth
        Object.entries(state.globalSelections).forEach(([fieldName, selection]) => {
          if (selection && selection.value) {
            items.push({
              id: `${toothId}-${fieldName}`,
              toothId: toothId,
              dropdownMasterId: selection.value,
              unitPrice: selection.price || 0,
              dropdown: selection.option || null,
              quantity: 1,
            });
            total += selection.price || 0;
          }
        });
      });

      state.doctorOrderItems = items;
      state.totalPrice = total;
    },
    updateShadeSelection: (state, action) => {
      const { groupName, shade } = action.payload;
      
      // If shade is null, remove the selection (deselect)
      if (shade === null) {
        delete state.globalSelections.shades[groupName];
      } else {
        state.globalSelections.shades[groupName] = shade;
      }
      
      // Recalculate total price and doctor order items
      const items = [];
      let total = 0;

      state.selectedTeeth.forEach((toothId) => {
        // Apply global selections to each selected tooth
        Object.entries(state.globalSelections).forEach(([fieldName, selection]) => {
          if (selection && selection.value) {
            items.push({
              id: `${toothId}-${fieldName}`,
              toothId: toothId,
              dropdownMasterId: selection.value,
              unitPrice: selection.price || 0,
              dropdown: selection.option || null,
              quantity: 1,
            });
            total += selection.price || 0;
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
      const { id, officeRefNumber } = action.payload;

      const officeIdx = state.doctor.findIndex((d) => d.field === "officeReg");
      if (officeIdx !== -1) {
        // Only update value if officeRefNumber is provided, otherwise keep existing
        state.doctor[officeIdx].value =
          officeRefNumber !== undefined
            ? officeRefNumber
            : state.doctor[officeIdx].value;

        // Always set the id
        state.doctor[officeIdx].id = id || state.doctor[officeIdx].id;
      }
    },

    setDueDate: (state, action) => {
      const { dueDate } = action.payload;
      const dueDateIdx = state.doctor.findIndex((d) => d.field === "dueDate");
      if (dueDateIdx !== -1) {
        state.doctor[dueDateIdx].value = dueDate || "";
      }
    },

    setNote: (state, action) => {
      state.note = action.payload;
    },
    resetGlobalSelections: (state) => {
      // Reset global selections
      state.globalSelections = {
        scannerType: null,
        digitalOptions: null,
        surgical_guide: null,
        material: null,
        lab: null,
        crown: null,
        Model_type: null,
        photogrammetryfiles: null,
        shades: {}, // Reset shades object
      };
      // Recalculate total price and doctor order items
      state.doctorOrderItems = [];
      state.totalPrice = 0;
    },
    resetRestoration: (state) => {
      state.selectedTeeth = [];
      state.selectedTooth = null;
      state.toothSelections = [];
      state.totalPrice = 0;
      state.doctorOrderItems = [];
      state.doctor.forEach((d) => (d.value = ""));
      // Reset global selections
      state.globalSelections = {
        scannerType: null,
        digitalOptions: null,
        surgical_guide: null,
        material: null,
        lab: null,
        crown: null,
        Model_type: null,
        photogrammetryfiles: null,
        shades: {}, // Reset shades object
      };
      state.note = "";
    },
  },
});

export const {
  selectTooth,
  updateToothSelection,
  updateGlobalSelection,
  updateShadeSelection,
  resetGlobalSelections,
  resetRestoration,
  setDoctorField,
  setDueDate,
  setNote,
  setSelectedPatient,
} = restorationSlice.actions;

export default restorationSlice.reducer;
