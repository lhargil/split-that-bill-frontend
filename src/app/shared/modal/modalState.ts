import { Type } from '@angular/core';

export const enum ModalModes {
  create,
  update
}

export interface ModalState {
  heading: string;
  formData: any;
  dialog: {
    heading: string;
    message: string;
  };
  modalMode: ModalModes;
  component: Type<any>;
  handleSave: (eventData) => void;
  handleDelete?: (eventData) => void;
}
