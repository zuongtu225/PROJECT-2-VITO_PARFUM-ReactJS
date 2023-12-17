import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";
const historyOrderSlice = createSlice({
  name: "historyOrders",
  initialState: {
    historyOrders: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getHistoryOrders.pending, (state: any, action) => {
      state.historyOrders = action.payload;
    });
    builder.addCase(
      actions.getHistoryOrders.fulfilled,
      (state: any, action) => {
        state.historyOrders = action.payload;
      }
    );
    builder.addCase(actions.getHistoryOrders.rejected, (state: any, action) => {
      state.historyOrders = action.payload;
    });
  },
});

export default historyOrderSlice.reducer;
