import { configureStore, createSlice } from "@reduxjs/toolkit";
import { create } from "zustand";

interface User1 {
    id : number,
    name : string,
    status : boolean,
    job : string
}
interface User2 {
    id : number,
    age : string,
    surname : string,
    city : string
}

interface Store {
    data: User1[];
    deleteData: (id: number) => void;
    editData: (obj: User1) => void;
    addData: (obj: User1) => void;
    searchData: (value: string) => void;
}

export const useData = create<Store>()((set) => ({
    data : [
        {
            id : 1,
            name : "Abubakr",
            status : true,
            job : "Frontend"
        },
        {
            id : 2,
            name : "Umar",
            status : false,
            job : "Backend"
        },
        {
            id : 3,
            name : "Ehson",
            status : true,
            job : "Mobile Developer"
        }
    ],
    deleteData : (id:number) => set((state) => ({data : state.data.filter((elem:User1) => elem.id !== id)})),
    editData : (obj:User1) => set((state) => ({
        data : state.data.map((elem) => {
        if(elem.id == obj.id){
            return obj
        }
        return elem;
    })})),
    addData : (obj:User1) => set((state) => ({data : [...state.data, obj]})),
    searchData: (value) => set((state) => ({
    data: state.data.filter((elem) => elem.name.toLowerCase().includes(value.toLowerCase()))
}))
}))


//Redux
const Data2 = createSlice({
  name: 'data2',
  initialState: [
        {
            id : 1,
            age : '16',
            surname: 'Qurbonov',
            city : "Dushanbe",
        },
        {
            id : 2,
            age : '15',
            surname : 'Rajabov',
            city : "Kulob",
        },
        {
            id : 3,
            age : '14',
            surname : 'Kudratov',
            city : "Rudaki",
        }
  ] as User2[],
  reducers: {
    addData2: (state, action) => {return [...state, action.payload]},
    deleteData2 : (state, action) => {
       return state.filter((elem:User2) => elem.id !== action.payload)
    },
    editData2 : (state, action) => {
        return state.map((elem:User2) => {
        if(elem.id == action.payload.id){
            return action.payload
        }
        return elem;
    })}
  },
});

export const { addData2, deleteData2, editData2 } = Data2.actions;

export const store = configureStore({
  reducer: { data2: Data2.reducer },
});

export type RootState = ReturnType<typeof store.getState>;