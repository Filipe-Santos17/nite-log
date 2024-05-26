export interface IAttendanceList {
    listDate: Date;
    activeCode: string;
    attendees: Array<IAttendanceList>;
}