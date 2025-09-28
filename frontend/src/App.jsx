import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService.js';
import config from './constants.js';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);
  
  const manifest = new Manifest({ baseURL: config.BACKEND_URL, appId: config.APP_ID });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          if(currentUser) {
            fetchUserApplication(currentUser.id);
          }
        } catch (err) {
          console.log('No active session.');
          setUser(null);
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', connectionResult.error);
      }
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  const fetchUserApplication = async (userId) => {
    try {
      const response = await manifest.from('Application').find({
        filter: { applicantId: userId },
        limit: 1
      });
      if (response.data.length > 0) {
        setApplication(response.data[0]);
      }
    } catch (err) {
      console.error("Error fetching application:", err);
    }
  };

  const handleLogin = async (email, password) => {
    setAuthError(null);
    try {
      await manifest.login(email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
      fetchUserApplication(currentUser.id);
    } catch (err) {
      console.error("Login failed:", err);
      setAuthError('Invalid email or password.');
    }
  };

  const handleSignup = async (name, email, password) => {
    setAuthError(null);
    try {
      await manifest.from('User').signup({ name, email, password });
      await handleLogin(email, password);
    } catch (err) {
      console.error("Signup failed:", err);
      setAuthError('Could not create account. The email might already be in use.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setApplication(null);
  };

  const createApplication = async (appData) => {
    try {
        const newApplication = await manifest.from('Application').create(appData);
        setApplication(newApplication);
    } catch(err) {
        console.error("Error creating application:", err)
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Loading Mission Control...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className='text-sm text-gray-700'>{backendConnected ? 'System Online' : 'System Offline'}</span>
      </div>

      {user ? (
        <DashboardPage
          user={user}
          application={application}
          onLogout={handleLogout}
          onCreateApplication={createApplication}
        />
      ) : (
        <LandingPage
          onLogin={handleLogin}
          onSignup={handleSignup}
          authError={authError}
        />
      )}
    </div>
  );
}

export default App;
