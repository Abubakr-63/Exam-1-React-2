import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
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

const initialUsers: User1[] = [
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
];

interface Store {
    data: User1[];
    originalData: User1[];
    deleteData: (id: number) => void;
    editData: (obj: User1) => void;
    addData: (obj: User1) => void;
    searchData: (value: string, status?: 'all' | 'active' | 'inactive') => void;
}

export const useData = create<Store>()((set) => ({
    data : initialUsers,
    originalData : initialUsers,
    deleteData : (id) => set((state) => {
        const originalData = state.originalData.filter((elem) => elem.id !== id);
        return { originalData, data: state.data.filter((elem) => elem.id !== id) };
    }),
    editData : (obj) => set((state) => {
        const map = (elem: User1) => elem.id === obj.id ? obj : elem;
        return { originalData: state.originalData.map(map), data: state.data.map(map) };
    }),
    addData : (obj) => set((state) => ({
        originalData: [...state.originalData, obj],
        data: [...state.data, obj]
    })),
    searchData: (value, status = 'all') => set((state) => ({
        data: state.originalData.filter((elem) => {
            const matchesName = elem.name.toLowerCase().includes(value.toLowerCase());
            const matchesStatus =
                status === 'all' ? true :
                status === 'active' ? elem.status === true :
                elem.status === false;
            return matchesName && matchesStatus;
        })
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
    addData2: (state, action: PayloadAction<User2>) => { return [...state, action.payload] },
    deleteData2 : (state, action: PayloadAction<number>) => {
       return state.filter((elem) => elem.id !== action.payload)
    },
    editData2 : (state, action: PayloadAction<User2>) => {
        return state.map((elem) => elem.id === action.payload.id ? action.payload : elem)
    }
  },
});

export const { addData2, deleteData2, editData2 } = Data2.actions;

export const store = configureStore({
  reducer: { data2: Data2.reducer },
});

export type RootState = ReturnType<typeof store.getState>;