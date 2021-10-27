import sharp from 'sharp';
import {
  parse,
  generateSVG,
  setConfig,
  resetConfig,
} from '@peptidesar/helm-visualisation';

import { ColorSchemas, mapParameterToConfig } from '../../config';

export default async function transformHELMtoImageService(
  HELMString: string,
  compareWith?: string,
  seqIndex?: number,
  linear?: boolean,
  usePNG?: boolean,
  colorSchemaName = ColorSchemas.default,
): Promise<string | Buffer> {
  const colorSchema = mapParameterToConfig[colorSchemaName] || mapParameterToConfig.default;
  setConfig({ colorSchema });

  try {
    const parsedData = parse(HELMString);
    const comparisonData = compareWith ? parse(compareWith).sequences : undefined;

    const svg = generateSVG(parsedData, comparisonData, seqIndex, linear);
    let result: string | Buffer = svg.outerHTML;

    if (usePNG) {
      result = await sharp(Buffer.from(result))
        .png()
        .toBuffer();
    }

    return result;
  } finally {
    resetConfig();
  }
}
