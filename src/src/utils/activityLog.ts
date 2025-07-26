export interface ActivityLogEntry {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  resourceId?: string;
  resourceName?: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  category: 'user_action' | 'system_event' | 'security' | 'data_change' | 'access_control';
}

export interface ActivityLogFilter {
  startDate?: Date;
  endDate?: Date;
  userId?: string;
  action?: string;
  resource?: string;
  severity?: ActivityLogEntry['severity'];
  category?: ActivityLogEntry['category'];
}

// Mock activity log data - in real app, this would come from a database
const mockActivityLogs: ActivityLogEntry[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    userId: 'user1',
    userName: 'John Doe',
    userRole: 'admin',
    action: 'created',
    resource: 'property',
    resourceId: 'prop123',
    resourceName: 'Luxury Villa in Beverly Hills',
    details: 'Added new property listing with 5 bedrooms, 4 bathrooms',
    severity: 'info',
    category: 'data_change'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    userId: 'user2',
    userName: 'Jane Smith',
    userRole: 'agent',
    action: 'updated',
    resource: 'property',
    resourceId: 'prop456',
    resourceName: 'Downtown Condo',
    details: 'Updated property price from $450,000 to $425,000',
    severity: 'info',
    category: 'data_change'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    userId: 'user3',
    userName: 'Mike Johnson',
    userRole: 'developer',
    action: 'deleted',
    resource: 'blog_post',
    resourceId: 'blog789',
    resourceName: 'Market Update Q3',
    details: 'Deleted outdated blog post',
    severity: 'warning',
    category: 'data_change'
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    userId: 'user1',
    userName: 'John Doe',
    userRole: 'admin',
    action: 'login',
    resource: 'system',
    details: 'User logged in from IP 192.168.1.100',
    severity: 'info',
    category: 'access_control'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    userId: 'user4',
    userName: 'Sarah Wilson',
    userRole: 'seller',
    action: 'failed_login',
    resource: 'system',
    details: 'Failed login attempt with incorrect password',
    severity: 'warning',
    category: 'security'
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    userId: 'user1',
    userName: 'John Doe',
    userRole: 'admin',
    action: 'permission_granted',
    resource: 'user',
    resourceId: 'user5',
    resourceName: 'New Agent',
    details: 'Granted admin permissions to new user',
    severity: 'info',
    category: 'access_control'
  },
  {
    id: '7',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    userId: 'system',
    userName: 'System',
    userRole: 'system',
    action: 'backup_completed',
    resource: 'database',
    details: 'Daily database backup completed successfully',
    severity: 'info',
    category: 'system_event'
  },
  {
    id: '8',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    userId: 'user2',
    userName: 'Jane Smith',
    userRole: 'agent',
    action: 'exported',
    resource: 'report',
    details: 'Exported property listings report to CSV',
    severity: 'info',
    category: 'user_action'
  }
];

class ActivityLogger {
  private logs: ActivityLogEntry[] = [...mockActivityLogs];

  // Log a new activity
  log(entry: Omit<ActivityLogEntry, 'id' | 'timestamp'>): void {
    const newEntry: ActivityLogEntry = {
      ...entry,
      id: this.generateId(),
      timestamp: new Date()
    };
    
    this.logs.unshift(newEntry); // Add to beginning of array
    
    // In a real app, this would be sent to a logging service or database
    console.log('Activity Logged:', newEntry);
  }

  // Get filtered activity logs
  getLogs(filter?: ActivityLogFilter): ActivityLogEntry[] {
    let filteredLogs = [...this.logs];

    if (filter) {
      if (filter.startDate) {
        filteredLogs = filteredLogs.filter(log => log.timestamp >= filter.startDate!);
      }
      if (filter.endDate) {
        filteredLogs = filteredLogs.filter(log => log.timestamp <= filter.endDate!);
      }
      if (filter.userId) {
        filteredLogs = filteredLogs.filter(log => log.userId === filter.userId);
      }
      if (filter.action) {
        filteredLogs = filteredLogs.filter(log => log.action === filter.action);
      }
      if (filter.resource) {
        filteredLogs = filteredLogs.filter(log => log.resource === filter.resource);
      }
      if (filter.severity) {
        filteredLogs = filteredLogs.filter(log => log.severity === filter.severity);
      }
      if (filter.category) {
        filteredLogs = filteredLogs.filter(log => log.category === filter.category);
      }
    }

    return filteredLogs;
  }

