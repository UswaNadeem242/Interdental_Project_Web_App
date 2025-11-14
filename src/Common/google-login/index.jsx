import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "../../icon/google";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { useDispatch } from "react-redux";
import { showToast } from "../../store/toast-slice";

export default function GoogleAuth({ role, buttonText, className = "" }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useDispatch();
  const isSignup = !!role;

  const googleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;

      try {
        const { data: googleUser } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const payload = {
          email: googleUser.email,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          googleId: googleUser.sub,
        };

        if (isSignup) {
          payload.role = role;
        }

        const { data } = await axios.post(
          `${BASE_URL}/api/users/social-sign-in`,
          payload
        );

        const { users, accessToken: backendAccessToken } = data.data;

        const userRole = isSignup && !users.roles ? role : users.roles[0];

        login(users, backendAccessToken, isSignup && !users.roles ? role : undefined);

        dispatch(
          showToast({
            message: "Logged in successfully!",
            type: "success",
          })
        );

        if (userRole === "DOCTOR") {
          const isComplete = users.drlicenceNo && users.officeRefNo;

          if (!isComplete) {
            navigate("/complete-profile");
          } else {
            if (!isSignup) {
              const isFirstLogin = !localStorage.getItem(
                `hasLoggedInBefore:${users.id}`
              );
              localStorage.setItem(`hasLoggedInBefore:${users.id}`, "true");

              if (isFirstLogin) {
                navigate("/enrollment-plans");
                return;
              }
            }
            navigate("/doctor-admin/dashboard");
          }
        } else if (userRole === "PATIENT") {
          navigate("/patient-admin/dashboard");
        } else if (userRole === "ADMIN") {
          navigate("/admin-panel/dashboard");
        } else if (userRole === "CUSTOMER") {
          navigate("/");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error during Google auth flow:", error);
        
        const errorMessage =
          error.response?.data?.responseMessage ||
          error.message ||
          (isSignup
            ? "Failed to sign up with Google. Please try again."
            : "Failed to login with Google. Please try again.");

        dispatch(
          showToast({
            message: errorMessage,
            type: "error",
          })
        );
      }
    },
    onError: () => {
      dispatch(
        showToast({
          message: isSignup
            ? "Google signup was cancelled or failed."
            : "Google login was cancelled or failed.",
          type: "error",
        })
      );
    },
    scope: "openid email profile",
  });

  const displayText =
    buttonText || (isSignup ? "Sign up with Google" : "Login with Google");

  if (isSignup) {
    return (
      <button
        onClick={() => googleAuth()}
        className={className || "w-full"}
      >
        <div className="flex w-full h-[56px] py-[17px] px-[24px] rounded-[32px] gap-[8px] border-[1px] border-[#FFFFFF] bg-[#FFFFFF] justify-center items-center cursor-pointer hover:shadow-md transition-shadow">
          <GoogleIcon className="w-5 h-6" />
          <h1 className="hidden lg:block text-sm font-poppins">
            {displayText}
          </h1>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => googleAuth()}
      className={className || ""}
    >
      <span className="flex gap-2 items-center">
        <GoogleIcon className="w-5 h-6" />
        <h1 className="hidden lg:block text-sm font-poppins">
          {displayText}
        </h1>
      </span>
    </button>
  );
}
