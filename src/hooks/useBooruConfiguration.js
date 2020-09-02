import { useState, useEffect } from 'react';
import { BooruConfigurationLoader } from '../services/BooruConfiguration/BooruConfigurationLoader';

export const useBooruConfiguration = () => {
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
        const updatedConfigs = prevConfigs.slice();
        updatedConfigs[index].isEnabled = !updatedConfigs[index].isEnabled;
        return updatedConfigs;
      });
    }
  };

  const actions = { toggleConfig };

  return [configs, actions];
}
