
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface GeneratedSvg {
  id: string;
  content: string;
  prompt: string;
  timestamp: number;
}

export interface ApiError {
  message: string;
  details?: string;
}

export interface EventInfrastructure {
  type: string;
  description: string;
  prompt: string;
}

export interface EventData {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  image: string;
  infrastructure: EventInfrastructure[];
}
