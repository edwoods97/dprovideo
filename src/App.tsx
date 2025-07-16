import React, { useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  Globe, 
  FileText, 
  Video,
  Scale,
  TrendingUp,
  Clock,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Eye,
  Download,
  Send,
  User,
  Building,
  CheckCircle,
  X,
  Save,
  Upload,
  PenTool,
  ArrowLeft,
  MoreVertical,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  Shield,
  Lock,
  EyeOff,
  Copy,
  Check,
  Link,
  UserPlus,
  PhoneOff,
  Monitor,
  Mic,
  MicOff,
  VideoOff,
  Camera
} from 'lucide-react';

export type ActiveTab = 
  | 'dashboard' 
  | 'clients' 
  | 'matters' 
  | 'trust' 
  | 'calendar' 
  | 'portal' 
  | 'documents' 
  | 'video';

// Types
interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company?: string;
  status: 'active' | 'inactive' | 'prospective';
  createdAt: Date;
  lastActivity: Date;
  totalBilled: number;
  outstandingBalance: number;
  avatar?: string;
}

interface Matter {
  id: string;
  clientId: string;
  title: string;
  description: string;
  type: 'litigation' | 'corporate' | 'real-estate' | 'family' | 'criminal' | 'other';
  status: 'active' | 'closed' | 'pending' | 'on-hold';
  attorney: string;
  startDate: Date;
  endDate?: Date;
  billingRate: number;
  totalTime: number;
  totalBilled: number;
  trustBalance: number;
}

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  type: 'appointment' | 'hearing' | 'deadline' | 'meeting';
  matterId?: string;
  clientId?: string;
  location?: string;
  attendees: string[];
}

