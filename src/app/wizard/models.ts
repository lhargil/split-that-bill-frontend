import { Type } from '@angular/core';

export interface WizardStep {
  id: number;
  stepName: string;
  isDone: boolean;
  isActive: boolean;
  component: Type<any>;
}
