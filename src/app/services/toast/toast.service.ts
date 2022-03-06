import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  constructor() {
  }

  showSuccess(message: string) {
    const options = {
      classname: 'bg-success text-light',
      delay: 8000
    }
    this.toasts.push({ textOrTpl: message, ...options });
  }

  showError(message: string) {
    const options = {
      classname: 'bg-danger text-light',
      delay: 8000
    }
    this.toasts.push({ textOrTpl: message, ...options });
  }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
