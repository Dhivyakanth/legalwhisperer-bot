
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  MessageSquare, 
  FileText, 
  AlertTriangle, 
  FileVideo, 
  X, 
  ChevronDown 
} from 'lucide-react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import BackgroundEffect from '@/components/UI/BackgroundEffect';
import BackgroundAnimation3D from '@/components/UI/BackgroundAnimation3D';
import FeatureCard from '@/components/UI/FeatureCard';
import SectionTransition from '@/components/UI/SectionTransition';
import Chatbot from '@/components/Features/Chatbot';
import DocumentAnalyzer from '@/components/Features/DocumentAnalyzer';
import FIRGenerator from '@/components/Features/FIRGenerator';
import VideoGenerator from '@/components/Features/VideoGenerator';
import { ThemeToggle } from '@/components/UI/ThemeToggle';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Index: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Ref for the features section
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Function to open a feature in fullscreen
  const openFeature = (feature: string) => {
    setActiveFeature(feature);
  };
  
  // Function to close the active feature
  const closeFeature = () => {
    setActiveFeature(null);
  };
  
  // Scroll to features section
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle "Get Started Now" button click
  const handleGetStarted = () => {
    toast({
      title: "Welcome to Legal AI Assistant!",
      description: "We're here to help with all your legal needs. Start exploring our features or chat with our AI assistant.",
      duration: 5000,
    });
    scrollToFeatures();
  };
  
  // Render the fullscreen feature component
  const renderFeatureContent = () => {
    switch (activeFeature) {
      case 'chatbot':
        return (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 legal-gold:bg-amber-50 legal-blue:bg-blue-50 z-50 flex flex-col animate-fadeIn">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 legal-gold:border-amber-200 legal-blue:border-blue-200">
              <h3 className="text-xl font-bold">Legal Chatbot</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeFeature}
              >
                <X size={20} />
              </Button>
            </div>
            <div className="flex-1 overflow-auto">
              <Chatbot fullscreen />
            </div>
          </div>
        );
      case 'document-analyzer':
        return (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 legal-gold:bg-amber-50 legal-blue:bg-blue-50 z-50 flex flex-col animate-fadeIn">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 legal-gold:border-amber-200 legal-blue:border-blue-200">
              <h3 className="text-xl font-bold">Document Analysis</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeFeature}
              >
                <X size={20} />
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <DocumentAnalyzer />
            </div>
          </div>
        );
      case 'fir-generator':
        return (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 legal-gold:bg-amber-50 legal-blue:bg-blue-50 z-50 flex flex-col animate-fadeIn">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 legal-gold:border-amber-200 legal-blue:border-blue-200">
              <h3 className="text-xl font-bold">FIR Generator</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeFeature}
              >
                <X size={20} />
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <FIRGenerator />
            </div>
          </div>
        );
      case 'video-generator':
        return (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 legal-gold:bg-amber-50 legal-blue:bg-blue-50 z-50 flex flex-col animate-fadeIn">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 legal-gold:border-amber-200 legal-blue:border-blue-200">
              <h3 className="text-xl font-bold">Video Generator</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeFeature}
              >
                <X size={20} />
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <VideoGenerator />
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <BackgroundEffect />
      <BackgroundAnimation3D />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <SectionTransition effect="3d-flip" className="mb-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300 legal-gold:from-amber-700 legal-gold:to-amber-500 legal-blue:from-blue-700 legal-blue:to-blue-500 bg-clip-text text-transparent">
                  Advanced Legal Assistance Powered by AI
                </h1>
              </SectionTransition>
              <SectionTransition effect="fade" delay={200} className="mb-10">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 legal-gold:text-amber-800 legal-blue:text-blue-800 leading-relaxed">
                  Revolutionizing legal support with intelligent tools for document analysis, FIR generation, and case visualization to ensure justice is accessible to everyone.
                </p>
              </SectionTransition>
              <SectionTransition effect="zoom" delay={400}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 dark:from-indigo-500 dark:to-blue-500 legal-gold:from-amber-600 legal-gold:to-amber-500 legal-blue:from-blue-600 legal-blue:to-blue-500 text-white px-8"
                    onClick={scrollToFeatures}
                  >
                    Explore Features
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="legal-gold:border-amber-500 legal-gold:text-amber-700 legal-blue:border-blue-500 legal-blue:text-blue-700"
                    onClick={handleGetStarted}
                  >
                    Get Started Now
                  </Button>
                </div>
              </SectionTransition>
              
              <div className="absolute top-4 right-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={24} className="text-gray-400 dark:text-gray-600" />
          </div>
        </section>
        
        {/* Features Section */}
        <section 
          id="features" 
          className="py-20"
          ref={featuresRef}
        >
          <div className="container mx-auto px-4">
            <SectionTransition effect="3d-rotate" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Legal Solutions</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 legal-gold:text-amber-800 legal-blue:text-blue-800">
                Our platform offers powerful tools to help with various legal needs, from getting quick legal advice to generating complex legal documents.
              </p>
            </SectionTransition>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <div onClick={() => openFeature('chatbot')}>
                <SectionTransition effect="fade" delay={100}>
                  <FeatureCard 
                    icon={<MessageSquare size={24} className="law-scale-animation" />}
                    title="Legal Chatbot"
                    description="Get instant legal advice and information through our AI-powered chatbot assistant."
                    active={activeFeature === 'chatbot'}
                    className="hover:translate-y-[-5px] transition-transform duration-300 hover:shadow-lg cursor-pointer transform-gpu"
                  />
                </SectionTransition>
              </div>
              
              <div onClick={() => openFeature('document-analyzer')}>
                <SectionTransition effect="fade" delay={200}>
                  <FeatureCard 
                    icon={<FileText size={24} className="law-scale-animation" />}
                    title="Document Analysis"
                    description="Upload and analyze legal documents to understand implications and potential courses of action."
                    active={activeFeature === 'document-analyzer'}
                    className="hover:translate-y-[-5px] transition-transform duration-300 hover:shadow-lg cursor-pointer transform-gpu"
                  />
                </SectionTransition>
              </div>
              
              <div onClick={() => openFeature('fir-generator')}>
                <SectionTransition effect="fade" delay={300}>
                  <FeatureCard 
                    icon={<AlertTriangle size={24} className="gavel-animation" />}
                    title="FIR Generator"
                    description="Create accurate and detailed First Information Reports based on incident details."
                    active={activeFeature === 'fir-generator'}
                    className="hover:translate-y-[-5px] transition-transform duration-300 hover:shadow-lg cursor-pointer transform-gpu"
                  />
                </SectionTransition>
              </div>
              
              <div onClick={() => openFeature('video-generator')}>
                <SectionTransition effect="fade" delay={400}>
                  <FeatureCard 
                    icon={<FileVideo size={24} className="law-scale-animation" />}
                    title="Video Generator"
                    description="Generate visual reconstructions of incidents for better understanding and presentation."
                    active={activeFeature === 'video-generator'}
                    className="hover:translate-y-[-5px] transition-transform duration-300 hover:shadow-lg cursor-pointer transform-gpu"
                  />
                </SectionTransition>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section - Kept in main page */}
        <section id="testimonials" className="py-20 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30 legal-gold:to-amber-50/50 legal-blue:to-blue-50/50">
          <div className="container mx-auto px-4">
            <SectionTransition effect="3d-rotate" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Legal Professionals</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 legal-gold:text-amber-800 legal-blue:text-blue-800">
                See what lawyers, judges, and legal assistants have to say about our platform.
              </p>
            </SectionTransition>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "Aditya Sharma",
                  title: "Criminal Lawyer",
                  quote: "The FIR generator has simplified one of the most tedious processes in criminal cases. My clients can now provide all necessary information digitally, saving hours of paperwork."
                },
                {
                  name: "Priya Mehta",
                  title: "Legal Consultant",
                  quote: "The document analysis tool identifies key clauses and potential issues in contracts faster than any junior associate. It's become an indispensable part of my practice."
                },
                {
                  name: "Rajesh Kumar",
                  title: "Law Professor",
                  quote: "I recommend this platform to all my students. The combination of AI assistance and practical document tools gives them real-world experience with modern legal technology."
                }
              ].map((testimonial, index) => (
                <SectionTransition key={index} effect="fade" delay={index * 200}>
                  <div 
                    className={cn(
                      "bg-white dark:bg-gray-900 legal-gold:bg-amber-50 legal-blue:bg-blue-50 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 legal-gold:border-amber-200 legal-blue:border-blue-200 glass hover:shadow-md transition-shadow duration-300",
                      "transform-gpu hover:scale-[1.02] transition-transform duration-300"
                    )}
                  >
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 legal-gold:text-amber-500">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 legal-gold:text-amber-800 legal-blue:text-blue-800 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-semibold",
                        "bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300",
                        "legal-gold:bg-amber-100 legal-gold:text-amber-600",
                        "legal-blue:bg-blue-100 legal-blue:text-blue-600"
                      )}>
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 legal-gold:text-amber-700 legal-blue:text-blue-700">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </SectionTransition>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section - Kept in main page */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionTransition effect="3d-flip">
              <div 
                className={cn(
                  "max-w-4xl mx-auto text-center p-12 rounded-xl glass border shadow-lg",
                  "border-gray-200 dark:border-gray-800 legal-gold:border-amber-200 legal-blue:border-blue-200",
                  "bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30",
                  "legal-gold:from-amber-50 legal-gold:to-yellow-50",
                  "legal-blue:from-blue-50 legal-blue:to-indigo-50",
                  "transform-gpu hover:scale-[1.01] transition-transform duration-500"
                )}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Legal Experience?</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 legal-gold:text-amber-800 legal-blue:text-blue-800 mb-8">
                  Sign up today and gain access to all our powerful legal tools and AI assistance.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    className={cn(
                      "bg-gradient-to-r text-white px-8",
                      "from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700",
                      "dark:from-indigo-500 dark:to-blue-500",
                      "legal-gold:from-amber-600 legal-gold:to-amber-500",
                      "legal-blue:from-blue-600 legal-blue:to-blue-500"
                    )}
                    onClick={handleGetStarted}
                  >
                    Get Started Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="legal-gold:border-amber-500 legal-gold:text-amber-700 legal-blue:border-blue-500 legal-blue:text-blue-700"
                  >
                    Schedule a Demo
                  </Button>
                </div>
              </div>
            </SectionTransition>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Render active feature in fullscreen */}
      {renderFeatureContent()}
      
      {/* Fixed chatbot button (moved to right side) */}
      <Chatbot className="fixed-right" />
    </div>
  );
};

export default Index;
