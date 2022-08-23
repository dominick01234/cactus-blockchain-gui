import PlotterName from './PlotterName';
import optionsForPlotter from '../utils/optionsForPlotter';
import defaultsForPlotter from '../utils/defaultsForPlotter';

export default {
  displayName: 'Cactus Proof of Space',
  options: optionsForPlotter(PlotterName.CACTUSPOS),
  defaults: defaultsForPlotter(PlotterName.CACTUSPOS),
  installInfo: { installed: true },
};
