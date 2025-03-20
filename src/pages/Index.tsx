
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, FileText, FileVideo, AlertTriangle } from 'lucide-react';
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

const Index: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  const chatbotRef = useRef<HTMLDivElement>(null);
  const documentAnalyzerRef = useRef<HTMLDivElement>(null);
  const firGeneratorRef = useRef<HTMLDivElement>(null);
  const videoGeneratorRef = useRef<HTMLDivElement>(null);
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Advanced Legal Assistance Powered by AI
                </h1>
              </SectionTransition>
              <SectionTransition effect="fade" delay={200} className="mb-10">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                  Revolutionizing legal support with intelligent tools for document analysis, FIR generation, and case visualization to ensure justice is accessible to everyone.
                </p>
              </SectionTransition>
              <SectionTransition effect="zoom" delay={400}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8"
                    onClick={() => scrollToSection(chatbotRef)}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                  >
                    Learn More
                  </Button>
                </div>
              </SectionTransition>
              
              <div className="absolute top-4 right-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <SectionTransition effect="3d-rotate" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Legal Solutions</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Our platform offers powerful tools to help with various legal needs, from getting quick legal advice to generating complex legal documents.
              </p>
            </SectionTransition>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              <SectionTransition effect="fade" delay={100}>
                <FeatureCard 
                  icon={<MessageSquare size={24} />}
                  title="Legal Chatbot"
                  description="Get instant legal advice and information through our AI-powered chatbot assistant."
                  onClick={() => scrollToSection(chatbotRef)}
                  active={activeFeature === 'chatbot'}
                  className="hover:translate-y-[-5px] transition-transform duration-300 hover:shadow-lg"
                />
              </SectionTransition>
              
              <SectionTransition effect="fade" delay={200}>
                <FeatureCard 
                  icon={<FileText size={24} />}
                  title="Document Analysis"
                  description="Upload and analyze legal documents to understand implications and potential courses of action."
                  onClick={() => scrollToSection(documentAnalyzerRef)}
                  active={activeFeature === 'document-analyzer'}
                  className="hover:translate-y-[-5px] transition-transform duration-300 hover:shadow-lg"
                />
              </SectionTransition>
              
              <SectionTransition effect="fade" delay={300}>
                <FeatureCard 
                  icon={<AlertTriangle size={24} />}
                  title="FIR Generator"
                  description="Create accurate and detailed First Information Reports based on incident details."
                  onClick={() => scrollToSection(firGeneratorRef)}
                  active={activeFeature === 'fir-generator'}
                  className="hover:translate-y-[-5px] transition-transform duration-300 hover:shadow-lg"
                />
              </SectionTransition>
              
              <SectionTransition effect="fade" delay={400}>
                <FeatureCard 
                  icon={<FileVideo size={24} />}
                  title="Video Generator"
                  description="Generate visual reconstructions of incidents for better understanding and presentation."
                  onClick={() => scrollToSection(videoGeneratorRef)}
                  active={activeFeature === 'video-generator'}
                  className="hover:translate-y-[-5px] transition-transform duration-300 hover:shadow-lg"
                />
              </SectionTransition>
            </div>
          </div>
        </section>
        
        {/* Chatbot Section */}
        <section 
          id="chatbot" 
          className="py-20 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30"
          ref={chatbotRef}
        >
          <div className="container mx-auto px-4">
            <SectionTransition effect="3d-rotate" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Legal Assistant</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Our intelligent chatbot provides quick responses to your legal questions and guides you through legal processes.
              </p>
            </SectionTransition>
            
            <div className="relative">
              <Chatbot className="max-w-6xl mx-auto" />
              
              <div className="mt-16 text-center">
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Try our intelligent chatbot by clicking the chat icon in the bottom right corner.
                </p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setActiveFeature('document-analyzer');
                    scrollToSection(documentAnalyzerRef);
                  }}
                >
                  Explore Document Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Document Analyzer Section */}
        <section 
          id="document-analyzer" 
          className="py-20"
          ref={documentAnalyzerRef}
        >
          <div className="container mx-auto px-4">
            <SectionTransition effect="3d-flip" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Legal Document Analysis</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Upload legal documents and get instant insights, summaries, and answers to specific questions.
              </p>
            </SectionTransition>
            
            <DocumentAnalyzer />
            
            <div className="mt-16 text-center">
              <Button 
                variant="outline"
                onClick={() => {
                  setActiveFeature('fir-generator');
                  scrollToSection(firGeneratorRef);
                }}
              >
                Explore FIR Generator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* FIR Generator Section */}
        <section 
          id="fir-generator" 
          className="py-20 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30"
          ref={firGeneratorRef}
        >
          <div className="container mx-auto px-4">
            <SectionTransition effect="zoom" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">First Information Report Generator</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Create comprehensive and accurate FIRs by providing incident details through our intuitive interface.
              </p>
            </SectionTransition>
            
            <FIRGenerator />
            
            <div className="mt-16 text-center">
              <Button 
                variant="outline"
                onClick={() => {
                  setActiveFeature('video-generator');
                  scrollToSection(videoGeneratorRef);
                }}
              >
                Explore Video Generator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Video Generator Section */}
        <section 
          id="video-generator" 
          className="py-20"
          ref={videoGeneratorRef}
        >
          <div className="container mx-auto px-4">
            <SectionTransition effect="slide" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Incident Video Generator</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Convert incident descriptions into visual reconstructions for better understanding and presentation in legal proceedings.
              </p>
            </SectionTransition>
            
            <VideoGenerator />
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/30">
          <div className="container mx-auto px-4">
            <SectionTransition effect="3d-rotate" className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Legal Professionals</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
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
                    className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 glass hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-300 font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                      </div>
                    </div>
                  </div>
                </SectionTransition>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionTransition effect="3d-flip">
              <div 
                className="max-w-4xl mx-auto text-center p-12 rounded-xl glass border border-gray-200 dark:border-gray-800 shadow-lg bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Legal Experience?</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                  Sign up today and gain access to all our powerful legal tools and AI assistance.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8"
                  >
                    Get Started Now
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
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
    </div>
  );
};

export default Index;
