
import React, { useEffect } from 'react';

export default function useFocusOnStart() {
  const ref = React.createRef();

  useEffect(() => {
    ref.current.focus();
  }, [ref]);

  return ref;
};
