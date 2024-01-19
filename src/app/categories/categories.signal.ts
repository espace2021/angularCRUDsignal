import { signal } from '@angular/core';
import { Category } from './category';

export const categories = signal<Category[]>([]);

export const idValue = signal<number>(0);