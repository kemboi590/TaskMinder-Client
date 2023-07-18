import { createSlice } from "@reduxjs/toolkit";
const profilepicSlice = createSlice({
    name: "profilepic",
    initialState: {
        profilepic: null,

    },
    reducers: {
        UploadProfilePic: (state, action) => { 
            state.profilepic = action.payload.profilepic;
            
        },
        RemoveProfilePic: (state) => { 
            state.profilepic = null;
        }
    },
    
    
});

export const { UploadProfilePic, RemoveProfilePic } = profilepicSlice.actions;
export default profilepicSlice.reducer;