import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export function useTitle(title: string | undefined) {
  const { setTitle } = useOutletContext<{
    title: string | undefined;
    setTitle: (title: string | undefined) => void;
  }>();

  useEffect(() => {
    setTitle(title);
  }, [title]);
}
