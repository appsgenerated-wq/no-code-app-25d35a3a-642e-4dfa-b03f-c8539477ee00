import React, { useState, useEffect } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, application, onLogout, onCreateApplication }) => {
  const [motivation, setMotivation] = useState('');
  const [skills, setSkills] = useState('');

  useEffect(() => {
    if (application) {
      setMotivation(application.motivation || '');
      setSkills(application.skills || '');
    }
  }, [application]);

  const handleSubmitApplication = (evt) => {
    evt.preventDefault();
    onCreateApplication({ motivation, skills, hasApplied: true });
  };

  const renderStatusBadge = (status) => {
    const statusStyles = {
        submitted: 'bg-blue-100 text-blue-800',
        under_review: 'bg-yellow-100 text-yellow-800',
        accepted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
    };
    return <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[status]}`}>{status.replace('_', ' ').toUpperCase()}</span>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome, Applicant {user.name}!</h1>
                <p className="text-sm text-gray-500">Mars Recruitment Dashboard</p>
            </div>
            <div className='flex items-center space-x-4'>
                <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-indigo-500">Admin Panel</a>
                <button onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                    Logout
                </button>
            </div>
        </div>
      </header>
      <main>
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            {application ? (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className='flex justify-between items-start mb-6'>
                        <h2 className="text-3xl font-bold text-gray-900">Your Application</h2>
                        {renderStatusBadge(application.status)}
                    </div>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-gray-800">Your Motivation</h3>
                            <p className="text-gray-600 mt-1 prose">{application.motivation}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Your Skills</h3>
                            <p className="text-gray-600 mt-1 prose">{application.skills}</p>
                        </div>
                         <p className='text-sm text-gray-500 pt-4 border-t border-gray-200'>Your application is currently {application.status.replace('_', ' ')}. We will notify you of any updates.</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Submit Your Application</h2>
                    <p className='text-gray-600 mb-6'>This is your one chance to make history. Complete the fields below to submit your application for the Mars mission.</p>
                    <form onSubmit={handleSubmitApplication} className="space-y-6">
                        <div>
                            <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">Motivation</label>
                            <textarea id="motivation" rows="5" value={motivation} onChange={(e) => setMotivation(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                             <p className='text-xs text-gray-500 mt-1'>Why do you want to go to Mars?</p>
                        </div>
                        <div>
                            <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Skills</label>
                            <textarea id="skills" rows="5" value={skills} onChange={(e) => setSkills(e.target.value)} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                             <p className='text-xs text-gray-500 mt-1'>List your relevant skills (e.g., engineering, medicine, botany).</p>
                        </div>
                        <div className='text-right'>
                            <button type="submit" className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">Submit Application</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
