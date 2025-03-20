
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { FileUp, FileText, FileX, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentAnalyzerProps {
  className?: string;
}

const DocumentAnalyzer: React.FC<DocumentAnalyzerProps> = ({ className }) => {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleFileUpload = (uploadedFile: File) => {
    // Check file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!validTypes.includes(uploadedFile.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, Word document, or text file.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    // Check file size (10MB limit)
    if (uploadedFile.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setFile(uploadedFile);
    setAnalysis(null);
    
    toast({
      title: "File uploaded",
      description: `${uploadedFile.name} has been uploaded successfully.`,
      duration: 3000
    });
  };

  const removeFile = () => {
    setFile(null);
    setAnalysis(null);
  };

  const analyzeDocument = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a document to analyze.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    if (!question.trim()) {
      toast({
        title: "No question provided",
        description: "Please enter a question about the document.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate document analysis
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock analysis result
      let mockAnalysis = "";
      
      if (file.name.toLowerCase().includes('contract')) {
        mockAnalysis = `Analysis of ${file.name}:\n\n`;
        mockAnalysis += "This appears to be a standard employment contract with the following key provisions:\n\n";
        mockAnalysis += "1. Non-compete clause extending 12 months after termination\n";
        mockAnalysis += "2. Intellectual property assignment clause in Section 4\n";
        mockAnalysis += "3. Mandatory arbitration clause in Section 9\n\n";
        mockAnalysis += "Regarding your question: ";
        
        if (question.toLowerCase().includes('terminate')) {
          mockAnalysis += "The contract can be terminated with 30 days written notice by either party. Additionally, immediate termination is permitted in cases of material breach.";
        } else if (question.toLowerCase().includes('intellectual property') || question.toLowerCase().includes('ip')) {
          mockAnalysis += "All intellectual property created during employment belongs to the company, including inventions, code, designs, and creative works.";
        } else {
          mockAnalysis += "The document contains standard legal language that is generally enforceable, but I recommend consulting with a specialized attorney for specific advice regarding your situation.";
        }
      } else {
        mockAnalysis = `Analysis of ${file.name}:\n\n`;
        mockAnalysis += "Based on my review of this document, here are the key findings:\n\n";
        mockAnalysis += "1. The document appears to be a legal " + (file.name.toLowerCase().includes('agreement') ? "agreement" : "document") + "\n";
        mockAnalysis += "2. There are potential areas requiring further clarification in sections 3 and 7\n";
        mockAnalysis += "3. The language used is standard legal terminology with no unusual provisions\n\n";
        mockAnalysis += "Regarding your question: The document addresses this matter in a standard fashion, but I would recommend seeking personalized legal advice for your specific situation.";
      }
      
      setAnalysis(mockAnalysis);
    }, 3000);
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div 
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-all",
              dragActive ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20" : "border-gray-300 dark:border-gray-700",
              !file && "h-64 flex flex-col items-center justify-center"
            )}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <FileUp className="h-10 w-10 text-gray-400 dark:text-gray-600 mb-4" />
                <h3 className="text-lg font-medium mb-2">Upload your document</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Drag and drop your file here, or click to browse</p>
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Browse files
                </Button>
                <Input 
                  id="file-upload" 
                  type="file" 
                  accept=".pdf,.doc,.docx,.txt" 
                  className="hidden" 
                  onChange={handleFileChange}
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Supports PDF, Word, and Text files (max 10MB)
                </p>
              </>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-indigo-500" />
                  <div className="text-left">
                    <p className="font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={removeFile} 
                  className="text-gray-500 hover:text-red-500"
                >
                  <FileX size={18} />
                </Button>
              </div>
            )}
          </div>
          
          <form onSubmit={analyzeDocument} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="question">What would you like to know about this document?</Label>
              <Textarea 
                id="question" 
                placeholder="e.g., What are the termination clauses in this contract?" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="h-32"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
              disabled={!file || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing document...
                </>
              ) : (
                'Analyze Document'
              )}
            </Button>
          </form>
        </div>
        
        {/* Analysis Results */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 min-h-[400px] flex flex-col">
          <h3 className="text-lg font-medium mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">Analysis Results</h3>
          
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <Loader2 className="h-8 w-8 text-indigo-500 animate-spin mb-4" />
              <h4 className="text-lg font-medium mb-2">Analyzing your document</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This may take a moment depending on the document size...
              </p>
            </div>
          ) : analysis ? (
            <div className="flex-1 overflow-auto">
              <div className="prose prose-indigo dark:prose-invert max-w-none">
                {analysis.split('\n').map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "font-medium" : ""}>{paragraph}</p>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <FileText className="h-12 w-12 text-gray-300 dark:text-gray-700 mb-4" />
              <h4 className="text-lg font-medium mb-2">No analysis yet</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload a document and ask a question to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;
