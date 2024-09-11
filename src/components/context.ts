import { collections } from '@wix/stores';
import { createContext } from 'react';

export const ProductCategoriesContext = createContext<collections.Collection[]>([]);
