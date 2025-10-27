import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "../../icon/google";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function SignupWithGoogle({ role }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const googleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Token Received:", tokenResponse);

      const accessToken = tokenResponse.access_token;

      try {
        const { data: googleUser } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        console.log("Google User:", googleUser);

        const payload = {
          email: googleUser.email,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          googleId: googleUser.sub,
          role: role, // DOCTOR or CUSTOMER
        };

        console.log("Sending payload to backend /social-sign-in ...");
        const { data } = await axios.post(
          `${BASE_URL}/api/users/social-sign-in`,
          payload
        );

        console.log("Backend Response:", data);

        const { users, accessToken: backendAccessToken } = data.data;

        // Use context to store login
        login(users, backendAccessToken);

        // Check if profile is complete for DOCTOR role
        if (role === "DOCTOR") {

          console.log("Users:", users);

          const isComplete = users.drlicenceNo && users.officeRefNo;
          
          if (!isComplete) {
            // Redirect to complete profile page
            navigate("/complete-profile");
          } else {
            // Redirect to doctor dashboard
            navigate("/doctor-admin/dashboard");
          }
        } else if (role === "CUSTOMER") {
          // Redirect to home for customer
          navigate("/");
        } else {
          // Fallback for other roles
          navigate("/");
        }
      } catch (error) {
        console.error("Error during signup flow:", error);
      }
    },
    onError: () => console.log("Google signup failed"),
    scope: "openid email profile",
  });

  return (
    <button onClick={() => googleSignup()} className="w-full">
      <div className="flex w-full h-[56px] py-[17px] px-[24px] rounded-[32px] gap-[8px] border-[1px] border-[#FFFFFF] bg-[#FFFFFF] justify-center items-center cursor-pointer hover:shadow-md transition-shadow">
        <GoogleIcon className="w-5 h-6" />
        <h1 className="hidden lg:block text-sm font-poppins">
          Sign up with Google
        </h1>
      </div>
    </button>
  );
}
