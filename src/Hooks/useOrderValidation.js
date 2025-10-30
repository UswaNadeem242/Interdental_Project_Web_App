import { useSelector } from "react-redux";

export const useOrderValidation = () => {
  // const { selectedTeeth } = useSelector((state) => state.restoration);
  const { selectedTeeth, uploadedFiles } = useSelector(
    (state) => state.restoration
  );

  const validateOrder = (values) => {
    // Validate in visual order (top to bottom of form)

    // 1. Due Date (top of form)
    if (!values.dueDate) {
      return { isValid: false, firstError: "Select the Due Date first" };
    }

    // 2. Patient Selection (second section)
    if (!values.patientFirstName) {
      return { isValid: false, firstError: "Select a patient first" };
    }

    // 3. Teeth Selection (center section)
    if (selectedTeeth.length === 0) {
      return {
        isValid: false,
        firstError: "Please select at least one tooth first",
      };
    }

    // 4. Scanner Type (left sidebar)
    if (!values.scannerType) {
      return { isValid: false, firstError: "Scanner Type is required" };
    }

    // 5. Material (right sidebar - modules)
    if (!values.material) {
      return { isValid: false, firstError: "Material is required" };
    }

    // 6. Digital Model Type (right sidebar)
    if (!values.Model_type) {
      return { isValid: false, firstError: "Digital Model Type is required" };
    }

    // 7. Laboratory (right sidebar - last required field)
    if (!values.lab) {
      return { isValid: false, firstError: "Laboratory is required" };
    }

    //  9. Notes

    if (!values.note || values.note.trim().length === 0) {
      return { isValid: false, firstError: "Note is required" };
    }

    //  9. Upload Photo/Files
    if (!uploadedFiles || uploadedFiles.length === 0) {
      return {
        isValid: false,
        firstError: "Please upload a photo or file",
      };
    }

    return { isValid: true, firstError: null };
  };

  return { validateOrder };
};
