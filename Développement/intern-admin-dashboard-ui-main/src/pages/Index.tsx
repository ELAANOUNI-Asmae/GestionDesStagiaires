
import React, { useState } from 'react';
import { Users, Briefcase, Calendar, FileText, Settings, Eye, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const InternshipManagementPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data for demonstration
  const stats = {
    totalInterns: 24,
    activeProjects: 8,
    unexcusedAbsences: 3,
    pendingDeliverables: 12
  };

  const interns = [
    {
      id: 1,
      lastName: 'Johnson',
      firstName: 'Emily',
      email: 'emily.johnson@email.com',
      specialty: 'Software Development',
      school: 'MIT',
      supervisor: 'Dr. Smith',
      confirmationStatus: 'Confirmed'
    },
    {
      id: 2,
      lastName: 'Chen',
      firstName: 'David',
      email: 'david.chen@email.com',
      specialty: 'Data Science',
      school: 'Stanford University',
      supervisor: 'Prof. Wilson',
      confirmationStatus: 'Pending'
    },
    {
      id: 3,
      lastName: 'Rodriguez',
      firstName: 'Maria',
      email: 'maria.rodriguez@email.com',
      specialty: 'UI/UX Design',
      school: 'UC Berkeley',
      supervisor: 'Ms. Thompson',
      confirmationStatus: 'Confirmed'
    },
    {
      id: 4,
      lastName: 'Anderson',
      firstName: 'James',
      email: 'james.anderson@email.com',
      specialty: 'Cybersecurity',
      school: 'Carnegie Mellon',
      supervisor: 'Dr. Brown',
      confirmationStatus: 'Confirmed'
    },
    {
      id: 5,
      lastName: 'Williams',
      firstName: 'Sarah',
      email: 'sarah.williams@email.com',
      specialty: 'Marketing',
      school: 'Harvard Business School',
      supervisor: 'Mr. Davis',
      confirmationStatus: 'Pending'
    }
  ];

  const renderDashboard = () => (
    <div id="dashboard-content" className="space-y-6">
      <h1 id="dashboard-title" className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div id="stats-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card id="total-interns-card" className="stat-card hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Interns</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div id="total-interns-count" className="text-2xl font-bold text-gray-900">{stats.totalInterns}</div>
            <p className="text-xs text-green-600 mt-1">+2 from last month</p>
          </CardContent>
        </Card>

        <Card id="active-projects-card" className="stat-card hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div id="active-projects-count" className="text-2xl font-bold text-gray-900">{stats.activeProjects}</div>
            <p className="text-xs text-blue-600 mt-1">3 starting this week</p>
          </CardContent>
        </Card>

        <Card id="absences-card" className="stat-card hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Unexcused Absences</CardTitle>
            <Calendar className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div id="absences-count" className="text-2xl font-bold text-gray-900">{stats.unexcusedAbsences}</div>
            <p className="text-xs text-red-600 mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card id="deliverables-card" className="stat-card hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Deliverables</CardTitle>
            <FileText className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div id="deliverables-count" className="text-2xl font-bold text-gray-900">{stats.pendingDeliverables}</div>
            <p className="text-xs text-orange-600 mt-1">5 due this week</p>
          </CardContent>
        </Card>
      </div>

      <div id="recent-activity" className="mt-8">
        <Card className="activity-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">New intern application received</p>
                  <p className="text-xs text-gray-500">Emily Johnson - Software Development</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Project milestone completed</p>
                  <p className="text-xs text-gray-500">Data Analytics Dashboard - Phase 1</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Deliverable review pending</p>
                  <p className="text-xs text-gray-500">Mobile App Prototype - Due Tomorrow</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderInterns = () => (
    <div id="interns-content" className="space-y-6">
      <div id="interns-header" className="flex justify-between items-center">
        <h1 id="interns-title" className="text-3xl font-bold text-gray-900">Interns Management</h1>
        <Button id="add-intern-btn" className="bg-blue-600 hover:bg-blue-700">
          Add New Intern
        </Button>
      </div>

      <Card id="interns-table-card" className="table-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table id="intern-table" className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supervisor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {interns.map((intern) => (
                  <tr key={intern.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {intern.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {intern.firstName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {intern.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {intern.specialty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {intern.school}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {intern.supervisor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        className={`${
                          intern.confirmationStatus === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {intern.confirmationStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="action-btn view-btn hover:bg-blue-50 hover:border-blue-300"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="action-btn edit-btn hover:bg-green-50 hover:border-green-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="action-btn delete-btn hover:bg-red-50 hover:border-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPlaceholderPage = (title: string) => (
    <div id={`${title.toLowerCase()}-content`} className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      <Card className="placeholder-card">
        <CardContent className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title} Management</h3>
          <p className="text-gray-500">This section will contain {title.toLowerCase()} management features.</p>
        </CardContent>
      </Card>
    </div>
  );

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Users },
    { id: 'interns', label: 'Interns', icon: Users },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'absences', label: 'Absences', icon: Calendar },
    { id: 'deliverables', label: 'Deliverables', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'interns':
        return renderInterns();
      case 'projects':
        return renderPlaceholderPage('Projects');
      case 'absences':
        return renderPlaceholderPage('Absences');
      case 'deliverables':
        return renderPlaceholderPage('Deliverables');
      case 'settings':
        return renderPlaceholderPage('Settings');
      default:
        return renderDashboard();
    }
  };

  return (
    <div id="app-container" className="min-h-screen bg-gray-50">
      {/* Header */}
      <header id="main-header" className="nav-header bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div id="logo-section" className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">Intern Management</h1>
            </div>

            {/* Navigation */}
            <nav id="main-navigation" className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    id={`nav-${item.id}`}
                    className={`nav-item flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Mobile menu button (placeholder) */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
                  <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
                  <span className="w-4 h-0.5 bg-gray-600"></span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default InternshipManagementPlatform;
