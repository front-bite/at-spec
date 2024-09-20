import type { AppDispatch, RootState } from '../store';

import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

/** Типизация стандартного dispatch. */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Типизация стандартного useSelector. */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
