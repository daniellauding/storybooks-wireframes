import { Client, Project, Flow } from '@/types';

// Mock data - replace with database later
export const mockClients: Client[] = [
  {
    id: 'stadkjakten',
    name: 'Städkjakten',
    description: 'Cleaning service booking platform wireframes',
    projects: [],
    createdAt: new Date('2024-12-23'),
    updatedAt: new Date('2024-12-23'),
    passwordProtected: false
  },
  {
    id: 'client-1',
    name: 'Acme Corp',
    description: 'E-commerce platform wireframes',
    projects: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    passwordProtected: false
  },
  {
    id: 'client-2',
    name: 'TechStart Inc',
    description: 'SaaS dashboard concepts',
    projects: [],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    passwordProtected: true
  },
  {
    id: 'client-3',
    name: 'DesignCo',
    description: 'Mobile app wireframes',
    projects: [],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    passwordProtected: false
  }
];

export const mockProjects: Project[] = [
  {
    id: 'booking-flow',
    clientId: 'stadkjakten',
    name: 'Booking Flow',
    description: 'Complete cleaning service booking wireframes',
    flows: [],
    wireframes: [],
    createdAt: new Date('2024-12-23'),
    updatedAt: new Date('2024-12-23'),
    passwordProtected: false
  },
  {
    id: 'project-1',
    clientId: 'client-1',
    name: 'Checkout Flow',
    description: 'Complete checkout process wireframes',
    flows: [],
    wireframes: [],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    passwordProtected: false
  },
  {
    id: 'project-2',
    clientId: 'client-1',
    name: 'Product Catalog',
    description: 'Product listing and detail pages',
    flows: [],
    wireframes: [],
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
    passwordProtected: false
  },
  {
    id: 'project-3',
    clientId: 'client-2',
    name: 'Admin Dashboard',
    description: 'Analytics and management dashboard',
    flows: [],
    wireframes: [],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    passwordProtected: true
  }
];

export const mockFlows: Flow[] = [
  {
    id: 'booking-start',
    projectId: 'booking-flow',
    name: 'Booking Start',
    description: 'Landing page with search and initial booking flow',
    wireframes: [],
    createdAt: new Date('2024-12-23'),
    updatedAt: new Date('2024-12-23')
  },
  {
    id: 'flow-1',
    projectId: 'project-1',
    name: 'Cart to Payment',
    description: 'User journey from cart to payment confirmation',
    wireframes: [],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'flow-2',
    projectId: 'project-1',
    name: 'Guest Checkout',
    description: 'Checkout flow for non-registered users',
    wireframes: [],
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  }
];

export async function getClients(): Promise<Client[]> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const clientsWithProjects = mockClients.map(client => ({
        ...client,
        projects: mockProjects.filter(p => p.clientId === client.id)
      }));
      resolve(clientsWithProjects);
    }, 100);
  });
}

export async function getClient(id: string): Promise<Client | null> {
  const clients = await getClients();
  return clients.find(c => c.id === id) || null;
}

export async function getProject(id: string): Promise<Project | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const project = mockProjects.find(p => p.id === id);
      if (project) {
        const projectWithFlows = {
          ...project,
          flows: mockFlows.filter(f => f.projectId === project.id)
        };
        resolve(projectWithFlows);
      } else {
        resolve(null);
      }
    }, 100);
  });
}

export async function getFlow(id: string): Promise<Flow | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFlows.find(f => f.id === id) || null);
    }, 100);
  });
}