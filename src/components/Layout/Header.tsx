
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Menu, X, UserCircle } from 'lucide-react';
import LoginModal from '../Authentication/LoginModal';
import SignupModal from '../Authentication/SignupModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeAuthModal, setActiveAuthModal] = useState<'login' | 'signup' | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveAuthModal(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/50 dark:bg-black/50 glass border-b border-slate-200/20 dark:border-slate-700/20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">LegalAssist</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Features</a>
          <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>
          <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <UserCircle size={20} />
                <span>Profile</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Dialog open={activeAuthModal === 'login'} onOpenChange={(open) => setActiveAuthModal(open ? 'login' : null)}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Log in</Button>
                </DialogTrigger>
                <DialogContent>
                  <LoginModal onLogin={handleLogin} onSwitchToSignup={() => setActiveAuthModal('signup')} />
                </DialogContent>
              </Dialog>
              
              <Dialog open={activeAuthModal === 'signup'} onOpenChange={(open) => setActiveAuthModal(open ? 'signup' : null)}>
                <DialogTrigger asChild>
                  <Button size="sm">Sign up</Button>
                </DialogTrigger>
                <DialogContent>
                  <SignupModal onSignup={handleLogin} onSwitchToLogin={() => setActiveAuthModal('login')} />
                </DialogContent>
              </Dialog>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 animate-slide-in-bottom">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#about" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            
            {isLoggedIn ? (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                <Button variant="ghost" size="sm" className="justify-start">
                  <UserCircle size={20} className="mr-2" />
                  Profile
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
                <Dialog open={activeAuthModal === 'login'} onOpenChange={(open) => setActiveAuthModal(open ? 'login' : null)}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Log in</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <LoginModal onLogin={handleLogin} onSwitchToSignup={() => setActiveAuthModal('signup')} />
                  </DialogContent>
                </Dialog>
                
                <Dialog open={activeAuthModal === 'signup'} onOpenChange={(open) => setActiveAuthModal(open ? 'signup' : null)}>
                  <DialogTrigger asChild>
                    <Button size="sm">Sign up</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <SignupModal onSignup={handleLogin} onSwitchToLogin={() => setActiveAuthModal('login')} />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
