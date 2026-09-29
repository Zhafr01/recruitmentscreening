import React from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './features/dashboard/Dashboard';
import { ToastProvider } from './components/Toast';
import { useDashboardStore } from './lib/store';

// Legacy components
import PendingApprovals from './components/PendingApprovals';
import MyRequests from './components/MyRequests';
import ControlsRegistry from './components/ControlsRegistry';
import CronSchedules from './components/CronSchedules';
import SLAReports from './components/SLAReports';
import AuditTrail from './components/AuditTrail';
import WorkflowCatalog from './components/WorkflowCatalog';
import NotificationsPage from './components/NotificationsPage';

function App() {
  const { activePage } = useDashboardStore();

  const renderPage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Approvals':
        return <PendingApprovals />;
      case 'My Requests':
        return <MyRequests />;
      case 'Controls':
        return <ControlsRegistry />;
      case 'Automations':
        return <CronSchedules />;
      case 'Reports':
        return <SLAReports />;
      case 'Audit Trail':
        return <AuditTrail />;
      case 'Workflow Catalog':
        return <WorkflowCatalog />;
      case 'Notifications':
        return <NotificationsPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-2">{activePage}</h2>
            <p className="text-text-muted">This page is currently under construction in the prototype.</p>
          </div>
        );
    }
  };

  return (
    <ToastProvider>
      <Layout>
        {renderPage()}
      </Layout>
    </ToastProvider>
  );
}

export default App;
