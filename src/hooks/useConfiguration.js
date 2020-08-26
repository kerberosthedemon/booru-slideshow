import { useState, useEffect } from 'react';
import { BooruConfigurationLoader } from '../services/BooruConfiguration/BooruConfigurationLoader';

export const useConfiguration = () => {
  const [configs, setConfigs] = useState([]);

  useEffect(() => {
    const configsFromFile = BooruConfigurationLoader.loadConfigurations();

    if (configsFromFile && configsFromFile.length) {
      setConfigs(configsFromFile);
    }
  }, []);

  const toggleConfig = (index) => {
    if (configs[index]) {
      setConfigs((prevConfigs) => {
        prevConfigs[index].isEnabled = !prevConfigs[index].isEnabled;
      });
    }
  };

  const actions = { toggleConfig };

  return [configs, actions];
}
