import { Request, Response } from 'express';

import { ColorSchemas } from '../../config';
import transformHELMtoImageService from '../../services/transformer';

export async function transformHELMtoSVG(req: Request, res: Response): Promise<void> {
  const helm = decodeURI(req.path.split('/transform-helm-to-svg/')[1]);

  const {
    compareWith,
    seqIndexFrom,
    linear,
    usePNG,
    colorSchema,
  } = req.query;

  const parsedCompareWith = compareWith?.toString();
  const parsedColorSchema = colorSchema?.toString() as ColorSchemas;
  let parsedSeqIndexFrom = Number(seqIndexFrom) || undefined;
  const parsedLinear = linear ? linear === 'true' : undefined;
  const parsedUsePNG = usePNG ? usePNG === 'true' : undefined;
  const parsedHELM = helm.split('&');

  let images;

  try {
    images = await Promise.all(parsedHELM.map((h: string) => {
      const image = transformHELMtoImageService(
        h,
        parsedCompareWith,
        parsedSeqIndexFrom,
        parsedLinear,
        parsedUsePNG,
        parsedColorSchema,
      );

      if (parsedSeqIndexFrom) {
        parsedSeqIndexFrom += 1;
      }

      return image;
    }));
  } catch {
    res.status(400);
    res.send('An error has occurred while handling request parameters. Please check the request');
    return;
  }

  if (images.length === 1) {
    res.set('Content-Type', 'image/svg+xml');
    if (parsedUsePNG) {
      res.set('Content-Type', 'image/png');
    }

    res.send(images[0]);
    return;
  }

  if (images.length > 1) {
    res.set('Content-Type', 'application/json');
    res.send(images);
    return;
  }

  res.status(400);
  res.send('No HELM string was found. Please check the request');
}
