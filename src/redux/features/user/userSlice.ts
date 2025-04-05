import { IUser } from "@/utils";
import { createSlice } from "@reduxjs/toolkit";

interface UsersState {
  users: IUser[];
  totalUsers: number;
  page: number;
}
const initialState: UsersState = {
  users: [],
  totalUsers: 0,
  page: 1,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload.users;
      state.totalUsers = action.payload.total;
      state.page = action.payload.page;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
