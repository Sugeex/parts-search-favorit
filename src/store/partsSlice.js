import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGoods } from '../api';

export const searchBrands = createAsyncThunk('parts/searchBrands', ({ number }) =>
  fetchGoods({ number })
);

export const searchOffers = createAsyncThunk('parts/searchOffers', ({ number, brand }) =>
  fetchGoods({ number, brand, analogues: 'on' })
);

const emptyRequest = { status: 'idle', items: [], error: null, requestId: null };

const initialState = {
  number: '',
  brands: { ...emptyRequest },
  selectedBrand: null,
  offers: { ...emptyRequest },
};

function uniqueBrands(goods) {
  const map = new Map();
  goods.forEach((g) => {
    if (g.brand && !map.has(g.brand)) map.set(g.brand, { brand: g.brand, name: g.name });
  });
  return [...map.values()];
}

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  extraReducers: (builder) => {
    builder
      // --- этап 1 ---
      .addCase(searchBrands.pending, (state, action) => {
        state.number = action.meta.arg.number;
        state.selectedBrand = null;
        state.offers = { ...emptyRequest };
        state.brands = { ...emptyRequest, status: 'loading', requestId: action.meta.requestId };
      })
      .addCase(searchBrands.fulfilled, (state, action) => {
        if (state.brands.requestId !== action.meta.requestId) return;
        state.brands.status = 'succeeded';
        state.brands.items = uniqueBrands(action.payload);
      })
      .addCase(searchBrands.rejected, (state, action) => {
        if (state.brands.requestId !== action.meta.requestId) return;
        state.brands.status = 'failed';
        state.brands.error = action.error.message;
      })


    
      .addCase(searchOffers.pending, (state, action) => {
        state.selectedBrand = action.meta.arg.brand;
        state.offers = { ...emptyRequest, status: 'loading', requestId: action.meta.requestId };
      })
      .addCase(searchOffers.fulfilled, (state, action) => {
        if (state.offers.requestId !== action.meta.requestId) return;
        state.offers.status = 'succeeded';
        state.offers.items = action.payload;
      })
      .addCase(searchOffers.rejected, (state, action) => {
        if (state.offers.requestId !== action.meta.requestId) return;
        state.offers.status = 'failed';
        state.offers.error = action.error.message;
      });
  },
});

export default partsSlice.reducer;
