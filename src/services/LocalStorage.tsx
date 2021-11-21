import React from 'react';
import { ID } from '../utils/constants';

function getItem(key: string): any {
   return window.localStorage.getItem(ID + '.' + key);
}

function setItem(key: string, value: any): void {
   window.localStorage.setItem(ID + '.' + key, value);
}

function getMap(key: string): Map<any, any> {
   const value = window.localStorage.getItem(ID + '.' + key);
   return new Map(JSON.parse(value || '[]'));
}

function setMap(key: string, map: Map<any, any>): void {
   const value = JSON.stringify(Array.from(map.entries()));
   window.localStorage.setItem(ID + '.' + key, value);
}

function removeItem(key: string): void {
   window.localStorage.removeItem(ID + '.' + key);
}

export const LocalStorage = {
   getItem,
   setItem,
   getMap,
   setMap,
   removeItem,
};
