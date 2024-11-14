export interface Hero {
  id: number;
  logo: string;
  title: string;
  image: string;
}

export interface About {
  id: number;
  video: string;
}

export interface AboutUs {
  id: number;
  title: string;
  location: string;
  number: string;
  email: string;
  image: string;
}

export interface ContactUs {
  id: number;
  image: string;
}

export interface Tech {
  id: number;
  images: string;
}

export interface Review {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  Titledescription: string;
  BenifitsDescription: string;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface ProjectCategory {
  id: number;
  name: string;
  image: string;
}

export interface ProjectImage {
  id: number;
  project_id: number;
  images: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  mainimage: string;
  logoimage: string;
  video: string;
  sub_title: string;
  docs: string;
  categories: ProjectCategory;
  images: ProjectImage[];
}

export class Client {
  id: number = 0;
  name: string;
  role: string;
  image: string = '';
}
