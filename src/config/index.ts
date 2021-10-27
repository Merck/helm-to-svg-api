import { config, ColorSchema } from '@peptidesar/helm-visualisation';

import schemas from './color-schemas';

export enum ColorSchemas {
  default = 'spotfire',
  charge = 'charge',
  cinema = 'cinema',
  clustal = 'clustal',
  lesk = 'lesk',
  maeditor = 'maeditor',
  natural = 'natural',
  rasmol = 'rasmol',
  shapely = 'shapely',
  spotfire = 'spotfire',
  spotfireplus = 'spotfireplus',
  spotfirekelly8 = 'spotfirekelly8',
  spotfirekelly = 'spotfirekelly',
  spotfireuaa = 'spotfireuaa',
}

export const mapParameterToConfig: { [key in ColorSchemas]: ColorSchema } = {
  [ColorSchemas.default]: config.colorSchema,
  [ColorSchemas.charge]: schemas.charge,
  [ColorSchemas.cinema]: schemas.cinema,
  [ColorSchemas.clustal]: schemas.clustal,
  [ColorSchemas.lesk]: schemas.lesk,
  [ColorSchemas.maeditor]: schemas.maeditor,
  [ColorSchemas.natural]: schemas.natural,
  [ColorSchemas.rasmol]: schemas.rasmol,
  [ColorSchemas.shapely]: schemas.shapely,
  [ColorSchemas.spotfire]: schemas.spotfire,
  [ColorSchemas.spotfireplus]: schemas.spotfireplus,
  [ColorSchemas.spotfirekelly8]: schemas.spotfirekelly8,
  [ColorSchemas.spotfirekelly]: schemas.spotfirekelly,
  [ColorSchemas.spotfireuaa]: schemas.spotfireuaa,
};
