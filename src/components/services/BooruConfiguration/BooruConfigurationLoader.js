import * as booruConfigs from './Booru.config.json';
import { BooruConfiguration } from '../../model/BooruConfiguration';

export class BooruConfigurationLoader {
  static loadConfigurations = () => {
    const booruConfigsRaw = booruConfigs;
    return booruConfigsRaw.map(config => { return Object.assign(new BooruConfiguration(), config); });
  }
}