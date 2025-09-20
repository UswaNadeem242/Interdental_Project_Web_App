import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "../../../services/order-service";

export const fetchTeeth = createAsyncThunk(
    "teeth/fetchTeeth",
    async (_, { rejectWithValue }) => {
        try {
            const res = await orderService.getTooth();
            const raw = res?.data?.data || res?.data || [];
            return Array.isArray(raw)
                ? raw.map((t, idx) => ({
                    id: Number(t.toothNumber) || t.id || idx + 1,
                    name: t.toothName || `Tooth ${idx + 1}`,
                    fdiNumber: t.fdiNumber,
                    quadrant: t.quadrant,
                    type: t.type,
                    isPermanent: t.isPermanent,
                }))
                : [];
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const teethSlice = createSlice({
    name: "teeth",
    initialState: {
        teethData: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTeeth.pending, state => { state.loading = true; state.error = null; })
            .addCase(fetchTeeth.fulfilled, (state, action) => {
                state.teethData = action.payload;
                state.loading = false;
            })
            .addCase(fetchTeeth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default teethSlice.reducer;
