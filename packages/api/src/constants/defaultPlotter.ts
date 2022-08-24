import PlotterName from './PlotterName';
import optionsForPlotter from '../utils/optionsForPlotter';
import defaultsForPlotter from '../utils/defaultsForPlotter';

export default {
  displayName: 'Cactus Proof of Space',
  options: optionsForPlotter(PlotterName.Chiapos),
  defaults: defaultsForPlotter(PlotterName.Chiapos),
  installInfo: { installed: true },
};
