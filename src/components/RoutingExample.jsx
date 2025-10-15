import React from "react";
import { useAuth } from "../auth/AuthContext";
import { ERole } from "../constants/roles";

// Example component showing how to use the new routing system
const RoutingExample = () => {
  const {
    user,
    isAuthenticated,
    getUserRoles,
    hasUserRole,
    hasUserAnyRole,
    getUserHighestRole,
  } = useAuth();

  const userRoles = getUserRoles();
  const highestRole = getUserHighestRole();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Routing System Example</h2>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Authentication Status:</h3>
          <p
            className={`text-sm ${
              isAuthenticated() ? "text-green-600" : "text-red-600"
            }`}
          >
            {isAuthenticated() ? "Authenticated" : "Not Authenticated"}
          </p>
        </div>

        {isAuthenticated() && (
          <>
            <div>
              <h3 className="text-lg font-semibold">User Information:</h3>
              <p className="text-sm text-gray-600">
                Name: {user?.fullName || user?.name || "N/A"}
              </p>
              <p className="text-sm text-gray-600">
                Email: {user?.email || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">User Roles:</h3>
              <p className="text-sm text-gray-600">
                Roles:{" "}
                {userRoles.length > 0
                  ? userRoles.join(", ")
                  : "No roles assigned"}
              </p>
              <p className="text-sm text-gray-600">
                Highest Role: {highestRole || "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Role Checks:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div
                  className={`p-2 rounded ${
                    hasUserRole(ERole.ADMIN)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Admin: {hasUserRole(ERole.ADMIN) ? "Yes" : "No"}
                </div>
                <div
                  className={`p-2 rounded ${
                    hasUserRole(ERole.DOCTOR)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Doctor: {hasUserRole(ERole.DOCTOR) ? "Yes" : "No"}
                </div>
                <div
                  className={`p-2 rounded ${
                    hasUserRole(ERole.PATIENT)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Patient: {hasUserRole(ERole.PATIENT) ? "Yes" : "No"}
                </div>
                <div
                  className={`p-2 rounded ${
                    hasUserRole(ERole.CUSTOMER)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  Customer: {hasUserRole(ERole.CUSTOMER) ? "Yes" : "No"}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Multi-Role Check:</h3>
              <p className="text-sm text-gray-600">
                Admin or Doctor:{" "}
                {hasUserAnyRole([ERole.ADMIN, ERole.DOCTOR]) ? "Yes" : "No"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoutingExample;
