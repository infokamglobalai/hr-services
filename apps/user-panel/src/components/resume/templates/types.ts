export interface ResumeData {
  basics: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: {
    id: number;
    role: string;
    company: string;
    duration: string;
    desc: string;
  }[];
  education: {
    id: number;
    school: string;
    degree: string;
    year: string;
  }[];
  skills: string[];
}

export interface TemplateProps {
  data: ResumeData;
}
