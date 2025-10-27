import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import GoogleIcon from "../../icon/google";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

export default function LoginWithGoogle() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(" Google Token Received:", tokenResponse);

      const accessToken = tokenResponse.access_token;

      try {
        const { data: googleUser } = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        // console.log(" Google User:", googleUser);


        console.log(" Google User:", googleUser);
        const payload = {
          email: googleUser.email,
          firstName: googleUser.given_name,
          lastName: googleUser.family_name,
          googleId: googleUser.sub,
          role: "DOCTOR",
        };

        // console.log("Sending payload to backend /social-sign-in ...");
        const { data } = await axios.post(
          `${BASE_URL}/api/users/social-sign-in`,
          payload
        );

        console.log("Backend Response:", data);

        const { users, accessToken: backendAccessToken } = data.data;

        //  Use context to store login
        login(users, backendAccessToken);

        // Check profile completeness and redirect accordingly
        const userRole = users.roles[0];

        console.log("User Role:", userRole);
        console.log("Users:", users);
        if (userRole === "DOCTOR") {
          // Check if doctor profile is complete
          const isComplete = users.drlicenceNo&& users.officeRefNo;
          
          if (!isComplete) {
            navigate("/complete-profile");
          } else {
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
        console.error("Error during login flow:", error);
      }
    },
    onError: () => console.log("Google login failed"),
    scope: "openid email profile",
  });

  return (
    <button onClick={() => googleLogin()}>
      <span className="flex gap-2 items-center ">
        <GoogleIcon className="w-5 h-6" />
        <h1 className="hidden lg:block text-sm font-poppins">
          Login with Google
        </h1>
      </span>
    </button>
  );
}
