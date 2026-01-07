export interface SelectionItem {
  id: string;
  label: string;
  description?: string;
}

export interface CategoryGroup {
  id: string;
  title: string;
  selectionType: 'single' | 'multi';
  items: SelectionItem[];
}

export interface PromptSelections {
  cameraType: string[]; // New Camera & Lens Category
  cameraMovement: string[];
  cameraAngle: string[];
  lighting: string[];
  lens: string[];
  filmStock: string[];
  director: string[];
  details: string[];
  aspectRatio: string[];
  composition: string[];
  shutter: string[];
  colorGrade: string[];
}

export interface GeneratedPrompt {
  title: string;
  visual_analysis: string;
  scene_action: string;
  technical_specifications: {
    camera: string;
    lighting: string;
    movement: string;
    atmosphere: string;
  };
  video_generation_prompt: string;
  negative_prompt: string;
  suggested_settings: {
    motion_bucket_id: number;
    fps: number;
  };
}

export interface SavedPrompt extends GeneratedPrompt {
  id: string;
  savedAt: number;
}

export interface PresetProfile {
  id: string;
  name: string;
  selections: PromptSelections;
  createdAt: number;
}

export type GalleryCategory = 'all' | 'cinematic' | 'anime' | 'product' | '3d' | 'nature';

export interface ViralExample extends GeneratedPrompt {
  id: string;
  thumbnail: string;
  categoryLabel: string; // For display
  category: GalleryCategory; // For logic
}

export type SelectionCategory = keyof PromptSelections;