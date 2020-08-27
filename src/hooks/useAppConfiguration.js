
import { useState } from 'react';

export default function useAppConfiguration() {
  const [config,] = useState({
    maxPostQueue: 3,
  })

  return config;
}