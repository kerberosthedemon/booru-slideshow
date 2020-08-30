
import { useEffect, useState } from 'react';

export default function useArrayStateWithCallback(array, callbackFunction) {
  const [previousLength, setPreviousLength] = useState(array.length);
  const onArrayLengthChanged = () => { };

  useEffect(() => {
    if (array.length !== previousLength) {
      callbackFunction()
      setPreviousLength(array.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [array])

  return onArrayLengthChanged;
}