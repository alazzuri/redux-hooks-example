import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sumbitResponse } from "../../../services/formAPI";

const initialState = {
  showModal: false,
  recipients: "",
  selectedInput: "",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const submitAsync = createAsyncThunk(
  "modal/submitData",
  async (data) => {
    const response = await sumbitResponse(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    togleModal: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.showModal = !state.showModal;
    },
    selectInput: (state, action) => {
      console.log(action.payload);
      state.selectedInput = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setRecipients: (state, action) => {
      state.recipients = action.payload;
    },
  },

  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(submitAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});

export const { togleModal, selectInput, setRecipients } = modalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const showModal = (state) => state.modal.showModal;
export const recipients = (state) => state.modal.recipients;
export const selectedInput = (state) => state.modal.selectedInput;
export const loadingStatus = (state) => state.modal.status;
export const data = (state) => state.modal.data;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default modalSlice.reducer;
