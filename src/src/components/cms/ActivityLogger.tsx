import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  UserIcon,
  ShieldExclamationIcon,
  DocumentTextIcon,
  CogIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Button, Card, Input, Select, Modal } from '../ui';
import { 
  ActivityLogEntry, 
  ActivityLogFilter, 
  activityLogger 
} from '../../utils/activityLog';
import { UserRole } from '../../utils/permissions';

interface ActivityLoggerProps {
  userRole: UserRole;
}

const ActivityLogger: React.FC<ActivityLoggerProps> = ({ userRole }) => {
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [filter, setFilter] = useState<ActivityLogFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLog, setSelectedLog] = useState<ActivityLogEntry | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState(activityLogger.getActivityStats());

  useEffect(() => {
    loadLogs();
    loadStats();
  }, [filter]);

  const loadLogs = () => {
    const filteredLogs = activityLogger.getLogs(filter);
    setLogs(filteredLogs);
  };

  const loadStats = () => {
    setStats(activityLogger.getActivityStats());
  };

  const handleFilterChange = (key: keyof ActivityLogFilter, value: any) => {
    setFilter(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      loadLogs();
      return;
    }

    const searchResults = logs.filter(log =>
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resourceName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setLogs(searchResults);
  };

  const clearFilters = () => {
    setFilter({});
    setSearchTerm('');
    loadLogs();
  };

  const exportLogs = () => {
    const csvContent = activityLogger.exportToCSV(filter);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getSeverityIcon = (severity: ActivityLogEntry['severity']) => {
    switch (severity) {
      case 'info':
        return <InformationCircleIcon className="h-5 w-5 text-blue-500" />;
      case 'warning':
        return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'critical':
        return <ShieldExclamationIcon className="h-5 w-5 text-red-600" />;
      default:
        return <InformationCircleIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: ActivityLogEntry['category']) => {
    switch (category) {
      case 'user_action':
        return <UserIcon className="h-4 w-4 text-blue-500" />;
      case 'system_event':
        return <CogIcon className="h-4 w-4 text-gray-500" />;
      case 'security':
        return <ShieldExclamationIcon className="h-4 w-4 text-red-500" />;
      case 'data_change':
        return <DocumentTextIcon className="h-4 w-4 text-green-500" />;
      case 'access_control':
        return <CheckCircleIcon className="h-4 w-4 text-purple-500" />;
      default:
        return <InformationCircleIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(timestamp);
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Activity Logs & Audit Trail</h2>
          <p className="text-gray-600">Monitor system activity and user actions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <FunnelIcon className="h-4 w-4" />
            Filters
          </Button>
          <Button
            onClick={exportLogs}
            className="flex items-center gap-2"
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalLogs}</p>
            </div>
            <DocumentTextIcon className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.logsBySeverity.warning}</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-red-600">{stats.logsBySeverity.error}</p>
            </div>
            <XCircleIcon className="h-8 w-8 text-red-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Security Events</p>
              <p className="text-2xl font-bold text-purple-600">{stats.logsByCategory.security}</p>
            </div>
            <ShieldExclamationIcon className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="lg:w-auto">
            Search
          </Button>
          <Button variant="outlined" onClick={clearFilters} className="lg:w-auto">
            Clear
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
              <Select
                value={filter.severity || ''}
                onChange={(e) => handleFilterChange('severity', e.target.value || undefined)}
              >
                <option value="">All Severities</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
                <option value="critical">Critical</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <Select
                value={filter.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
              >
                <option value="">All Categories</option>
                <option value="user_action">User Action</option>
                <option value="system_event">System Event</option>
                <option value="security">Security</option>
                <option value="data_change">Data Change</option>
                <option value="access_control">Access Control</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resource</label>
              <Select
                value={filter.resource || ''}
                onChange={(e) => handleFilterChange('resource', e.target.value || undefined)}
              >
                <option value="">All Resources</option>
                <option value="property">Property</option>
                <option value="user">User</option>
                <option value="blog_post">Blog Post</option>
                <option value="system">System</option>
                <option value="report">Report</option>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
              <Select
                value={filter.action || ''}
                onChange={(e) => handleFilterChange('action', e.target.value || undefined)}
              >
                <option value="">All Actions</option>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
                <option value="deleted">Deleted</option>
                <option value="login">Login</option>
                <option value="failed_login">Failed Login</option>
                <option value="exported">Exported</option>
              </Select>
            </div>
          </div>
        )}
      </Card>

      {/* Activity Logs Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <div>
                        <div>{formatTimestamp(log.timestamp)}</div>
                        <div className="text-xs text-gray-500">{getTimeAgo(log.timestamp)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(log.category)}
                        <span className="text-sm font-medium text-gray-900">{log.userName}</span>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {log.userRole}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{log.resource}</div>
                      {log.resourceName && (
                        <div className="text-xs text-gray-500">{log.resourceName}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                    {log.details}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(log.severity)}
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        log.severity === 'info' ? 'bg-blue-100 text-blue-800' :
                        log.severity === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        log.severity === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-red-200 text-red-900'
                      }`}>
                        {log.severity}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      variant="text"
                      size="sm"
                      onClick={() => setSelectedLog(log)}
                      className="flex items-center gap-1"
                    >
                      <EyeIcon className="h-4 w-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {logs.length === 0 && (
          <div className="text-center py-12">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No logs found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </Card>

      {/* Log Detail Modal */}
      <Modal
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        title="Activity Log Details"
        size="lg"
      >
        {selectedLog && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                <p className="text-sm text-gray-900">{formatTimestamp(selectedLog.timestamp)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Ago</label>
                <p className="text-sm text-gray-900">{getTimeAgo(selectedLog.timestamp)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User</label>
                <p className="text-sm text-gray-900">{selectedLog.userName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="text-sm text-gray-900">{selectedLog.userRole}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Action</label>
                <p className="text-sm text-gray-900">{selectedLog.action}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Resource</label>
                <p className="text-sm text-gray-900">{selectedLog.resource}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Severity</label>
                <div className="flex items-center gap-2">
                  {getSeverityIcon(selectedLog.severity)}
                  <span className="text-sm text-gray-900">{selectedLog.severity}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <div className="flex items-center gap-2">
                  {getCategoryIcon(selectedLog.category)}
                  <span className="text-sm text-gray-900">{selectedLog.category}</span>
                </div>
              </div>
            </div>
            
            {selectedLog.resourceName && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Resource Name</label>
                <p className="text-sm text-gray-900">{selectedLog.resourceName}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Details</label>
              <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-md">{selectedLog.details}</p>
            </div>
            
            {selectedLog.ipAddress && (
              <div>
                <label className="block text-sm font-medium text-gray-700">IP Address</label>
                <p className="text-sm text-gray-900">{selectedLog.ipAddress}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ActivityLogger; 