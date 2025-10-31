import { useSelector } from "react-redux";

export const useOrderValidation = () => {
  const { selectedTeeth, uploadedFiles, globalSelections } = useSelector(
    (state) => state.restoration
  );

  const validateOrder = (values) => {
    // Validate in visual order (top to bottom of form)
    // console.log("Validation Values", values);

    //
    if (
      !("smileDesign" in globalSelections) ||
      !globalSelections.smileDesign?.value
    ) {
      return {
        isValid: false,
        firstError: "Please select a Smile Design",
      };
    }
    //

    // 1. Due Date (top of form)
    if (!values.dueDate) {
      return {
        isValid: false,
        firstError: "Select the Expected Delivery Date first",
      };
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
    // shades
    const shades = globalSelections?.shades || {};

    if (!shades || Object.keys(shades).length === 0) {
      return {
        isValid: false,
        firstError: "Please select at least one shade.",
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

    // Denture
    if (!values.digitalOptions) {
      return { isValid: false, firstError: "Denture is required" };
    }
    // 7. Surgical Guide
    // if (!values.surgical_guide) {
    //   return { isValid: false, firstError: "Surgical Guide is required" };
    // }

    // 7. Laboratory (right sidebar - last required field)
    if (!values.crown) {
      return { isValid: false, firstError: "Smart Crown is required" };
    }
    // Scanner
    if (!values.scannerType) {
      return { isValid: false, firstError: "Scanner Type is required" };
    }
    // Photogrammetry Files
    if (!values.photogrammetryfiles) {
      return {
        isValid: false,
        firstError: "Photogrammetry Files is required",
      };
    }

    //  9. Notes
    //photogrammetryfiles

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
