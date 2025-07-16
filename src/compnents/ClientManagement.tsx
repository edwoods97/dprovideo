import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Mail, 
  Phone, 
  MapPin,
  DollarSign,
  Calendar,
  MoreVertical,
  Edit,
  Trash2,
  X,
  Save,
  Building,
  User,
  AlertTriangle
} from 'lucide-react';

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

export function ClientManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEditClient, setShowEditClient] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
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

  const handleDeleteClient = (client: Client) => {
    setSelectedClient(client);
    setShowDeleteConfirm(true);
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

  const confirmDelete = () => {
    if (selectedClient) {
      setClients(clients.filter(client => client.id !== selectedClient.id));
      setShowDeleteConfirm(false);
      setSelectedClient(null);
    }
  };

  const closeModals = () => {
    setShowAddClient(false);
    setShowEditClient(false);
    setShowDeleteConfirm(false);
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
                  <div className="relative">
                    <button 
                      className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4 text-slate-400" />
                    </button>
                  </div>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClient(client);
                    }}
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    title="Edit Client"
                  >
                    <Edit className="h-4 w-4 text-blue-500" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClient(client);
                    }}
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

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-12 w-12 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No clients found</h3>
            <p className="text-slate-600 mb-6">Try adjusting your search criteria or add a new client.</p>
            <button 
              onClick={handleAddClient}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Add Your First Client
            </button>
          </div>
        )}

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

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && selectedClient && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Delete Client</h3>
                    <p className="text-slate-600">This action cannot be undone.</p>
                  </div>
                </div>
                <p className="text-slate-700 mb-6">
                  Are you sure you want to delete <strong>{selectedClient.name}</strong>? 
                  This will permanently remove all client information and cannot be recovered.
                </p>
                <div className="flex items-center justify-end space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Client
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
