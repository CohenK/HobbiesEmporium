import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  setData(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
  getData(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setObjectWithMap(key: string, obj: any): void {
    const serializedObject = JSON.stringify(obj, (k, v) => {
      if (v instanceof Map) {
        // Convert Map to an array of key-value pairs
        return { __isMap: true, data: Array.from(v.entries()) };
      }
      return v;
    });
    sessionStorage.setItem(key, serializedObject);
  }

  getObjectWithMap(key: string): any {
    const serializedObject = sessionStorage.getItem(key);
    if (!serializedObject) return null;

    return JSON.parse(serializedObject, (k, v) => {
      if (v && v.__isMap) {
        // Convert back to Map
        return new Map(v.data);
      }
      return v;
    });
  }

  removeData(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
