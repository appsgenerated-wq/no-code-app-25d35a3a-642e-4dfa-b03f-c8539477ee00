import React, { useState } from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin, onSignup, authError }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (isLoginView) {
      onLogin(email, password);
    } else {
      onSignup(name, email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2070&auto=format&fit=crop)'}} className="absolute inset-0 bg-cover bg-center"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-6xl mx-auto">
            <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">Your Journey to Mars Begins</h1>
                <p className="text-xl md:text-2xl text-gray-300 mb-8">Join an elite crew of pioneers and help shape the future of humanity. We are looking for the best and brightest to embark on the greatest adventure in human history.</p>
                 <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">Mission Control (Admin)</a>
            </div>

            <div className="lg:w-2/5 w-full bg-gray-800 bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold mb-6 text-center">{isLoginView ? 'Crew Login' : 'Enlist Now'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLoginView && (
                         <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    {authError && <p className="text-red-400 text-sm text-center">{authError}</p>}
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105">{isLoginView ? 'Login' : 'Create Account'}</button>
                </form>
                <p className="mt-6 text-center text-sm">
                    {isLoginView ? "Don't have an account? " : "Already have an account? "}
                    <button onClick={() => setIsLoginView(!isLoginView)} className="font-medium text-indigo-400 hover:text-indigo-300">
                        {isLoginView ? 'Sign up' : 'Log in'}
                    </button>
                </p>
            </div>
        </div>
    </div>
  );
};

export default LandingPage;
