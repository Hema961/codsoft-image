import React, { useState, useCallback } from 'react';
import { Camera } from 'lucide-react';
import { ImageUploader } from './components/ImageUploader';
import { CaptionResult } from './components/CaptionResult';
import { sampleImages } from './data/sampleImages';
import type { CaptionResult as CaptionResultType } from './types';

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [captionResult, setCaptionResult] = useState<CaptionResultType | null>(null);

  const simulateImageProcessing = useCallback(async () => {
    setIsProcessing(true);
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const randomSample = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setCaptionResult({
      mainCaption: randomSample.caption,
      alternativeCaptions: [
        "A stunning view of nature's beauty captured in perfect lighting",
        "An impressive display of natural wonders in their full glory",
        "A breathtaking scene that showcases Earth's magnificent landscapes"
      ],
      confidence: randomSample.confidence
    });
    setIsProcessing(false);
  }, []);

  const handleImageSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string);
      simulateImageProcessing();
    };
    reader.readAsDataURL(file);
  }, [simulateImageProcessing]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Camera className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Image Caption Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image and let our AI generate detailed, accurate captions.
            Experience the power of computer vision and natural language processing.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <ImageUploader onImageSelect={handleImageSelect} />

          {selectedImage && (
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={selectedImage}
                  alt="Uploaded preview"
                  className="w-full h-auto"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
                  </div>
                )}
              </div>

              {captionResult && <CaptionResult result={captionResult} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;