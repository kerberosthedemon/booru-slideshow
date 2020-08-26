
import React, { useEffect } from 'react';

export default function useFocusElementOnStart() {
  const ref = React.createRef();

  const focus = () => {
    ref.current.focus()
  };

  useEffect(() => {
    focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
};
