import { useAppManagement } from './useAppManagement';

export function useAppText() {
  const { getText } = useAppManagement();

  return {
    getText,
    t: getText
  };
}
