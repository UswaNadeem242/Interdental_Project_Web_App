import { useEffect, useState } from "react";
import TextInput from "../../../Common/Input";
import PenIcon from "../../../icon/PenIcon";
import ChangePasswordModel from "../../../modals/ChangePasswordModel";
import ChevronRightIcon from "../../../icon/ChevronRight";
import LockIcon from "../../../icon/LockIcon";
import PatientChangePasswordModel from "../../../modals/PatientChangePasswordModal";
import { useDispatch, useSelector } from "react-redux";
import { getPatientProfile, updatePatientProfile, updateUserPatientProfileImage } from "../../../api/patient-dashaboard-api";
import { showToast } from "../../../store/toast-slice";
import { setProfileImage } from "../../../store/slices/profileImage-slice";

const ProfileSettings = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };
  const [form, setForm] = useState(initialState);
  const [patinetProfile, setPatientProfile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isModalPassword, setIsModalPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const profileImage = useSelector((state) => state.profile?.profileImage);

  const dispatch = useDispatch();
  // here interation 
  useEffect(() => {
    const userData = localStorage.getItem("users");

    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData.id;

      const fetchDoctorProfile = async () => {
        const response = await getPatientProfile(userId);

        // if (response.status === 200) {
        //   // dispatch(setProfileData(response.data.data));
        //   setProfileData(response.data.data)
        // }
        console.log('useEffect doctor:', response);

        setPatientProfile(response.data.data);
      };
      fetchDoctorProfile();
    }
  }, []);

  useEffect(() => {
    if (patinetProfile) {
      setForm({
        firstName: patinetProfile?.firstName || "",
        lastName: patinetProfile?.lastName || "",
        email: patinetProfile?.email || "",
        phone: patinetProfile?.phoneNumber || "",
      });
    }
  }, [patinetProfile]);
  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "firstName") {
      if (!value.trim()) errorMsg = "First name is required.";
      else if (value.length < 2) errorMsg = "Must be at least 2 characters.";
    }
    if (name === "lastName") {
      if (!value.trim()) errorMsg = "First name is required.";
      else if (value.length < 2) errorMsg = "Must be at least 2 characters.";
    }
    if (name === "email") {
      if (!value.trim()) errorMsg = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        errorMsg = "Invalid email address.";
    }

    if (name === "phone") {
      if (!value.trim()) errorMsg = "Phone number is required.";
      else if (!/^\+?\d{10,15}$/.test(value))
        errorMsg = "Invalid phone number. Include country code.";
    }

    return errorMsg;
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "firstName") {
      newValue = newValue.replace(/[^a-zA-Z ]/g, "");
    }
    if (name === "lastName") {
      newValue = newValue.replace(/[^a-zA-Z ]/g, "");
    }

    if (name === "phone") {
      newValue = newValue.replace(/[^0-9+]/g, "").slice(0, 15);
    }

    if (name === "email") {
      newValue = newValue.slice(0, 50);
    }

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSave = () => {
    const newErrors = {
      username: validateField("username", form.username),
      email: validateField("email", form.email),
      phone: validateField("phone", form.phone),
    };

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((err) => err);
    if (hasErrors) return;
  };


  //UPDATE API 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submit
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setIsUpdating(true);

        const bodyData = {
          firstName: form?.firstName,
          lastName: form?.lastName,
          phone: form?.phone,

        };

        const response = await updatePatientProfile(bodyData);

        if (response.status === 200) {
          dispatch(
            showToast({
              message: `Profile updated successfully!`,
              type: "success",
            })
          );
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.error("Failed to update profile. Please try again", response);
          dispatch(
            showToast({
              message: `Failed to update profile. Please try again`,
              type: "error",
            })
          );
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        dispatch(
          showToast({
            message: `Error updating profile. Please try again.`,
            type: "error",
          })
        );
      } finally {
        setIsUpdating(false);
      }
    }
  };

  // IMAGE UPLOAD 
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate type
    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file", "error");
      return;
    }

    // Validate size
    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size should be less than 5MB", "error");
      return;
    }

    // Instant preview
    const reader = new FileReader();
    reader.onload = (e) => setProfileImagePreview(e.target.result);
    reader.readAsDataURL(file);

    setIsUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("profileImage", file);

      const response = await updateUserPatientProfileImage(formData);

      if (response.status === 200 || response.data?.responseCode === "200") {
        showToast("Profile image updated successfully!", "success");

        // ✅ Use preview image for Redux (instant update across app)
        dispatch(setProfileImage(reader.result));
      } else {
        showToast(
          response.data?.responseMessage || "Failed to update profile image",
          "error"
        );
        setProfileImagePreview(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showToast("Error uploading image. Please try again.", "error");
      setProfileImagePreview(null);
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-12 grid-cols-1 gap-4 bg-white md:p-8 p-4 rounded-2xl items-center  ">
        {/* Left side */}
        <div className="col-span-12 md:col-span-6 flex gap-4 items-center">
          <img

            src={profileImage || profileImagePreview || "/assets/user.png"}
            className="md:w-20 md:h-20 w-12 h-12 object-cover rounded-full"
            alt="Profile"
          />
          <div>
            <h3 className="text-2xl font-bold font-poppins">
              {patinetProfile?.firstName} {patinetProfile?.lastName}
            </h3>
            <p className="text-docText font-poppins text-sm mt-2">
              {patinetProfile?.email}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="col-span-12 md:col-span-6 flex md:justify-end justify-start ">
          <div>
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isUploadingImage}

            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer bg-textField text-textColor1 text-sm py-5 px-6 rounded-full font-semibold font-poppins inline-block text-primaryText"
            >
              Upload new picture
            </label>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl md:p-8 p-4   mt-10 font-poppins">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-12 grid-cols-6 gap-4  items-center">
            <div className="md:col-span-6 col-span-3 mb-10 mt-4">
              <h3 className="text-primaryText text-lg font-poppins font-semibold  capitalize">
                Account info
              </h3>
            </div>
            <div className="md:col-span-6 col-span-3  md:flex  md:justify-end">
              <button type="submit"
                disabled={isUpdating}
                className={`bg-secondaryBrand text-white md:px-8 px-4  md:py-4 md:text-md text-sm py-2 rounded-full ${isUpdating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-secondaryBrand"
                  }`}
              >
                {isUpdating ? "Save Change ..." : "Save Change"}

              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-12 grid-cols-6 gap-4 bg-white  ">
            <div className="md:col-span-6 col-span-12 space-y-4 ">
              <TextInput
                id="firstName"
                name="firstName"
                label="First Name"
                placeholder="Bransim"
                icon={<PenIcon size={18} />}
                value={form.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={"font-semibold "}
                className3={"text-secondaryText"}
              />
              {errors.firstName && (
                <p className="text-red-700 text-sm">{errors.firstName}</p>
              )}
            </div>
            <div className="md:col-span-6 col-span-12 space-y-4 ">
              <TextInput
                id="lastName"
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                className3={"text-secondaryText"}
                icon={<PenIcon size={18} />}
                value={form.lastName || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && (
                <p className="text-red-800 text-sm">{errors.lastName}</p>
              )}
            </div>
            <div className="md:col-span-6 col-span-12 ">
              <TextInput
                id="email"
                name="email"
                label="E-mail Address"
                placeholder="hanry463@gmail.com"
                type="email"
                value={form.email}
                // onChange={handleChange}
                // onBlur={handleBlur}
                className={"font-semibold "}
                // icon={<PenIcon size={18} />}
                className3="text-secondaryText cursor-not-allowed"
                readOnly
              />
              {errors.email && (
                <p className="text-red-700 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="md:col-span-6 col-span-12">
              <TextInput
                id="phone"
                name="phone"
                label="Phone Number"
                placeholder="+92 457 765 456"
                type="text"
                icon={<PenIcon size={18} />}
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={"font-semibold"}
                className3={"text-secondaryText"}
              />
              {errors.phone && (
                <p className="text-red-700 text-sm">{errors.phone}</p>
              )}
            </div>
          </div>
        </form>
        <button
          onClick={() => setIsModalPassword(true)}
          className="w-full flex items-center justify-between py-3 px-4 border-b border-borderPrimary text-left hover:border-borderPrimary transition mt-7"
        >
          <div className="flex items-center gap-3">
            <LockIcon size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Change password
            </span>
          </div>

          <ChevronRightIcon size={10} className="text-gray-400" />
        </button>

        {isModalPassword && (
          <PatientChangePasswordModel
            isModalPassword={isModalPassword}
            setIsModalPassword={setIsModalPassword}
          />
        )}
      </div>
    </>
  );
};

export default ProfileSettings;
