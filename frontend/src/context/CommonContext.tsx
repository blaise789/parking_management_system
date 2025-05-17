import { IParkingSlot, IMeta } from "@/types";
import { Dispatch } from "@reduxjs/toolkit";
import { createContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CommonContext = createContext<any>({})
export const CommonProvider = ({ children }: any) => {
    const [showSidebar, setShowSidebar] = useState(false)
    const [parkingSlots, setParkingSlots] = useState<IParkingSlot[]>([])
    const [meta, setMeta] = useState<IMeta>({
        total: 0,
        lastPage: 0,
        currentPage: 0,
        perPage: 0,
        prev: 0,
        next: 0
    });
    const userSlice = useSelector((state: any) => state.authReducer)
    const dispatch: Dispatch = useDispatch();
    // console.log(userSlice)
    console.log(userSlice.user)
    const isLoggedIn: boolean = userSlice.isLoggedIn;
    console.log(isLoggedIn)
    return (
        <CommonContext.Provider value={{
            showSidebar,
            setShowSidebar, 
            dispatch,
            isLoggedIn,
            user: userSlice.user,
            parkingSlots,
            setParkingSlots,
            meta,
            setMeta
        }}>
            {children}
        </CommonContext.Provider>
    )
}