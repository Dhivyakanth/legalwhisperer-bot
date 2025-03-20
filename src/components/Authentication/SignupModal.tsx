
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

interface SignupModalProps {
  onSignup: () => void;
  onSwitchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ onSignup, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsLoading(false);
      
      // For demo purposes, any signup succeeds
      toast({
        title: "Account created",
        description: "Welcome to LegalAssist!",
        duration: 3000
      });
      
      onSignup();
    }, 1500);
  };

  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Create Account</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Sign up for a LegalAssist account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            type="text" 
            placeholder="John Doe" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="transition-all duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="transition-all duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password" 
            type="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="transition-all duration-200"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input 
            id="confirmPassword" 
            type="password" 
            placeholder="••••••••" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="transition-all duration-200"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label 
            htmlFor="terms" 
            className="text-sm text-gray-600 dark:text-gray-400 font-normal"
          >
            I agree to the{' '}
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-200"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button 
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
            onClick={onSwitchToLogin}
            type="button"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
