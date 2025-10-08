import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, RefreshCw, Check, History, LogOut, User } from 'lucide-react';
import { generatePassword, PasswordOptions } from '../utils/passwordGenerator';
import { savePassword, getPasswordHistory, deletePassword } from '../utils/api';
import { useAuthContext } from '../context/AuthContext';

interface PasswordHistory {
  _id: string;
  password: string;
  createdAt: string;
}

export const PasswordGenerator = () => {
  const { user, signOut, isSignedIn } = useAuthContext();
  const navigate = useNavigate();
  const [options, setOptions] = useState<PasswordOptions>({
    length: 15,
    includeUppercase: true,
    includeNumbers: false,
    includeSpecialChars: false,
  });
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator');
  const [passwordHistory, setPasswordHistory] = useState<PasswordHistory[]>([]);

  useEffect(() => {
    if (activeTab === 'history' && user) {
      loadPasswordHistory();
    }
  }, [activeTab, user]);

  const loadPasswordHistory = async () => {
    if (!user) return;
    try {
      const history = await getPasswordHistory(user.id);
      setPasswordHistory(history);
    } catch (error) {
      console.error('Failed to load password history:', error);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newPassword = generatePassword(options);
    setPassword(newPassword);
    
    // Only save if user is signed in
    if (isSignedIn && user) {
      try {
        await savePassword(user.id, newPassword);
        // Refresh history after saving
        await loadPasswordHistory();
      } catch (error) {
        console.error('Failed to save password:', error);
      }
    }
    
    setGenerating(false);
  };

  const handleAuthRequired = () => {
    navigate('/auth');
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeletePassword = async (id: string) => {
    try {
      await deletePassword(id);
      setPasswordHistory(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Failed to delete password:', error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold text-white"
          >
            Password Generator
          </motion.h1>
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                <span className="text-gray-300">Welcome, {user?.firstName}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => signOut()}
                  className="flex items-center gap-2 px-4 py-2 glass-dark rounded-lg text-white hover:bg-red-500/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAuthRequired}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-colors"
              >
                <User className="w-4 h-4" />
                Sign In
              </motion.button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('generator')}
            className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
              activeTab === 'generator'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'glass text-gray-300 hover:text-white'
            }`}
          >
            <RefreshCw className="w-4 h-4 inline mr-2" />
            Generator
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => isSignedIn ? setActiveTab('history') : handleAuthRequired()}
            className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
              activeTab === 'history'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                : 'glass text-gray-300 hover:text-white'
            }`}
          >
            <History className="w-4 h-4 inline mr-2" />
            History {!isSignedIn && '(Sign in required)'}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'generator' ? (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-2xl p-8"
            >
              {/* Options */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Options</h3>
                  
                  {[
                    { key: 'includeUppercase', label: 'Uppercase Letters' },
                    { key: 'includeNumbers', label: 'Numbers' },
                    { key: 'includeSpecialChars', label: 'Special Characters' },
                  ].map(({ key, label }) => (
                    <label key={key} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={options[key as keyof PasswordOptions] as boolean}
                        onChange={(e) => setOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                        className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-300">{label}</span>
                    </label>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Length</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={options.length}
                      onChange={(e) => setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="text-center">
                      <span className="text-2xl font-bold text-white">{options.length}</span>
                      <span className="text-gray-400 ml-2">characters</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generated Password */}
              <div className="mb-8">
                <div className="glass-dark rounded-xl p-6 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <motion.div
                        key={password}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-mono text-lg text-white break-all"
                      >
                        {password || 'Click generate to create a password'}
                      </motion.div>
                    </div>
                    {password && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCopy(password)}
                        className={`p-3 rounded-lg transition-all ${
                          copied ? 'bg-green-500 animate-pulse-success' : 'glass hover:bg-white/20'
                        }`}
                      >
                        {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-gray-300" />}
                      </motion.button>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGenerate}
                  disabled={generating}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
                >
                  <motion.div
                    animate={generating ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.5, repeat: generating ? Infinity : 0 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-5 h-5" />
                    {generating ? 'Generating...' : 'Generate Password'}
                  </motion.div>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Password History</h3>
              {!isSignedIn ? (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-300 mb-4">Sign in to save and view your password history</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAuthRequired}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                  >
                    Sign In
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {passwordHistory.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No passwords generated yet</p>
                  ) : (
                    passwordHistory.map((item) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-dark rounded-lg p-4 flex items-center justify-between"
                      >
                        <div className="flex-1 mr-4">
                          <div className="font-mono text-white break-all mb-1">{item.password}</div>
                          <div className="text-sm text-gray-400">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCopy(item.password)}
                            className="p-2 glass hover:bg-white/20 rounded-lg"
                          >
                            <Copy className="w-4 h-4 text-gray-300" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeletePassword(item._id)}
                            className="p-2 glass hover:bg-red-500/20 rounded-lg"
                          >
                            <span className="text-red-400">×</span>
                          </motion.button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};