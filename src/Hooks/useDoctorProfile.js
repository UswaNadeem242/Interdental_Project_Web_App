import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorProfile } from "../api/doctorDasboard";
import { setDoctorProfile, setDoctorField } from "../store/slices/restoration-slice";

export const useDoctorProfile = () => {
  const dispatch = useDispatch();
  const doctorProfile = useSelector((state) => state.restoration.doctorProfile);

  useEffect(() => {
    // Only fetch if not already loaded
    if (doctorProfile) return;

    const userData = localStorage.getItem("users");
    if (!userData) return;

    const fetchProfile = async () => {
      try {
        const parsedUserData = JSON.parse(userData);
        const userId = parsedUserData.id;
        
        const response = await getDoctorProfile(userId);
        const profile = response?.data?.data;
        
        if (profile) {
          dispatch(setDoctorProfile(profile));
          
          // Also update doctor field in restoration state
          if (profile.id && profile.officeRefNumber) {
            dispatch(
              setDoctorField({
                id: profile.id,
                officeRefNumber: profile.officeRefNumber,
              })
            );
          }
        }
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch, doctorProfile]);

  return doctorProfile;
};

