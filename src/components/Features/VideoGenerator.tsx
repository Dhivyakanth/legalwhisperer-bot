
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { Video, Play, Pause, Loader2, Settings, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoGeneratorProps {
  className?: string;
}

const VideoGenerator: React.FC<VideoGeneratorProps> = ({ className }) => {
  const [scenario, setScenario] = useState('');
  const [videoStyle, setVideoStyle] = useState('realistic');
  const [duration, setDuration] = useState([30]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const handleGenerateVideo = () => {
    if (!scenario.trim()) {
      toast({
        title: "Missing scenario",
        description: "Please provide a detailed scenario for the video.",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setIsGenerating(true);
    setVideoReady(false);
    
    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
      setVideoReady(true);
      
      toast({
        title: "Video Generated",
        description: "Your scenario has been converted into a reconstruction video.",
        duration: 3000
      });
    }, 5000);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const downloadVideo = () => {
    toast({
      title: "Download started",
      description: "Your video file is being downloaded.",
      duration: 3000
    });
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Video Settings */}
        <div className="space-y-6">
          <div className="space-y-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Video Parameters
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scenario">Event Scenario Description</Label>
                <Textarea 
                  id="scenario"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  placeholder="Describe the incident in detail, including the sequence of events, people involved, and the environment where it took place..."
                  className="h-32"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="videoStyle">Video Style</Label>
                <Select value={videoStyle} onValueChange={setVideoStyle}>
                  <SelectTrigger id="videoStyle">
                    <SelectValue placeholder="Select video style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="animated">Animated</SelectItem>
                    <SelectItem value="sketch">Sketch Style</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="duration">Video Duration (seconds)</Label>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{duration[0]}s</span>
                </div>
                <Slider 
                  id="duration"
                  min={15} 
                  max={120} 
                  step={5} 
                  value={duration} 
                  onValueChange={setDuration} 
                />
              </div>
              
              <Button 
                onClick={handleGenerateVideo}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Video...
                  </>
                ) : (
                  'Generate Video'
                )}
              </Button>
            </div>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-medium mb-4">Tips for Better Results</h3>
            
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                <span>Be specific about the location, time of day, and weather conditions</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                <span>Clearly describe the appearances and actions of all individuals involved</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                <span>Provide details about any vehicles, weapons, or other important objects</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                <span>Include dialogue or verbal exchanges if relevant to the incident</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2">•</span>
                <span>Describe the sequence of events in chronological order</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Video Player */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h3 className="text-lg font-medium flex items-center">
              <Video className="mr-2 h-5 w-5" />
              Video Preview
            </h3>
            
            {videoReady && (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={downloadVideo}
              >
                <Download size={16} />
                Download
              </Button>
            )}
          </div>
          
          <div className="flex-1 bg-gray-900 flex items-center justify-center overflow-hidden min-h-[300px] relative">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center text-center p-8">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs">
                    {Math.floor(Math.random() * 100)}%
                  </div>
                </div>
                <h4 className="text-lg font-medium mb-2 mt-4 text-white">Generating your video</h4>
                <p className="text-sm text-gray-400">
                  This may take a few moments...
                </p>
              </div>
            ) : videoReady ? (
              <>
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Placeholder for the video - in a real app, this would be an actual video element */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        {/* Semi-transparent overlay for fake video content */}
                        <div className="absolute inset-0 overflow-hidden opacity-30">
                          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNTAgMCBMIDAgMCAwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9ImdyYXkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center">
                          {!isPlaying && (
                            <div className="bg-black/60 rounded-full p-3">
                              <Play className="h-6 w-6 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center space-x-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/20"
                    onClick={togglePlayPause}
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </Button>
                  
                  <div className="relative w-full h-1 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-indigo-500 rounded-full" 
                      style={{ width: isPlaying ? '45%' : '0%', transition: 'width 0.1s linear' }}
                    ></div>
                  </div>
                  
                  <span className="text-white text-xs">
                    {isPlaying ? '00:13' : '00:00'} / {duration[0] < 60 
                      ? `00:${duration[0]}` 
                      : `0${Math.floor(duration[0] / 60)}:${duration[0] % 60 < 10 ? '0' + duration[0] % 60 : duration[0] % 60}`}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8">
                <Video className="h-12 w-12 text-gray-700 mb-4" />
                <h4 className="text-lg font-medium mb-2 text-white">No Video Generated Yet</h4>
                <p className="text-sm text-gray-400">
                  Enter scenario details and click 'Generate Video' to create a reconstruction
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGenerator;
