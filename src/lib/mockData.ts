import { addDays, subHours, addHours, subDays } from 'date-fns';

const now = new Date();

export type Priority = 'P1' | 'P2' | 'P3';
export type ApprovalState = 'pending' | 'approved' | 'rejected' | 'delegated';

export interface Approval {
  id: string;
  title: string;
  amount?: string;
  requester: {
    name: string;
    avatar: string;
    dept: string;
  };
  step: number;
  totalSteps: number;
  priority: Priority;
  dueAt: Date;
  submittedAt: Date;
  state: ApprovalState;
  relatedControl?: string;
  type: string;
}

export const mockApprovals: Approval[] = [
  {
    id: 'APP-1042',
    title: 'CapEx: Data center cooling upgrade',
    amount: 'IDR 1.8B',
    requester: { name: 'Arief Budi', avatar: 'AB', dept: 'Infrastructure' },
    step: 2,
    totalSteps: 4,
    priority: 'P1',
    dueAt: subHours(now, 1), // Overdue
    submittedAt: subDays(now, 2),
    state: 'pending',
    type: 'CapEx',
  },
  {
    id: 'APP-1045',
    title: 'Elevated access: Prod DB read-write',
    requester: { name: 'R. Pratama', avatar: 'RP', dept: 'Engineering' },
    step: 1,
    totalSteps: 2,
    priority: 'P1',
    dueAt: addHours(now, 2),
    submittedAt: subHours(now, 5),
    state: 'pending',
    relatedControl: 'SOC2 CC6.1',
    type: 'Access',
  },
  {
    id: 'APP-1050',
    title: 'Vendor onboarding: CloudSecure Ltd.',
    requester: { name: 'Siti Aminah', avatar: 'SA', dept: 'Procurement' },
    step: 3,
    totalSteps: 3,
    priority: 'P2',
    dueAt: addDays(now, 1),
    submittedAt: subDays(now, 4),
    state: 'pending',
    relatedControl: 'ISO27001 A.15',
    type: 'Vendor',
  },
  {
    id: 'APP-1051',
    title: 'Offboarding: Finance Analyst',
    requester: { name: 'HR Ops', avatar: 'HR', dept: 'Human Resources' },
    step: 4,
    totalSteps: 5,
    priority: 'P3',
    dueAt: addDays(now, 2),
    submittedAt: subDays(now, 1),
    state: 'pending',
    type: 'HR',
  },
  {
    id: 'APP-1052',
    title: 'Software License: Figma Enterprise',
    requester: { name: 'Design Team', avatar: 'DT', dept: 'Design' },
    step: 1,
    totalSteps: 1,
    priority: 'P3',
    dueAt: addDays(now, 3),
    submittedAt: subHours(now, 2),
    state: 'pending',
    type: 'Software',
  },
];

export interface Control {
  id: string;
  title: string;
  expiresAt: Date;
  status: 'healthy' | 'warning' | 'breached';
}

export const mockControls: Control[] = [
  {
    id: 'CTRL-01',
    title: 'SOC2 CC6.1 Quarterly Access Review',
    expiresAt: addDays(now, 25),
    status: 'warning',
  },
  {
    id: 'CTRL-02',
    title: 'ISO27001 A.9 Access Control Policy',
    expiresAt: addDays(now, 45),
    status: 'healthy',
  },
  {
    id: 'CTRL-03',
    title: 'Figma Enterprise license entitlement',
    expiresAt: addDays(now, 12),
    status: 'warning',
  },
  {
    id: 'CTRL-04',
    title: 'AWS vendor SLA 99.95%',
    expiresAt: addDays(now, 90),
    status: 'healthy',
  },
  {
    id: 'CTRL-05',
    title: 'DPIA: Customer Analytics',
    expiresAt: subDays(now, 2), // Breached
    status: 'breached',
  },
];

export interface Schedule {
  id: string;
  title: string;
  cron: string;
  readable: string;
  status: 'active' | 'paused' | 'failed';
  lastRun?: Date;
  nextRun?: Date;
}

export const mockSchedules: Schedule[] = [
  {
    id: 'SCH-01',
    title: 'Nightly data integrity check',
    cron: '0 0 * * *',
    readable: 'Every day at 12:00 AM',
    status: 'active',
    lastRun: subHours(now, 12),
    nextRun: addHours(now, 12),
  },
  {
    id: 'SCH-02',
    title: 'Weekly ERP reconciliation',
    cron: '0 6 * * MON',
    readable: 'Every Monday at 6:00 AM',
    status: 'paused',
  },
  {
    id: 'SCH-03',
    title: 'SAP unpaid invoice > 30d (Webhook)',
    cron: 'Webhook',
    readable: 'Triggered by external event',
    status: 'failed',
    lastRun: subHours(now, 2),
  },
];
