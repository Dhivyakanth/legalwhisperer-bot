
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { FileText, Download, Loader2, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FIRGeneratorProps {
  className?: string;
}

const FIRGenerator: React.FC<FIRGeneratorProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    complainantName: '',
    complainantAddress: '',
    complainantPhone: '',
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    crimeType: '',
    description: '',
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFIR, setGeneratedFIR] = useState<string | null>(null);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateFIR = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const requiredFields = [
      'complainantName', 
      'complainantAddress', 
      'complainantPhone',
      'incidentDate',
      'incidentLocation',
      'crimeType',
      'description'
    ];
    
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate FIR generation
    setTimeout(() => {
      setIsGenerating(false);
      
      // Generate FIR text
      const firText = `
FIRST INFORMATION REPORT (FIR)
===============================

FIR Number: ${Math.floor(Math.random() * 1000) + 100}/${new Date().getFullYear()}
Date of Filing: ${new Date().toLocaleDateString()}
Time of Filing: ${new Date().toLocaleTimeString()}

COMPLAINANT DETAILS:
-------------------
Name: ${formData.complainantName}
Address: ${formData.complainantAddress}
Contact Number: ${formData.complainantPhone}

INCIDENT DETAILS:
----------------
Date of Incident: ${formData.incidentDate}
Time of Incident: ${formData.incidentTime || 'Not specified'}
Location: ${formData.incidentLocation}
Type of Crime/Incident: ${formData.crimeType}

DESCRIPTION:
-----------
${formData.description}

PRELIMINARY ACTION TAKEN:
------------------------
- FIR registered under Section ${getRandomSections(formData.crimeType)}
- Investigation initiated
- Crime scene to be examined
- Witnesses to be interviewed
- Evidence collection procedures initiated

OFFICER DETAILS:
--------------
Recorded by: Officer [OFFICER NAME]
Badge Number: [BADGE NUMBER]
Police Station: [STATION NAME]

NOTE: This is a computer-generated FIR. This document serves as the official record of the initial report of the incident. Further investigation will follow as per legal procedures.

Signature of Complainant                    Signature of Recording Officer
____________________                        ____________________
      `;
      
      setGeneratedFIR(firText);
      
      toast({
        title: "FIR Generated",
        description: "First Information Report has been successfully generated.",
        duration: 3000
      });
    }, 2000);
  };

  const getRandomSections = (crimeType: string) => {
    const sections: Record<string, string[]> = {
      'theft': ['379', '380', '381'],
      'assault': ['323', '324', '326'],
      'fraud': ['420', '465', '468'],
      'harassment': ['354', '354A', '509'],
      'property_damage': ['425', '426', '427'],
      'cybercrime': ['66', '66C', '66D'],
      'other': ['107', '144', '151']
    };
    
    const selectedCrime = crimeType.toLowerCase().replace(' ', '_');
    const applicableSections = sections[selectedCrime] || sections.other;
    
    return applicableSections.slice(0, 2).join(', ');
  };

  const downloadFIR = () => {
    if (!generatedFIR) return;
    
    // Create a blob from the FIR text
    const blob = new Blob([generatedFIR], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `FIR_${formData.complainantName.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your FIR file is being downloaded.",
      duration: 3000
    });
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FIR Form */}
        <div className="space-y-6">
          <form onSubmit={generateFIR} className="space-y-4">
            <div className="space-y-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-medium mb-4">Complainant Details</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complainantName">Full Name *</Label>
                  <Input 
                    id="complainantName"
                    name="complainantName"
                    value={formData.complainantName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="complainantAddress">Address *</Label>
                  <Textarea 
                    id="complainantAddress"
                    name="complainantAddress"
                    value={formData.complainantAddress}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                    className="h-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="complainantPhone">Phone Number *</Label>
                  <Input 
                    id="complainantPhone"
                    name="complainantPhone"
                    value={formData.complainantPhone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-medium mb-4">Incident Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="incidentDate">Date of Incident *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input 
                      id="incidentDate"
                      name="incidentDate"
                      type="date"
                      value={formData.incidentDate}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="incidentTime">Time of Incident (if known)</Label>
                  <Input 
                    id="incidentTime"
                    name="incidentTime"
                    type="time"
                    value={formData.incidentTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="incidentLocation">Location of Incident *</Label>
                <Input 
                  id="incidentLocation"
                  name="incidentLocation"
                  value={formData.incidentLocation}
                  onChange={handleInputChange}
                  placeholder="Enter the specific location where the incident occurred"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="crimeType">Type of Crime/Incident *</Label>
                <Select 
                  value={formData.crimeType} 
                  onValueChange={(value) => handleSelectChange('crimeType', value)}
                >
                  <SelectTrigger id="crimeType">
                    <SelectValue placeholder="Select crime type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Theft/Robbery</SelectItem>
                    <SelectItem value="assault">Assault/Battery</SelectItem>
                    <SelectItem value="fraud">Fraud/Cheating</SelectItem>
                    <SelectItem value="harassment">Harassment/Stalking</SelectItem>
                    <SelectItem value="property_damage">Property Damage</SelectItem>
                    <SelectItem value="cybercrime">Cybercrime</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description of the Incident *</Label>
                <Textarea 
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide a detailed description of what happened, including the sequence of events, people involved, and any other relevant details"
                  className="h-32"
                />
              </div>
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating FIR...
                </>
              ) : (
                'Generate FIR'
              )}
            </Button>
          </form>
        </div>
        
        {/* Generated FIR */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 min-h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium">Generated FIR</h3>
            
            {generatedFIR && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={downloadFIR}
              >
                <Download size={16} />
                Download
              </Button>
            )}
          </div>
          
          {isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <Loader2 className="h-8 w-8 text-indigo-500 animate-spin mb-4" />
              <h4 className="text-lg font-medium mb-2">Generating your FIR</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Please wait while we prepare your First Information Report...
              </p>
            </div>
          ) : generatedFIR ? (
            <div className="flex-1 overflow-auto font-mono text-sm whitespace-pre-wrap bg-gray-50 dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
              {generatedFIR}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <FileText className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
              <h4 className="text-lg font-medium mb-2">No FIR Generated Yet</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Fill out the form and click 'Generate FIR' to create a First Information Report
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FIRGenerator;
