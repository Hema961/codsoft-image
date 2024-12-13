export interface ImageData {
  id: string;
  url: string;
  caption: string;
  confidence: number;
}

export interface CaptionResult {
  mainCaption: string;
  alternativeCaptions: string[];
  confidence: number;
}