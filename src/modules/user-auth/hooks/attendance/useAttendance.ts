import {collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../../../core/service/firebase";
import {getToday} from "../../utils/utils";
import {IAttendanceList} from "../../../core/types/AttendanceList";
import {IAttendanceEntry} from "../../../core/types/AttendanceEntry";

type useAttendanceReturn = {
    addUserToAttendanceList(timecode: string | null, userId: string): void
    removeUserFromAttendanceList(userId: string): void,
    checkTodayActiveCode(timecode: string): Promise<boolean>
}

export const useAttendance = (): useAttendanceReturn => {
    const attendanceListsRef = collection(db, 'attendance-lists');

    const addUserToAttendanceList = async (timecode: string | null, userId: string) => {
        // Get today's attendance list
        const today = getToday()
        const todayList = doc(attendanceListsRef, today);

        // If document does not exist, return
        const docSnap = await getDoc(todayList);
        if (!docSnap.exists()) return;

        const listData = docSnap.data() as IAttendanceList;

        // If active code does not match, return
        if (listData.activeCode.toString() !== timecode) return;

        // Create new attendance entry
        const newAttendanceEntry: IAttendanceEntry = {
            userId: userId,
            clockIn: new Date(),
            clockOut: null
        }

        // If user is already in attendance list, return
        if (listData.attendees.some(attendee => attendee.userId === userId)) return;

        // Add user to attendance list
        listData.attendees.push(newAttendanceEntry);

        await updateDoc(todayList, {"attendees": listData.attendees});
    }

    const removeUserFromAttendanceList = async (userId: string) => {
        // Get today's attendance list
        const today = getToday()
        const todayList = doc(attendanceListsRef, today);

        // If document does not exist, return
        const docSnap = await getDoc(todayList);
        if (!docSnap.exists()) return;

        const listData = docSnap.data() as IAttendanceList;

        // If user is not in attendance list, return
        if (!listData.attendees.some(attendee => attendee.userId === userId)) return;

        // Remove user from attendance list
        listData.attendees.forEach((attendee) => {
            if (attendee.userId === userId) {
                attendee.clockOut = new Date();
            }
        })

        await updateDoc(todayList, {"attendees": listData.attendees});
    }

    const checkTodayActiveCode = async (timecode: string): Promise<boolean> => {
        const today = getToday()
        const todayList = doc(attendanceListsRef, today);

        const docSnap = await getDoc(todayList);
        if (!docSnap.exists()) return false;

        const listData = docSnap.data() as IAttendanceList;

        return listData.activeCode.toString() === timecode;
    }

    return {
        addUserToAttendanceList,
        removeUserFromAttendanceList,
        checkTodayActiveCode
    };
}