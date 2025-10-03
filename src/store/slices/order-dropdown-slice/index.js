import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "../../../services/order-service";
 

export const fetchDropdowns = createAsyncThunk(
    "dropdown/fetchDropdowns",
    async (_, { rejectWithValue }) => {
        try {
            const res = await orderService.getDropDown();
             const raw = res?.data?.data || [];
            const mapped = raw.map(parent => ({
                id: parent.id,
                name: parent.name,
                type: parent.type,
                price: parent.price,
                discountedPrice: parent.discountedPrice,
                children: parent.name === "Shade"
                    ? (parent.children || [])
                    : (parent.children?.map(child => ({
                        label: child.name,
                        value: child.id,
                        parentId: parent.id,
                        price: child.price,
                    })) || []),
            }));
            const shadeRoot = raw.find(p => p.name === "Shade");
            return { mapped, shadeGroups: shadeRoot?.children || [] };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const dropdownSlice = createSlice({
    name: "dropdown",
    initialState: {
        orders: [],
        shadeGroups: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDropdowns.pending, state => { state.loading = true; state.error = null; })
            .addCase(fetchDropdowns.fulfilled, (state, action) => {
                state.orders = action.payload.mapped;
                state.shadeGroups = action.payload.shadeGroups;
                state.loading = false;
            })
            .addCase(fetchDropdowns.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default dropdownSlice.reducer;
