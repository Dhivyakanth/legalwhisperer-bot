
import React from 'react';
import { cn } from '@/lib/utils';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 border-t border-gray-200 dark:border-gray-800 backdrop-blur-md bg-white/50 dark:bg-black/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">LegalAssist</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Empowering individuals with accessible legal assistance through AI-powered tools.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="#chatbot" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Legal Chatbot</a></li>
              <li><a href="#document-analyzer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Document Analysis</a></li>
              <li><a href="#fir-generator" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FIR Generator</a></li>
              <li><a href="#video-generator" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Video Generator</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Legal Resources</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-xs text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} LegalAssist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
