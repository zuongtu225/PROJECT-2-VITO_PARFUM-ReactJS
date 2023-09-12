import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import * as actions from "../action";
const originSlice = createSlice({
  name: "users",
  initialState: {
    origins: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.getApiOrigins.pending, (state: any, action) => {
      state.origins = action.payload;
    });
    builder.addCase(actions.getApiOrigins.fulfilled, (state: any, action) => {
      state.origins = action.payload;
    });
    builder.addCase(actions.getApiOrigins.rejected, (state: any, action) => {
      state.origins = action.payload;
    });
  },
});

export default originSlice.reducer;