// Sidebar Component
function Sidebar({ activeTab, onTabChange }: { activeTab: ActiveTab; onTabChange: (tab: ActiveTab) => void }) {
  const navigation = [
    { id: 'dashboard' as const, name: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients' as const, name: 'Clients', icon: Users },
    { id: 'matters' as const, name: 'Matters', icon: Briefcase },
    { id: 'trust' as const, name: 'Trust Accounting', icon: DollarSign },
    { id: 'calendar' as const, name: 'Calendar', icon: Calendar },
    { id: 'portal' as const, name: 'Client Portal', icon: Globe },
    { id: 'documents' as const, name: 'Documents', icon: FileText },
    { id: 'video' as const, name: 'Video Conference', icon: Video },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">LegalPro</h1>
            <p className="text-slate-300 text-sm">Practice Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <div>
            <p className="font-medium">Sarah Johnson</p>
            <p className="text-slate-400 text-sm">Senior Partner</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  const stats = [
    {
      name: 'Active Clients',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Open Matters',
      value: '89',
      change: '+5%',
      trend: 'up',
      icon: Briefcase,
      color: 'bg-green-500'
    },
    {
      name: 'Trust Balance',
      value: '$1.2M',
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-yellow-500'
    },
    {
      name: 'This Month Revenue',
      value: '$85,430',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New client consultation scheduled', time: '2 hours ago', type: 'calendar' },
    { id: 2, action: 'Trust deposit processed for Matter #2023-45', time: '4 hours ago', type: 'trust' },
    { id: 3, action: 'Document signed by client John Doe', time: '6 hours ago', type: 'document' },
    { id: 4, action: 'Court hearing reminder for tomorrow', time: '1 day ago', type: 'reminder' },
    { id: 5, action: 'Invoice #2024-001 sent to client', time: '2 days ago', type: 'billing' }
  ];

  const upcomingDeadlines = [
    { id: 1, title: 'Discovery deadline', matter: 'Smith v. Johnson', date: 'Today, 5:00 PM', urgent: true },
    { id: 2, title: 'Court filing due', matter: 'Estate of Brown', date: 'Tomorrow, 11:59 PM', urgent: false },
    { id: 3, title: 'Client meeting', matter: 'Corporate Merger', date: 'Dec 15, 2:00 PM', urgent: false }
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-2">Welcome back, here's what's happening at your practice today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-green-600">{stat.change}</span>
                      <span className="text-sm text-slate-500 ml-1">from last month</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Deadlines</h3>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center justify-between p-4 rounded-lg border border-slate-200">
                    <div className="flex items-center space-x-3">
                      {deadline.urgent ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      )}
                      <div>
                        <p className="font-medium text-slate-900">{deadline.title}</p>
                        <p className="text-sm text-slate-600">{deadline.matter}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${deadline.urgent ? 'text-red-600' : 'text-slate-600'}`}>
                        {deadline.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-colors">
              <Users className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">Add Client</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-green-500 hover:bg-green-50 transition-colors">
              <Briefcase className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">New Matter</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-yellow-500 hover:bg-yellow-50 transition-colors">
              <Calendar className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">Schedule Event</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <FileText className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">Upload Document</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple placeholder components for other tabs
function ClientManagement() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Client Management</h1>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Client Management System</h3>
          <p className="text-slate-600">Manage your client relationships and information</p>
        </div>
      </div>
    </div>
  );
}

function MatterManagement() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Matter Management</h1>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <Briefcase className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Matter Management System</h3>
          <p className="text-slate-600">Track and manage all legal matters and cases</p>
        </div>
      </div>
    </div>
  );
}

function TrustAccounting() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Trust Accounting</h1>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <DollarSign className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Trust Accounting System</h3>
          <p className="text-slate-600">Monitor and manage client trust account transactions</p>
        </div>
      </div>
    </div>
  );
}

function CalendarView() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Calendar</h1>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Calendar System</h3>
          <p className="text-slate-600">Manage appointments, hearings, and deadlines</p>
        </div>
      </div>
    </div>
  );
}

function ClientPortal() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Client Portal</h1>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <Globe className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Client Portal</h3>
          <p className="text-slate-600">Secure collaboration platform for clients</p>
        </div>
      </div>
    </div>
  );
}

function DocumentCenter() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Document Center</h1>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Document Management</h3>
          <p className="text-slate-600">Manage documents, signatures, and file sharing</p>
        </div>
      </div>
    </div>
  );
}

function VideoConferencing() {
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const handleStartMeeting = () => {
    setIsInCall(true);
  };

  const handleEndCall = () => {
    setIsInCall(false);
  };

  if (isInCall) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-xl overflow-hidden min-h-[600px]">
            {/* Meeting Header */}
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white font-semibold">Video Meeting</h2>
                  <p className="text-slate-300 text-sm">Meeting ID: DEMO-123</p>
                </div>
                <div className="flex items-center space-x-4 text-slate-300 text-sm">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>2</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>00:05:23</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Area */}
            <div className="relative aspect-video bg-slate-800">
              <div className="absolute inset-0">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                      <User className="h-12 w-12 text-white" />
                    </div>
                    <p className="text-white text-xl font-medium">You</p>
                  </div>
                </div>
                
                {/* Remote participant */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-slate-600 rounded-lg">
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <User className="h-6 w-6 text-white mx-auto mb-1" />
                      <p className="text-white text-xs">Client</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="p-6 bg-slate-900">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3 rounded-full ${isMicOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-600 hover:bg-red-700'} transition-colors`}
                >
                  {isMicOn ? <Mic className="h-6 w-6 text-white" /> : <MicOff className="h-6 w-6 text-white" />}
                </button>
                
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full ${isVideoOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-600 hover:bg-red-700'} transition-colors`}
                >
                  {isVideoOn ? <Video className="h-6 w-6 text-white" /> : <VideoOff className="h-6 w-6 text-white" />}
                </button>

                <button className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors">
                  <Monitor className="h-6 w-6 text-white" />
                </button>

                <button className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors">
                  <MessageSquare className="h-6 w-6 text-white" />
                </button>

                <button
                  onClick={handleEndCall}
                  className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <PhoneOff className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Video Conferencing</h1>
            <p className="text-slate-600 mt-2">Secure video meetings and client consultations</p>
          </div>
          <button 
            onClick={handleStartMeeting}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Video className="h-5 w-5" />
            <span>Start Meeting</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
          <Video className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 mb-2">Video Conferencing System</h3>
          <p className="text-slate-600 mb-6">Secure video meetings and client consultations</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <button 
              onClick={handleStartMeeting}
              className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <Video className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">Start Instant Meeting</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-green-500 hover:bg-green-50 transition-colors">
              <Calendar className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">Schedule Meeting</span>
            </button>
            <button className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-purple-500 hover:bg-purple-50 transition-colors">
              <Users className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">Join Meeting</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Meeting Join Route Component
function MeetingJoinRoute() {
  const { meetingId } = useParams<{ meetingId: string }>();
  
  const handleJoinMeeting = (displayName: string, email: string) => {
    console.log('Joining meeting:', meetingId, displayName, email);
    alert(`Joining meeting ${meetingId} as ${displayName}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Video className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Join Meeting</h1>
          <p className="text-slate-300">You've been invited to a secure video meeting</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Legal Consultation Meeting</h2>
            <div className="space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Hosted by Sarah Johnson, Esq.</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Johnson & Associates Law Firm</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Your Name *</label>
              <input
                type="text"
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
              <input
                type="email"
                className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>

            <button
              onClick={() => handleJoinMeeting('Demo User', 'demo@example.com')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all flex items-center justify-center space-x-2"
            >
              <Video className="h-5 w-5" />
              <span>Join Meeting</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function MainApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientManagement />;
      case 'matters':
        return <MatterManagement />;
      case 'trust':
        return <TrustAccounting />;
      case 'calendar':
        return <CalendarView />;
      case 'portal':
        return <ClientPortal />;
      case 'documents':
        return <DocumentCenter />;
      case 'video':
        return <VideoConferencing />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
}

// Root App with Routing
function App() {
  return (
    <Routes>
      <Route path="/meeting/:meetingId" element={<MeetingJoinRoute />} />
      <Route path="/*" element={<MainApp />} />
    </Routes>
  );
}

export default App;
