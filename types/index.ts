export interface Client {
  id: string;
  name: string;
  description?: string;
  projects: Project[];
  createdAt: Date;
  updatedAt: Date;
  passwordProtected?: boolean;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  flows: Flow[];
  wireframes: Wireframe[];
  createdAt: Date;
  updatedAt: Date;
  passwordProtected?: boolean;
}

export interface Flow {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  wireframes: Wireframe[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Wireframe {
  id: string;
  name: string;
  description?: string;
  componentPath?: string;
  variant?: string;
  createdAt: Date;
  updatedAt: Date;
}