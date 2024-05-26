import {ISchedule} from "./Schedule";

export interface IUser {
    userId: string;
    displayName: string;
    email: string;
    schedule: Array<ISchedule> | undefined
}