export interface UserProfile {
    id : string,
    name : string,
    phone: string,
    email : string,
    address : string,
    gender : "Male" | "Female"
}

export type StudentData = UserProfile;
export type TeacherData = UserProfile;