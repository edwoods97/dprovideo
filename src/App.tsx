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
  User,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Monitor,
  MessageSquare,
  X,
  Send,
  Copy,
  Mail,
  Search,
  Filter,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Save,
  Building,
  CheckCircle,
  TrendingDown,
  Download,
  Eye,
  Shield
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

interface TrustTransaction {
  id: string;
  matterId: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  description: string;
  date: Date;
  checkNumber?: string;
  balance: number;
  status: 'pending' | 'cleared' | 'rejected';
}

// Meeting Join Route Component - MOVED TO TOP
function MeetingJoinRoute() {
  const { meetingId } = useParams<{ meetingId: string }>();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  
  const handleJoinMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!displayName.trim() || !email.trim()) {
      alert('Please enter your name and email address');
      return;
    }

    setIsJoining(true);
    
    // Simulate joining process
    setTimeout(() => {
      alert(`Successfully joined meeting ${meetingId} as ${displayName}`);
      setIsJoining(false);
    }, 2000);
  };

  if (isJoining) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Joining Meeting...</h2>
          <p className="text-slate-600 mb-4">Please wait while we connect you to the meeting.</p>
          <div className="bg-slate-50 p-3 rounded-lg">
            <p className="text-sm text-slate-700">
              <strong>Joining as:</strong> {displayName}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
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
          <p className="text-slate-300">Meeting ID: {meetingId}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
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

          <form onSubmit={handleJoinMeeting} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Your Name *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <Shield className="h-4 w-4" />
                <span>Meeting ID: {meetingId}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all flex items-center justify-center space-x-2"
            >
              <Video className="h-5 w-5" />
              <span>Join Meeting</span>
            </button>
          </form>
        </div>

        {/* Security Notice */}
        <div className="text-center">
          <div className="bg-slate-800 rounded-xl p-4">
            <h3 className="text-white font-medium mb-2">Secure & Confidential</h3>
            <div className="text-slate-300 text-sm space-y-1">
              <p>🔒 End-to-end encrypted</p>
              <p>🛡️ Attorney-client privilege protected</p>
              <p>📱 No software installation required</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      name: 'Open Matters',
      value: '89',
      change: '+5%',
      icon: Briefcase,
      color: 'bg-green-500'
    },
    {
      name: 'Trust Balance',
      value: '$1.2M',
      change: '+8%',
      icon: DollarSign,
      color: 'bg-yellow-500'
    },
    {
      name: 'This Month Revenue',
      value: '$85,430',
      change: '+15%',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    { id: 1, action: 'New client consultation scheduled', time: '2 hours ago' },
    { id: 2, action: 'Trust deposit processed for Matter #2023-45', time: '4 hours ago' },
    { id: 3, action: 'Document signed by client John Doe', time: '6 hours ago' },
    { id: 4, action: 'Court hearing reminder for tomorrow', time: '1 day ago' },
    { id: 5, action: 'Invoice #2024-001 sent to client', time: '2 days ago' }
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

// Full Client Management Component
function ClientManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEditClient, setShowEditClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      address: '123 Main St, New York, NY 10001',
      company: 'Smith Industries',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastActivity: new Date('2024-12-09'),
      totalBilled: 45000,
      outstandingBalance: 0
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 987-6543',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      status: 'active',
      createdAt: new Date('2024-02-20'),
      lastActivity: new Date('2024-12-07'),
      totalBilled: 28500,
      outstandingBalance: 5000
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'mbrown@email.com',
      phone: '(555) 456-7890',
      address: '789 Pine St, Chicago, IL 60601',
      company: 'Brown & Associates',
      status: 'prospective',
      createdAt: new Date('2024-12-01'),
      lastActivity: new Date('2024-12-04'),
      totalBilled: 0,
      outstandingBalance: 0
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    status: 'prospective' as Client['status']
  });

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || client.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'prospective': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      company: '',
      status: 'prospective'
    });
  };

  const handleAddClient = () => {
    setShowAddClient(true);
    resetForm();
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address,
      company: client.company || '',
      status: client.status
    });
    setShowEditClient(true);
  };

  const handleSaveClient = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    const newClient: Client = {
      id: showEditClient ? selectedClient!.id : Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      company: formData.company || undefined,
      status: formData.status,
      createdAt: showEditClient ? selectedClient!.createdAt : new Date(),
      lastActivity: new Date(),
      totalBilled: showEditClient ? selectedClient!.totalBilled : 0,
      outstandingBalance: showEditClient ? selectedClient!.outstandingBalance : 0
    };

    if (showEditClient) {
      setClients(clients.map(client => 
        client.id === selectedClient!.id ? newClient : client
      ));
      setShowEditClient(false);
    } else {
      setClients([...clients, newClient]);
      setShowAddClient(false);
    }

    resetForm();
    setSelectedClient(null);
  };

  const closeModals = () => {
    setShowAddClient(false);
    setShowEditClient(false);
    setSelectedClient(null);
    resetForm();
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Client Management</h1>
            <p className="text-slate-600 mt-2">Manage your client relationships and information</p>
          </div>
          <button 
            onClick={handleAddClient}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="h-5 w-5" />
            <span>Add Client</span>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="all">All Clients</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="prospective">Prospective</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div 
              key={client.id} 
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{client.name}</h3>
                    {client.company && <p className="text-sm text-slate-600">{client.company}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                    {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-sm text-slate-600">
                  <Mail className="h-4 w-4" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-600">
                  <Phone className="h-4 w-4" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span>{client.address}</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500">Total Billed</p>
                    <p className="font-semibold text-slate-900">${client.totalBilled.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Outstanding</p>
                    <p className={`font-semibold ${client.outstandingBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ${client.outstandingBalance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-500">
                  Last activity: {client.lastActivity.toLocaleDateString()}
                </p>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleEditClient(client)}
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Edit Client"
                  >
                    <Edit className="h-4 w-4 text-blue-500" />
                  </button>
                  <button 
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Delete Client"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Client Modal */}
        {(showAddClient || showEditClient) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {showEditClient ? 'Edit Client' : 'Add New Client'}
                  </h2>
                  <button 
                    onClick={closeModals}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Company name (optional)"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-slate-400 h-5 w-5" />
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter full address"
                      rows={3}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Client Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as Client['status']})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="prospective">Prospective</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 flex items-center justify-end space-x-4">
                <button
                  onClick={closeModals}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveClient}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>{showEditClient ? 'Update Client' : 'Add Client'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Full Matter Management Component
function MatterManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockMatters: Matter[] = [
    {
      id: 'M-2024-001',
      clientId: '1',
      title: 'Smith Industries Contract Review',
      description: 'Review and negotiate master service agreement with new vendor',
      type: 'corporate',
      status: 'active',
      attorney: 'Sarah Johnson',
      startDate: new Date('2024-01-14'),
      billingRate: 450,
      totalTime: 25.5,
      totalBilled: 11475,
      trustBalance: 5000
    },
    {
      id: 'M-2024-002',
      clientId: '2',
      title: 'Johnson Estate Planning',
      description: 'Complete estate planning package including will, trust, and powers of attorney',
      type: 'family',
      status: 'active',
      attorney: 'Michael Davis',
      startDate: new Date('2024-02-01'),
      billingRate: 350,
      totalTime: 18.0,
      totalBilled: 6300,
      trustBalance: 2500
    }
  ];

  const filteredMatters = mockMatters.filter(matter => {
    const matchesSearch = matter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         matter.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || matter.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Matter['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: Matter['type']) => {
    switch (type) {
      case 'litigation': return 'bg-red-100 text-red-800';
      case 'corporate': return 'bg-blue-100 text-blue-800';
      case 'real-estate': return 'bg-green-100 text-green-800';
      case 'family': return 'bg-purple-100 text-purple-800';
      case 'criminal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Matter Management</h1>
            <p className="text-slate-600 mt-2">Track and manage all legal matters and cases</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Matter</span>
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search matters by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="on-hold">On Hold</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Matters List */}
        <div className="space-y-6">
          {filteredMatters.map((matter) => (
            <div key={matter.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-900">{matter.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(matter.status)}`}>
                      {matter.status.charAt(0).toUpperCase() + matter.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(matter.type)}`}>
                      {matter.type.charAt(0).toUpperCase() + matter.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-3">{matter.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">Matter ID:</span>
                      <span>{matter.id}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{matter.attorney}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Started {matter.startDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="h-5 w-5 text-slate-500" />
                  </div>
                  <p className="text-sm text-slate-500">Total Hours</p>
                  <p className="text-lg font-semibold text-slate-900">{matter.totalTime}</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-5 w-5 text-slate-500" />
                  </div>
                  <p className="text-sm text-slate-500">Total Billed</p>
                  <p className="text-lg font-semibold text-slate-900">${matter.totalBilled.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Briefcase className="h-5 w-5 text-slate-500" />
                  </div>
                  <p className="text-sm text-slate-500">Billing Rate</p>
                  <p className="text-lg font-semibold text-slate-900">${matter.billingRate}/hr</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-5 w-5 text-green-500" />
                  </div>
                  <p className="text-sm text-slate-500">Trust Balance</p>
                  <p className="text-lg font-semibold text-green-600">${matter.trustBalance.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <div className="text-sm text-slate-500">
                  Last updated: 7/16/2025
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg flex items-center space-x-2">
                    <Eye className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <Edit className="h-4 w-4 text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg">
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Full Trust Accounting Component
function TrustAccounting() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockTransactions: TrustTransaction[] = [
    {
      id: '1',
      matterId: 'M-2024-001',
      type: 'deposit',
      amount: 5000,
      description: 'Initial retainer deposit for Smith Industries...',
      date: new Date('2024-11-30'),
      checkNumber: '1234',
      balance: 5000,
      status: 'cleared'
    }
  ];

  const totalTrustBalance = 6000;
  const pendingDeposits = 15000;
  const monthlyDeposits = 0;
  const monthlyWithdrawals = 0;

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.matterId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || transaction.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: TrustTransaction['status']) => {
    switch (status) {
      case 'cleared': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'rejected': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Trust Accounting</h1>
            <p className="text-slate-600 mt-2">Monitor and manage client trust account transactions</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Export Report</span>
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Trust Transfer</span>
            </button>
          </div>
        </div>

        {/* Trust Balance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Trust Balance</p>
                <p className="text-2xl font-bold text-slate-900 mt-2">${totalTrustBalance.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Deposits</p>
                <p className="text-2xl font-bold text-yellow-600 mt-2">${pendingDeposits.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">This Month - Deposits</p>
                <p className="text-2xl font-bold text-green-600 mt-2">${monthlyDeposits.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">This Month - Withdrawals</p>
                <p className="text-2xl font-bold text-red-600 mt-2">${monthlyWithdrawals.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingDown className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search transactions by description or matter ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="pl-10 pr-8 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Transactions</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
                <option value="transfer">Transfers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Matter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {transaction.date.toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {transaction.matterId}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 max-w-xs truncate">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        transaction.type === 'deposit' 
                          ? 'bg-green-100 text-green-800'
                          : transaction.type === 'withdrawal'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      ${transaction.balance.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <span className="text-sm text-slate-600 capitalize">{transaction.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Full Calendar Component
function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 16)); // July 16, 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 6, 16));

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthYearText = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Calendar</h1>
            <p className="text-slate-600 mt-2">Manage appointments, hearings, and deadlines</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Event</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900">{monthYearText}</h2>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <span className="sr-only">Previous month</span>
                    ←
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg">
                    <span className="sr-only">Next month</span>
                    →
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="p-6">
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-3 text-center text-sm font-medium text-slate-500">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {emptyDays.map(day => (
                    <div key={`empty-${day}`} className="p-3 h-24"></div>
                  ))}
                  {days.map(day => {
                    const isSelected = selectedDate.getDate() === day && 
                                     selectedDate.getMonth() === currentDate.getMonth() &&
                                     selectedDate.getFullYear() === currentDate.getFullYear();
                    const isToday = day === 16; // July 16 is highlighted

                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                        className={`p-3 h-24 text-left border rounded-lg hover:bg-slate-50 transition-colors ${
                          isSelected ? 'bg-blue-50 border-blue-200' : 'border-slate-200'
                        } ${isToday ? 'bg-blue-100' : ''}`}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          isToday ? 'text-blue-600' : 'text-slate-900'
                        }`}>
                          {day}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Events Sidebar */}
          <div className="space-y-6">
            {/* Selected Date Events */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">
                  Wednesday, July 16
                </h3>
              </div>
              <div className="p-6">
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No events scheduled for this date</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-slate-50 transition-colors">
                  <Plus className="h-5 w-5 text-blue-500" />
                  <span className="text-slate-700">Schedule Appointment</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-slate-50 transition-colors">
                  <Calendar className="h-5 w-5 text-green-500" />
                  <span className="text-slate-700">Add Court Date</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-slate-50 transition-colors">
                  <Clock className="h-5 w-5 text-yellow-500" />
                  <span className="text-slate-700">Set Deadline</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-slate-50 transition-colors">
                  <Video className="h-5 w-5 text-purple-500" />
                  <span className="text-slate-700">Video Meeting</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple placeholder components
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

// Video Conferencing Component with FIXED Invite Functionality
function VideoConferencing() {
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<{
    id: string;
    title: string;
    participants: string[];
  } | null>(null);

  const handleStartMeeting = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      // Generate meeting ID and set meeting info
      const meetingId = `MEET-${Date.now()}`;
      setCurrentMeeting({
        id: meetingId,
        title: 'Video Meeting',
        participants: ['You']
      });
      
      setIsInCall(true);
      
      // Show video in the video element
      setTimeout(() => {
        const videoElement = document.getElementById('localVideo') as HTMLVideoElement;
        if (videoElement && stream) {
          videoElement.srcObject = stream;
          videoElement.play();
        }
      }, 100);
      
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Please allow camera access to start the meeting');
    }
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setCurrentMeeting(null);
    // Stop all video streams
    const videoElement = document.getElementById('localVideo') as HTMLVideoElement;
    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  // FIXED INVITE CLICK HANDLER
  const handleInviteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Invite button clicked!', currentMeeting);
    setShowInviteModal(true);
  };

  const handleSendInvites = () => {
    const emailInput = document.getElementById('inviteEmails') as HTMLInputElement;
    const messageInput = document.getElementById('inviteMessage') as HTMLTextAreaElement;
    
    const emails = emailInput?.value || '';
    const message = messageInput?.value || '';
    
    if (!emails.trim()) {
      alert('Please enter at least one email address');
      return;
    }

    // In a real app, this would send actual emails
    const emailList = emails.split(',').map(e => e.trim()).filter(e => e);
    
    alert(`✅ Meeting invitations sent to:\n${emailList.join('\n')}\n\n🔗 Meeting Link:\n${window.location.origin}/meeting/${currentMeeting?.id}\n\n📱 Meeting ID: ${currentMeeting?.id}`);
    
    setShowInviteModal(false);
    
    // Clear form
    if (emailInput) emailInput.value = '';
    if (messageInput) messageInput.value = '';
  };

  const copyMeetingLink = () => {
    const meetingLink = `${window.location.origin}/meeting/${currentMeeting?.id}`;
    navigator.clipboard.writeText(meetingLink).then(() => {
      alert('✅ Meeting link copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = meetingLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('✅ Meeting link copied to clipboard!');
    });
  };

  if (isInCall) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-xl overflow-hidden min-h-[600px]">
            {/* Meeting Header with FIXED Invite Button */}
            <div className="bg-slate-800 px-6 py-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white font-semibold">{currentMeeting?.title}</h2>
                  <p className="text-slate-300 text-sm">Meeting ID: {currentMeeting?.id}</p>
                </div>
                <div className="flex items-center space-x-4">
                  {/* FIXED INVITE BUTTON */}
                  <button
                    onClick={handleInviteClick}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm font-medium shadow-lg cursor-pointer"
                  >
                    <Users className="h-4 w-4" />
                    <span>Invite Participants</span>
                  </button>
                  
                  <div className="flex items-center space-x-4 text-slate-300 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{currentMeeting?.participants.length || 1}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>00:05:23</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Area */}
            <div className="relative aspect-video bg-slate-800">
              <div className="absolute inset-0">
                {/* Local Video */}
                {isVideoOn ? (
                  <video
                    id="localVideo"
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    autoPlay
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                        <User className="h-12 w-12 text-white" />
                      </div>
                      <p className="text-white text-xl font-medium">You</p>
                    </div>
                  </div>
                )}
                
                {/* Remote participant placeholder */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-slate-600 rounded-lg">
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <User className="h-6 w-6 text-white mx-auto mb-1" />
                      <p className="text-white text-xs">Waiting for participants...</p>
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
              
              {/* Meeting Info */}
              <div className="mt-4 text-center">
                <p className="text-slate-400 text-sm">
                  Meeting Link: {window.location.origin}/meeting/{currentMeeting?.id}
                </p>
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
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Schedule Meeting</span>
            </button>
            <button 
              onClick={handleStartMeeting}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Video className="h-5 w-5" />
              <span>Start Meeting</span>
            </button>
          </div>
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
            <button 
              onClick={() => setShowScheduleModal(true)}
              className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-green-500 hover:bg-green-50 transition-colors"
            >
              <Calendar className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">Schedule Meeting</span>
            </button>
            <button 
              onClick={() => setShowJoinModal(true)}
              className="flex flex-col items-center p-4 rounded-lg border-2 border-dashed border-slate-300 hover:border-purple-500 hover:bg-purple-50 transition-colors"
            >
              <Users className="h-8 w-8 text-slate-400 mb-2" />
              <span className="text-sm font-medium text-slate-600">Join Meeting</span>
            </button>
          </div>
        </div>

        {/* FIXED INVITE MODAL */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Send className="h-6 w-6 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Invite to Meeting</h2>
                  </div>
                  <button 
                    onClick={() => setShowInviteModal(false)}
                    className="p-2 hover:bg-slate-100 rounded-lg"
                  >
                    <X className="h-5 w-5 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Meeting Info */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-900 mb-3">Meeting Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Video className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">{currentMeeting?.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-slate-500" />
                      <span>Meeting ID: {currentMeeting?.id}</span>
                    </div>
                  </div>
                </div>

                {/* Meeting Link */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Meeting Link
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={`${window.location.origin}/meeting/${currentMeeting?.id}`}
                      readOnly
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 text-sm"
                    />
                    <button
                      onClick={copyMeetingLink}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center space-x-2"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>

                {/* Email Invites */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Addresses *
                  </label>
                  <textarea
                    id="inviteEmails"
                    className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email addresses separated by commas&#10;example: john@company.com, sarah@firm.com"
                    rows={3}
                  />
                  <p className="text-xs text-slate-500 mt-1">
                    Separate multiple email addresses with commas
                  </p>
                </div>

                {/* Personal Message */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Personal Message (Optional)
                  </label>
                  <textarea
                    id="inviteMessage"
                    className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add a personal message to your invitation..."
                    rows={3}
                  />
                </div>

                {/* Email Preview */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-medium text-slate-900 mb-3">Email Preview</h3>
                  <div className="text-sm text-slate-700 space-y-2">
                    <p><strong>Subject:</strong> Meeting Invitation: {currentMeeting?.title}</p>
                    <div className="bg-white p-3 rounded border text-xs">
                      <p>You're invited to join a video meeting:</p>
                      <p className="font-medium mt-2">{currentMeeting?.title}</p>
                      <p className="mt-2">🔗 Join here: <span className="text-blue-600">{window.location.origin}/meeting/{currentMeeting?.id}</span></p>
                      <p>📱 Meeting ID: {currentMeeting?.id}</p>
                      <p className="mt-2 text-slate-500">This meeting is secured with end-to-end encryption.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 flex items-center justify-end space-x-4">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendInvites}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Invitations</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Simple Schedule Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Schedule Meeting</h2>
                <button onClick={() => setShowScheduleModal(false)}>
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Meeting title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
                <input
                  type="datetime-local"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
                <button
                  onClick={() => {
                    alert('Meeting scheduled successfully!');
                    setShowScheduleModal(false);
                  }}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Simple Join Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Join Meeting</h2>
                <button onClick={() => setShowJoinModal(false)}>
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Meeting ID"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
                <button
                  onClick={() => {
                    setShowJoinModal(false);
                    handleStartMeeting();
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Join Meeting
                </button>
              </div>
            </div>
          </div>
        )}
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
