export interface CocomoModes {
  name: string;
  mode: string;
}

export interface CocomoRating {
  name: string;
  rating: string;
}

export interface CocomoResponse {
  adjustedTime: number;
  developmentTime: number;
  staffingTime: number;
  totalHours: number;
}

export class CocomoRequest {
  linesOfCode: number = 0;
  model: string = '';

  requiredSoftwareReliability: string = '';
  sizeOfApplicationDatabase: string = '';
  complexityOfProduct: string = '';
  runtimePerformanceConstraints: string = '';
  memoryConstraints: string = '';
  volatilityOfEnvironment: string = '';
  requiredTurnaroundTime: string = '';
  analystCapability: string = '';
  applicationExperience: string = '';
  softwareEngineerAbility: string = '';
  environmentExperience: string = '';
  programmingLanguageExperience: string = '';
  applicationOfSoftwareEngineeringMethods: string = '';
  useOfSoftwareTools: string = '';
  requiredDevelopmentSchedule: string = '';

  [key: string]: any;
}
