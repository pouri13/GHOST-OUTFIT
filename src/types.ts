export type CameraViewMode = 
  | 'perspective' 
  | 'front' 
  | 'back' 
  | 'left' 
  | 'right' 
  | 'mask-close' 
  | 'vest-close' 
  | 'boots-close';

export type ShadingMode = 
  | 'pbr' 
  | 'wireframe' 
  | 'bone-weights' 
  | 'gta-slots' 
  | 'clay';

export type LightingPreset = 
  | 'night-ops' 
  | 'tactical-bunker' 
  | 'los-santos' 
  | 'studio-neutral';

export interface ModularComponentSpec {
  id: string;
  name: string;
  category: string;
  gtaSlot: string;
  gtaDictionaryCode: string;
  polyCountTris: number;
  textureRes: string;
  materialName: string;
  riggingBones: string[];
  attachmentMethod: string;
  clippingStrategy: string;
  keyFeatures: string[];
  originalityNotes: string;
}

export interface MaterialSpec {
  id: string;
  name: string;
  type: string;
  baseColorHex: string;
  roughness: number;
  metalness: number;
  normalDetail: string;
  gtaShader: string;
  description: string;
}

export interface QCCheckItem {
  id: string;
  category: 'geometry' | 'rigging' | 'materials' | 'gtav' | 'aesthetic';
  title: string;
  description: string;
  requirement: string;
  passed: boolean;
  notes?: string;
}

export interface BlenderScriptData {
  id: string;
  filename: string;
  title: string;
  description: string;
  pythonCode: string;
  instructions: string[];
}