  // Get logs for a specific user
  getUserLogs(userId: string, limit?: number): ActivityLogEntry[] {
    const userLogs = this.logs.filter(log => log.userId === userId);
    return limit ? userLogs.slice(0, limit) : userLogs;
  }

  // Get logs for a specific resource
  getResourceLogs(resource: string, resourceId?: string, limit?: number): ActivityLogEntry[] {
    let resourceLogs = this.logs.filter(log => log.resource === resource);
    if (resourceId) {
      resourceLogs = resourceLogs.filter(log => log.resourceId === resourceId);
    }
    return limit ? resourceLogs.slice(0, limit) : resourceLogs;
  }

  // Get logs by severity
  getLogsBySeverity(severity: ActivityLogEntry['severity'], limit?: number): ActivityLogEntry[] {
    const severityLogs = this.logs.filter(log => log.severity === severity);
    return limit ? severityLogs.slice(0, limit) : severityLogs;
  }

  // Get logs by category
  getLogsByCategory(category: ActivityLogEntry['category'], limit?: number): ActivityLogEntry[] {
    const categoryLogs = this.logs.filter(log => log.category === category);
    return limit ? categoryLogs.slice(0, limit) : categoryLogs;
  }

  // Get recent logs (last N hours)
  getRecentLogs(hours: number = 24): ActivityLogEntry[] {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    return this.logs.filter(log => log.timestamp >= cutoffTime);
  }

  // Get activity statistics
  getActivityStats(): {
    totalLogs: number;
    logsBySeverity: Record<ActivityLogEntry['severity'], number>;
    logsByCategory: Record<ActivityLogEntry['category'], number>;
    logsByUser: Record<string, number>;
    logsByResource: Record<string, number>;
  } {
    const stats = {
      totalLogs: this.logs.length,
      logsBySeverity: {
        info: 0,
        warning: 0,
        error: 0,
        critical: 0
      },
      logsByCategory: {
        user_action: 0,
        system_event: 0,
        security: 0,
        data_change: 0,
        access_control: 0
      },
      logsByUser: {} as Record<string, number>,
      logsByResource: {} as Record<string, number>
    };

    this.logs.forEach(log => {
      stats.logsBySeverity[log.severity]++;
      stats.logsByCategory[log.category]++;
      stats.logsByUser[log.userName] = (stats.logsByUser[log.userName] || 0) + 1;
      stats.logsByResource[log.resource] = (stats.logsByResource[log.resource] || 0) + 1;
    });

    return stats;
  }

  // Export logs to CSV
  exportToCSV(filter?: ActivityLogFilter): string {
    const logs = this.getLogs(filter);
    const headers = ['Timestamp', 'User', 'Role', 'Action', 'Resource', 'Details', 'Severity', 'Category'];
    const rows = logs.map(log => [
      log.timestamp.toISOString(),
      log.userName,
      log.userRole,
      log.action,
      log.resource,
      log.details,
      log.severity,
      log.category
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    return csvContent;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Create singleton instance
export const activityLogger = new ActivityLogger();

// Helper functions for common logging scenarios
export const logUserAction = (
  userId: string,
  userName: string,
  userRole: string,
  action: string,
  resource: string,
  details: string,
  resourceId?: string,
  resourceName?: string
) => {
  activityLogger.log({
    userId,
    userName,
    userRole,
    action,
    resource,
    resourceId,
    resourceName,
    details,
    severity: 'info',
    category: 'user_action'
  });
};

export const logSecurityEvent = (
  userId: string,
  userName: string,
  userRole: string,
  action: string,
  details: string,
  severity: 'warning' | 'error' | 'critical' = 'warning'
) => {
  activityLogger.log({
    userId,
    userName,
    userRole,
    action,
    resource: 'system',
    details,
    severity,
    category: 'security'
  });
};

export const logDataChange = (
  userId: string,
  userName: string,
  userRole: string,
  action: string,
  resource: string,
  details: string,
  resourceId?: string,
  resourceName?: string
) => {
  activityLogger.log({
    userId,
    userName,
    userRole,
    action,
    resource,
    resourceId,
    resourceName,
    details,
    severity: 'info',
    category: 'data_change'
  });
};

export const logAccessControl = (
  userId: string,
  userName: string,
  userRole: string,
  action: string,
  details: string
) => {
  activityLogger.log({
    userId,
    userName,
    userRole,
    action,
    resource: 'system',
    details,
    severity: 'info',
    category: 'access_control'
  });
}; 