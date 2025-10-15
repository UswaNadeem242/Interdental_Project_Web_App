# Secure Routing System Documentation

This document explains the comprehensive role-based routing system implemented in the InterDental application.

## 🔐 Role System

### Available Roles

```javascript
ERole = {
  ADMIN: "ADMIN", // Super admin with full system access
  PATIENT: "PATIENT", // Patient users with warranty access
  DOCTOR: "DOCTOR", // Doctor users with practice management
  CUSTOMER: "CUSTOMER", // Customer users with shopping access
};
```

### Role Hierarchy

- **ADMIN** (Level 4) - Highest permissions
- **DOCTOR** (Level 3) - Practice management
- **PATIENT** (Level 2) - Warranty and claims
- **CUSTOMER** (Level 1) - Shopping and orders

## 🛡️ Route Components

### 1. PublicRoute

For routes that should be accessible to unauthenticated users but redirect authenticated users.

```jsx
<Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>
```

**Props:**

- `redirectAuthenticated` (boolean): Whether to redirect authenticated users (default: true)

### 2. PrivateRoute

For routes that require authentication and specific roles.

```jsx
<Route
  path="/shop"
  element={
    <PrivateRoute requiredRoles={[ERole.CUSTOMER]}>
      <Shop />
    </PrivateRoute>
  }
/>
```

**Props:**

- `requiredRoles` (array): Array of roles that can access this route
- `redirectTo` (string): Where to redirect unauthorized users (default: "/login")

### 3. RoleRoute

For routes that require specific role access with advanced options.

```jsx
<Route
  path="/admin-panel/*"
  element={
    <RoleRoute allowedRoles={[ERole.ADMIN]} exactRole={true}>
      <AdminPanel />
    </RoleRoute>
  }
/>
```

**Props:**

- `allowedRoles` (array): Roles that can access this route
- `exactRole` (boolean): If true, user must have exactly the specified role
- `fallbackRoute` (string): Custom fallback route for unauthorized access

### 4. ProtectedRoute (Legacy)

Simple authentication check without role validation.

```jsx
<Route
  path="/some-route"
  element={
    <ProtectedRoute>
      <SomeComponent />
    </ProtectedRoute>
  }
/>
```

## 📋 Route Categories

### Public Routes (No Authentication Required)

- `/` - Landing page
- `/product/*` - Product pages
- `/patient` - Patient information page
- `/doctor` - Doctor information page
- `/blog/*` - Blog pages
- `/about-us` - About page
- `/contact-us` - Contact page
- `/brands` - Brands page
- `/categories` - Categories page

### Authentication Routes (Redirect if Authenticated)

- `/login` - Login page
- `/signup` - Registration page
- `/forgot-password` - Password reset
- `/new-password` - New password setup

### Customer Routes (CUSTOMER Role Required)

- `/shop` - Shopping page
- `/shop/:productId` - Product details
- `/wishlist` - Wishlist management
- `/orders` - Order history
- `/order-info/:orderId` - Order details

### Doctor Routes (DOCTOR Role Required)

- `/doctor-admin/*` - Doctor dashboard and management

### Patient Routes (PATIENT Role Required)

- `/patient-admin/*` - Patient dashboard and warranty management

### Admin Routes (ADMIN Role Required)

- `/admin-panel/*` - Admin panel (exact ADMIN role only)
- `/admin/*` - Legacy admin routes

## 🔧 Usage Examples

### Multi-Role Access

```jsx
// Allow both CUSTOMER and DOCTOR roles for a shared feature
<Route
  path="/shared-feature"
  element={
    <RoleRoute allowedRoles={[ERole.CUSTOMER, ERole.DOCTOR]}>
      <SharedFeature />
    </RoleRoute>
  }
/>
```

### Exact Role Requirement

```jsx
// Only ADMIN role, not DOCTOR with ADMIN
<Route
  path="/admin-panel/*"
  element={
    <RoleRoute allowedRoles={[ERole.ADMIN]} exactRole={true}>
      <AdminPanel />
    </RoleRoute>
  }
/>
```

### Custom Redirect

```jsx
// Custom fallback for unauthorized access
<Route
  path="/restricted"
  element={
    <RoleRoute allowedRoles={[ERole.ADMIN]} fallbackRoute="/access-denied">
      <RestrictedContent />
    </RoleRoute>
  }
/>
```

## 🔄 Default Redirects

When users are redirected due to unauthorized access, they are sent to their role-appropriate dashboard:

- **ADMIN** → `/admin-panel/dashboard`
- **DOCTOR** → `/doctor-admin/dashboard`
- **PATIENT** → `/patient-admin/dashboard`
- **CUSTOMER** → `/shop`

## 🎯 Authentication Context Methods

The updated AuthContext provides these helper methods:

```javascript
const {
  // Basic auth
  user,
  isAuthenticated,
  loading,

  // Role management
  getUserRoles,
  hasUserRole,
  hasUserAnyRole,
  hasUserRoleAccess,
  getUserHighestRole,

  // Auth actions
  login,
  logout,
} = useAuth();
```

### Usage in Components

```javascript
import { useAuth } from "../auth/AuthContext";
import { ERole } from "../constants/roles";

function MyComponent() {
  const { hasUserRole, getUserHighestRole } = useAuth();

  // Check specific role
  const isAdmin = hasUserRole(ERole.ADMIN);

  // Get user's highest role
  const highestRole = getUserHighestRole();

  return (
    <div>
      {isAdmin && <AdminPanel />}
      <p>Your role: {highestRole}</p>
    </div>
  );
}
```

## 🚨 Security Features

1. **Token Validation**: Automatic token validation and refresh
2. **Role Verification**: Server-side role verification on API calls
3. **Route Protection**: Client-side route protection with fallbacks
4. **Session Management**: Persistent sessions with automatic logout on expiration
5. **Loading States**: Proper loading states during authentication checks

## 🔧 Customization

### Adding New Roles

1. Add role to `ERole` in `src/constants/roles.js`
2. Update `ROLE_HIERARCHY` with appropriate level
3. Add route access configuration in `ROUTE_ACCESS`
4. Set default route in `DEFAULT_ROUTES`

### Adding New Protected Routes

```jsx
<Route
  path="/new-protected-route"
  element={
    <PrivateRoute requiredRoles={[ERole.CUSTOMER, ERole.DOCTOR]}>
      <NewComponent />
    </PrivateRoute>
  }
/>
```

## 🐛 Troubleshooting

### Common Issues

1. **Infinite Redirects**: Check role configuration and default routes
2. **Unauthorized Access**: Verify user roles in localStorage
3. **Loading Issues**: Check token validity and network connectivity
4. **Role Mismatch**: Ensure backend returns correct role format

### Debug Mode

Add this to your component to debug authentication state:

```javascript
const { user, getUserRoles, isAuthenticated } = useAuth();
console.log("User:", user);
console.log("Roles:", getUserRoles());
console.log("Authenticated:", isAuthenticated());
```

This routing system provides comprehensive security while maintaining flexibility for different user types and access levels.
