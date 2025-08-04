import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

interface TitleContext {
  title: string | undefined;
  setTitle: (title: string | undefined) => void;
}

export function useTitle(title: string | undefined) {
  const { setTitle } = useOutletContext<TitleContext>();

  useEffect(() => {
    setTitle(title);
  }, [title]);
}
