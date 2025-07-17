import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ClientManagement } from './components/ClientManagement';
import { MatterManagement } from './components/MatterManagement';
import { TrustAccounting } from './components/TrustAccounting';
import { Calendar } from './components/Calendar';
import { PortalWrapper } from './components/PortalWrapper';
import { DocumentCenter } from './components/DocumentCenter';
import { VideoConferencing } from './components/VideoConferencing';
import { MeetingJoinPage } from './components/modals/MeetingJoinPage';

export type ActiveTab = 'dashboard' | 'clients' | 'matters' | 'trust' | 'calendar' | 'portal' | 'documents' | 'video';

function MeetingRoute() {
  const { meetingId } = useParams<{ meetingId: string }>();
  
  const handleJoinMeeting = (displayName: string, email: string) => {
    console.log('Joining meeting:', meetingId, displayName, email);
    // In a real app, this would connect to the actual meeting
    alert(`Joining meeting ${meetingId} as ${displayName}`);
  };

  return (
    <MeetingJoinPage
      meetingId={meetingId || 'DEMO-123'}
      onJoinMeeting={handleJoinMeeting}
    />
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  return (
    <Routes>
      <Route path="/meeting/:meetingId" element={<MeetingRoute />} />
      <Route path="/*" element={
        <div className="flex h-screen bg-slate-100">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 overflow-auto">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'clients' && <ClientManagement />}
            {activeTab === 'matters' && <MatterManagement />}
            {activeTab === 'trust' && <TrustAccounting />}
            {activeTab === 'calendar' && <Calendar />}
            {activeTab === 'portal' && <PortalWrapper />}
            {activeTab === 'documents' && <DocumentCenter />}
            {activeTab === 'video' && <VideoConferencing />}
          </main>
        </div>
      } />
    </Routes>
  );
}

export default App;

