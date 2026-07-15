import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Pre-configured users for easy switching
  const mockUsers = {
    customer: { username: 'john_customer', name: 'John Doe', role: 'customer', email: 'customer@mail.com', id: 'CUST-8392', policyCount: 3 },
    agent: { username: 'sarah_agent', name: 'Sarah Jenkins', role: 'agent', email: 'agent@mail.com', id: 'AGNT-1092', clientCount: 42, commission: '₹12,450' },
    telecaller: { username: 'mike_caller', name: 'Mike Ross', role: 'telecaller', email: 'telecaller@mail.com', id: 'CALL-0921', leadCount: 156, callsMade: 48 },
    employee: { username: 'jane_employee', name: 'Jane Watson', role: 'employee', email: 'employee@mail.com', id: 'EMP-7721', queueSize: 14 },
    manager: { username: 'david_manager', name: 'David Vance', role: 'manager', email: 'manager1@mail.com', id: 'MGR-4490', department: 'Claims & Operations' },
    admin: { username: 'alex_admin', name: 'Alex Mercer', role: 'admin', email: 'admin@mail.com', id: 'ADM-0001', systemAccess: 'Root' }
  };

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const cleanedEmail = email.trim().toLowerCase();
    let role = null;

    if (cleanedEmail === 'admin@mail.com' && password === 'admin@123') {
      role = 'admin';
    } else if (cleanedEmail === 'manager1@mail.com' && password === 'manager1@123') {
      role = 'manager';
    } else if (cleanedEmail === 'customer@mail.com' && password === 'customer@123') {
      role = 'customer';
    } else if (cleanedEmail === 'agent@mail.com' && password === 'agent@123') {
      role = 'agent';
    } else if (cleanedEmail === 'telecaller@mail.com' && password === 'telecaller@123') {
      role = 'telecaller';
    } else if (cleanedEmail === 'employee@mail.com' && password === 'employee@123') {
      role = 'employee';
    }

    if (role) {
      const selectedUser = mockUsers[role];
      setUser(selectedUser);
      localStorage.setItem('user', JSON.stringify(selectedUser));
      return true;
    }
    return false;
  };

  const switchRole = (role) => {
    if (mockUsers[role]) {
      setUser(mockUsers[role]);
      localStorage.setItem('user', JSON.stringify(mockUsers[role]));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, switchRole, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
