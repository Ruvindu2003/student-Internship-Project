export interface InternshipPost {
  id: number;
  title: string;
  description: string;
  location: string;
  duration: string;
  createdById: number;
  createdByUsername: string;
}

export interface CreatePostRequest {
  title: string;
  description: string;
  location: string;
  duration: string;
}

export interface Application {
  id: number;
  studentId: number;
  postId: number;
  status: string;
  resumeLink: string;
}

export interface ApplyRequest {
  studentId: number;
  postId: number;
  resumeLink: string;
}