// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//     isLoading: false,
//     favorites: [],
//     error: null
// }


// const CategoryDisplaySlice = createSlice({
//     name: 'CategoryDisplay',
//     initialState,
//     reducers: {
//         FavoritesIcon: (state, action) => {
//             // console.log(action.payload);

//             const Iconobj = action.payload

//             console.log(Iconobj);

//             const icon = state.favorites.some((v) => v.id === action.payload.id);

//             console.log(icon);

//             // const icon = state.favorites.findIndex((v) => v.id === action.payload.id );

//             // console.log(icon);

//             if (!icon) {
//                 state.favorites.push(Iconobj);
//             } else {
//                 let i = state.favorites.findIndex(v => v === Iconobj);
//                 state.favorites.splice(i, 1);
//             }


//         }

//     }
// })

// export default CategoryDisplaySlice.reducer;

// export const { FavoritesIcon } = CategoryDisplaySlice.actions