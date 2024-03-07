import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class SessionHelper implements Storage {
  protected readonly prefix: string = '';
  protected readonly _SessionStorage: Storage;

  public get length(): number {
    return localStorage.length;
  }
  
  public constructor() {
    this._SessionStorage = sessionStorage;
  }

  public setItem(key: string, value: any): void {
    this._SessionStorage.setItem(key, JSON.stringify({ value }));
  }

  public getItem<T>(key: string): T | null {
    const data: string | null = this._SessionStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data).value;
    }
    return null;
  }

  public removeItem(key: string): void {
    this._SessionStorage.removeItem(key);
  }

  public clear(): void {
    this._SessionStorage.clear();
  }

  public key(index: number): string | null {
    return this._SessionStorage.key(index);
  }
}