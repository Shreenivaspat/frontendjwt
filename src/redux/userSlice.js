// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// export const getUsers = createAsyncThunk('gets/getUsers' , async()=>{
//     return axios.get("https://jsonplaceholder.typicode.com/users").then(res =>{
//         return res.data
//     })
// })


// const userSlice = createSlice({
//     name : "users",
//     initialState : {
//         users :[],
//         loading : false
//     },
//     extraReducers : {
//         [getUsers.pending]: (state) => {
//             state.loading = true;
//           },
//           [getUsers.fulfilled]: (state, action) => {
//             state.loading = false;
//             state.users = action.payload;
//           },
//           [getUsers.rejected]: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//           },
//     }
// });

// export default userSlice.reducer


import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk('gets/getUsers', async () => {
  return axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
    return res.data
  })
})

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null, // Add error field to the initial state
    editUser: null, 
  },
  reducers: {
    setEditUser: (state, action) => {
      state.editUser = action.payload;
    },
    updateUser: (state, action) => {
      const { id, updatedData } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...updatedData };
      }
      state.editUser = null;
    },
    deleteUser: (state, action) => {
      const userIdToDelete = action.payload;
      state.users = state.users.filter((user) => user.id !== userIdToDelete);
    },
  }, // Add an empty reducers object if you don't have any other reducers
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setEditUser, updateUser, deleteUser  } = userSlice.actions;

export default userSlice.reducer;