import React from 'react';
import { CaptionResult } from '../types';
import { Brain, ChevronRight } from 'lucide-react';

interface CaptionResultProps {
  result: CaptionResult;
}

export function CaptionResult({ result }: CaptionResultProps) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <Brain className="w-6 h-6 text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-800">AI Generated Caption</h3>
      </div>
      
      <div className="p-4 bg-purple-50 rounded-lg">
        <p className="text-lg text-gray-800 font-medium">{result.mainCaption}</p>
        <div className="mt-2 flex items-center">
          <div className="flex-1 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-purple-500 rounded-full"
              style={{ width: `${result.confidence * 100}%` }}
            />
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {Math.round(result.confidence * 100)}% confidence
          </span>
        </div>
      </div>

      {result.alternativeCaptions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Alternative Captions:</h4>
          {result.alternativeCaptions.map((caption, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-600">
              <ChevronRight className="w-4 h-4" />
              <p className="text-sm">{caption}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}