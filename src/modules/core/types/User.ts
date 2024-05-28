import {ISchedule} from "./Schedule";
import React from "react";

export interface IUser {
    userId: string;
    displayName: string;
    email: string;
    schedule: Array<ISchedule> | "not initialized"
}

export type UserContextType = {
    globalUser: IUser | null;
    setGlobalUser: React.Dispatch<React.SetStateAction<IUser>>;
}