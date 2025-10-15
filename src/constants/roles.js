// Role enums and constants
export const ERole = {
	ADMIN: 'ADMIN',
	PATIENT: 'PATIENT',
	DOCTOR: 'DOCTOR',
	CUSTOMER: 'CUSTOMER'
};

// Role hierarchy (higher number = more permissions)
export const ROLE_HIERARCHY = {
	[ERole.CUSTOMER]: 1,
	[ERole.PATIENT]: 2,
	[ERole.DOCTOR]: 3,
	[ERole.ADMIN]: 4
};

// Route access configuration
export const ROUTE_ACCESS = {
	// Public routes (no authentication required)
	PUBLIC: [],

	// Routes accessible by specific roles
	[ERole.ADMIN]: [
		'/admin-panel/*',
		'/doctor-admin/*',
		'/patient-admin/*'
	],

	[ERole.DOCTOR]: [
		'/doctor-admin/*'
	],

	[ERole.PATIENT]: [
		'/patient-admin/*'
	],

	[ERole.CUSTOMER]: [
		'/shop',
		'/shop/*',
		'/wishlist',
		'/orders',
		'/order-info/*'
	]
};

// Default redirect paths for each role
export const DEFAULT_ROUTES = {
	[ERole.ADMIN]: '/admin-panel/dashboard',
	[ERole.DOCTOR]: '/doctor-admin/dashboard',
	[ERole.PATIENT]: '/patient-admin/dashboard',
	[ERole.CUSTOMER]: '/shop'
};

// Helper functions
export const hasRole = (userRoles, requiredRole) => {
	if (!userRoles || !Array.isArray(userRoles)) return false;
	return userRoles.includes(requiredRole);
};

export const hasAnyRole = (userRoles, requiredRoles) => {
	if (!userRoles || !Array.isArray(userRoles)) return false;
	if (!Array.isArray(requiredRoles)) requiredRoles = [requiredRoles];
	return requiredRoles.some(role => userRoles.includes(role));
};

export const hasRoleAccess = (userRoles, route) => {
	if (!userRoles || !Array.isArray(userRoles)) return false;

	// Check if user has access to the route
	for (const role of userRoles) {
		if (ROUTE_ACCESS[role]) {
			for (const allowedRoute of ROUTE_ACCESS[role]) {
				if (route.match(allowedRoute.replace('*', '.*'))) {
					return true;
				}
			}
		}
	}

	return false;
};

export const getHighestRole = (userRoles) => {
	if (!userRoles || !Array.isArray(userRoles)) return null;

	return userRoles.reduce((highest, role) => {
		const currentLevel = ROLE_HIERARCHY[role] || 0;
		const highestLevel = ROLE_HIERARCHY[highest] || 0;
		return currentLevel > highestLevel ? role : highest;
	}, userRoles[0]);
};
