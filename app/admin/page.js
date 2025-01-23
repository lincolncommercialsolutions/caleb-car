'use client';
import { useState } from 'react';

const CATEGORIES = ['Uncategorized', 'New', 'In Progress', 'Contacted', 'Completed', 'Archived'];

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [error, setError] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple client-side check (in production, use proper auth)
    if (credentials.username === 'admin' && credentials.password === 'securepassword123') {
      setIsLoggedIn(true);
      fetchContacts();
    } else {
      setError('Invalid credentials');
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch('/api/admin-contacts?action=list');
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const viewContact = async (contactObj) => {
    try {
      const res = await fetch(`/api/admin-contacts?action=get&key=${encodeURIComponent(contactObj.key)}`);
      const data = await res.json();
      setSelectedContact({ ...contactObj, content: data.content });
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  const deleteContact = async (key) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const res = await fetch(`/api/admin-contacts/delete?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('Submission deleted successfully');
        setContacts(contacts.filter(c => c.key !== key));
        if (selectedContact?.key === key) {
          setSelectedContact(null);
        }
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to delete submission');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      setMessage('Failed to delete submission');
    }
  };

  const categorizeContact = async (key, category) => {
    try {
      const res = await fetch('/api/admin-contacts/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, category }),
      });

      if (res.ok) {
        setMessage(`Categorized as: ${category}`);
        // Update local state
        setContacts(contacts.map(c => 
          c.key === key ? { ...c, category } : c
        ));
        if (selectedContact?.key === key) {
          setSelectedContact({ ...selectedContact, category });
        }
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to update category');
      }
    } catch (error) {
      console.error('Error categorizing contact:', error);
      setMessage('Failed to update category');
    }
  };

  const filteredContacts = filterCategory === 'All' 
    ? contacts 
    : contacts.filter(c => c.category === filterCategory);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-surface p-8 rounded-xl shadow-2xl max-w-md w-full border border-border">
          <h1 className="text-3xl font-bold mb-6 text-text-primary text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Password</label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-text-primary"
              />
            </div>
            {error && <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-br from-surface via-background to-surface py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4 text-text-primary">Admin Dashboard</h1>
          <p className="text-xl text-text-secondary">Contact Submissions ({contacts.length})</p>
        </div>
      </div>

      {message && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-accent bg-opacity-10 border border-accent text-text-primary px-4 py-3 rounded-lg">
            {message}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <div className="mb-6 bg-surface rounded-xl shadow-lg p-6 border border-border">
          <label className="block text-sm font-medium text-text-primary mb-2">Filter by Category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-text-primary"
          >
            <option value="All">All ({contacts.length})</option>
            {CATEGORIES.map(cat => {
              const count = contacts.filter(c => c.category === cat).length;
              return <option key={cat} value={cat}>{cat} ({count})</option>;
            })}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-surface rounded-xl shadow-xl p-6 border border-border">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">
              Submissions {filterCategory !== 'All' && `- ${filterCategory}`}
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredContacts.length === 0 && (
                <p className="text-text-secondary">No submissions yet</p>
              )}
              {filteredContacts.map((contact, idx) => (
                <div
                  key={idx}
                  className={`border border-border rounded-lg p-4 transition-all duration-300 ${
                    selectedContact?.key === contact.key ? 'bg-accent bg-opacity-10 border-accent' : 'hover:bg-background'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <button
                      onClick={() => viewContact(contact)}
                      className="flex-1 text-left font-medium text-accent hover:text-accent-hover"
                    >
                      {contact.key.split('/').pop()}
                    </button>
                    <button
                      onClick={() => deleteContact(contact.key)}
                      className="ml-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <div className="text-xs text-text-secondary mb-2">
                    {new Date(contact.lastModified).toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={contact.category}
                      onChange={(e) => categorizeContact(contact.key, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm px-2 py-1 border border-border rounded focus:ring-2 focus:ring-accent bg-background text-text-primary"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <span className={`text-xs px-2 py-1 rounded ${
                      contact.category === 'Completed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' :
                      contact.category === 'In Progress' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100' :
                      contact.category === 'New' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100' :
                      contact.category === 'Archived' ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {contact.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface rounded-xl shadow-xl p-6 border border-border">
            <h2 className="text-2xl font-bold mb-4 text-text-primary">Details</h2>
            {selectedContact ? (
              <div>
                <div className="mb-4 pb-4 border-b border-border">
                  <h3 className="font-semibold mb-2 text-text-primary">{selectedContact.key.split('/').pop()}</h3>
                  <div className="flex gap-2 items-center mb-2">
                    <select
                      value={selectedContact.category}
                      onChange={(e) => categorizeContact(selectedContact.key, e.target.value)}
                      className="px-3 py-1 border border-border rounded-lg focus:ring-2 focus:ring-accent bg-background text-text-primary"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => deleteContact(selectedContact.key)}
                      className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm text-text-secondary">
                    {new Date(selectedContact.lastModified).toLocaleString()}
                  </p>
                </div>
                <pre className="whitespace-pre-wrap text-sm text-text-primary bg-background p-4 rounded-lg max-h-[450px] overflow-y-auto border border-border">
                  {selectedContact.content}
                </pre>
              </div>
            ) : (
              <p className="text-text-secondary">Select a submission to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
