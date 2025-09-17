// export function getDropdownOptions(type, orders) {
//   if (!Array.isArray(orders)) return [];
//   return (
//     orders.find((item) => item.type === type)?.children.map((child) => ({
//       label: child.name,
//       value: child.id,
//     })) || []
//   );
// }


// export function getDropdownOptions(type, orders) {
//     if (!Array.isArray(orders)) return [];
//     return (
//         orders.find((item) => item.type === type)?.children.map((child) => ({
//             label: child.name,
//             value: child.id,
//         })) || []
//     );
// }


// export function getDropdownOptions(type, orders) {
//   if (!Array.isArray(orders)) return [];

//   return orders
//     .filter((item) => item.type === type)
//     .map((item) => ({
//       label: item.name,
//       value: item.id,
//     }));
// }

// export const getDropdownOptions = (typeName, orders) => {
//     return orders.find((p) => p.name === typeName)?.children || [];
// };


// export const getDropdownOptions = (typeName, orders) => {
//     return (
//         orders.find((p) => p.name === typeName)?.children.map((child) => ({
//             label: child.name,
//             value: child.id,
//             price: child.price || 0, // 👈 extra field (safe fallback)
//         })) || []
//     );
// };

export const getDropdownOptions = (typeName, orders = []) => {
    const parent = orders.find((p) => p.name === typeName);

    if (!parent) {
        console.warn(`⚠️ No parent found for ${typeName}`, orders);
        return [];
    }

    return parent.children?.map((child) => ({
        label: child.name,
        value: child.id,
        name: child.name,          // ✅ for readability
        price: child.price || 0,   // ✅ extra field
    })) || [];
};
