import { axiosInstance } from "./axios";

interface SignupData {
  fullName: string;
  dob: string;
  email: string;
}

interface GoogleData {
  fullName: string;
  email: string;
  dob: string;
}

interface SigninData {
  email: string;
  otp: string;
  keepMeLoggedIn: boolean;
}

interface NoteData {
  userId: string;
  title: string;
  content: string;
}

interface Response {
  success: boolean;
  message: string;
}

interface User {
  _id: string;
  fullName: string;
  email: string;
  dob: string;
}

interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NoteResponse {
  success: boolean;
  notes: Note[];
}

interface AuthResponse {
  success: boolean;
  user: User;
}

interface GetOtpData extends SignupData {
  otp: string;
}

export const getAuthUser = async (): Promise<AuthResponse | null> => {
  try {
    const res = await axiosInstance.get<AuthResponse>("/auth/me");
    return res.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const signup = async (signupData: SignupData): Promise<Response> => {
  const response = await axiosInstance.post<Response>(
    "/auth/signup",
    signupData
  );
  return response.data;
};

export const googlesignin = async (googleData: GoogleData): Promise<Response> => {
  const response = await axiosInstance.post<Response>(
    "/auth/googlesignin",
    googleData
  );
  return response.data;
};

export const sendOtp = async (email: string): Promise<Response> => {
  const response = await axiosInstance.post<Response>("/auth/sendotp", {
    email,
  });
  return response.data;
};

export const getOtp = async (data: GetOtpData): Promise<Response> => {
  const response = await axiosInstance.post<Response>("/auth/getotp", data);
  return response.data;
};

export const signin = async (signinData: SigninData): Promise<Response> => {
  const response = await axiosInstance.post<Response>(
    "/auth/signin",
    signinData
  );
  return response.data;
};

export const signout = async (): Promise<Response> => {
  const response = await axiosInstance.post<Response>("/auth/signout");
  return response.data;
};

export const createNote = async (noteData: NoteData): Promise<Response> => {
  const response = await axiosInstance.post<Response>(
    "/note/create",
    noteData
  );
  return response.data;
};

export const getNotes = async (): Promise<NoteResponse> => {
  const response = await axiosInstance.get<NoteResponse>("/note/get");
  return response.data;
}

export const deleteNote = async (noteId: string): Promise<Response> => {
  const response = await axiosInstance.delete<Response>(`/note/${noteId}`);
  return response.data;
}
