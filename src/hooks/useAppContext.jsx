import { useContext } from 'react';
import { AppContext } from '../hoc/AppProvider';

export default function useAppContext() {
  return useContext(AppContext);
}
