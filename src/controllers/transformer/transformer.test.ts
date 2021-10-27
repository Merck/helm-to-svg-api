const mockService = jest.fn(() => true) as jest.Mock;
jest.mock('../../services/transformer', () => mockService);

import { transformHELMtoSVG } from '.';

const res: any = {
  send: jest.fn(() => undefined) as jest.Mock,
  set: jest.fn(() => undefined) as jest.Mock,
};

const pathPrefix = '/transform-helm-to-svg/';
const HELMString = 'some HELM';

describe('transformHELMtoSVG', () => {
  afterEach(() => {
    mockService.mockClear();
    res.send.mockClear();
    res.set.mockClear();
  });

  it('without query params', async () => {
    const req: any = {
      path: `${pathPrefix}${HELMString}`,
      query: {},
    };

    await transformHELMtoSVG(req, res);

    expect(res.send.mock.calls.length).toEqual(1);
    expect(res.send.mock.calls[0][0]).toBeTruthy();

    expect(mockService.mock.calls.length).toEqual(1);
    expect(mockService.mock.calls[0][0]).toEqual(HELMString);
    expect(mockService.mock.calls[0][1]).toBeUndefined();
    expect(mockService.mock.calls[0][2]).toBeUndefined();
    expect(mockService.mock.calls[0][3]).toBeUndefined();
    expect(mockService.mock.calls[0][4]).toBeUndefined();
  });

  it('with query params', async () => {
    const req: any = {
      path: `${pathPrefix}${HELMString}`,
      query: {
        compareWith: 'qwe',
        seqIndexFrom: 1,
      },
    };

    await transformHELMtoSVG(req, res);

    expect(res.send.mock.calls.length).toEqual(1);
    expect(res.send.mock.calls[0][0]).toBeTruthy();

    expect(mockService.mock.calls.length).toEqual(1);
    expect(mockService.mock.calls[0][0]).toEqual(HELMString);
    expect(mockService.mock.calls[0][1]).toEqual(req.query.compareWith);
    expect(mockService.mock.calls[0][2]).toEqual(1);
    expect(mockService.mock.calls[0][3]).toBeUndefined();
    expect(mockService.mock.calls[0][4]).toBeUndefined();
  });

  it('with false linear', async () => {
    const req: any = {
      path: `${pathPrefix}${HELMString}`,
      query: {
        linear: 'false',
      },
    };

    await transformHELMtoSVG(req, res);

    expect(res.send.mock.calls.length).toEqual(1);
    expect(res.send.mock.calls[0][0]).toBeTruthy();

    expect(mockService.mock.calls.length).toEqual(1);
    expect(mockService.mock.calls[0][0]).toEqual(HELMString);
    expect(mockService.mock.calls[0][1]).toBeUndefined();
    expect(mockService.mock.calls[0][2]).toBeUndefined();
    expect(mockService.mock.calls[0][3]).toBeFalsy();
    expect(mockService.mock.calls[0][4]).toBeUndefined();
  });

  it('with true linear', async () => {
    const req: any = {
      path: `${pathPrefix}${HELMString}`,
      query: {
        linear: 'true',
      },
    };

    await transformHELMtoSVG(req, res);

    expect(res.send.mock.calls.length).toEqual(1);
    expect(res.send.mock.calls[0][0]).toBeTruthy();

    expect(mockService.mock.calls.length).toEqual(1);
    expect(mockService.mock.calls[0][0]).toEqual(HELMString);
    expect(mockService.mock.calls[0][1]).toBeUndefined();
    expect(mockService.mock.calls[0][2]).toBeUndefined();
    expect(mockService.mock.calls[0][3]).toBeTruthy();
    expect(mockService.mock.calls[0][4]).toBeUndefined();
  });

  it('with true usePNG', async () => {
    const req: any = {
      path: `${pathPrefix}${HELMString}`,
      query: {
        usePNG: 'true',
      },
    };

    await transformHELMtoSVG(req, res);

    expect(res.send.mock.calls.length).toEqual(1);
    expect(res.send.mock.calls[0][0]).toBeTruthy();

    expect(res.set.mock.calls.length).toEqual(2);
    expect(res.set.mock.calls[1][0]).toEqual('Content-Type');
    expect(res.set.mock.calls[1][1]).toEqual('image/png');

    expect(mockService.mock.calls.length).toEqual(1);
    expect(mockService.mock.calls[0][0]).toEqual(HELMString);
    expect(mockService.mock.calls[0][1]).toBeUndefined();
    expect(mockService.mock.calls[0][2]).toBeUndefined();
    expect(mockService.mock.calls[0][3]).toBeUndefined();
    expect(mockService.mock.calls[0][4]).toBeTruthy();
  });

  it('with false usePNG', async () => {
    const req: any = {
      path: `${pathPrefix}${HELMString}`,
      query: {
        usePNG: 'false',
      },
    };

    await transformHELMtoSVG(req, res);

    expect(res.send.mock.calls.length).toEqual(1);
    expect(res.send.mock.calls[0][0]).toBeTruthy();

    expect(res.set.mock.calls.length).toEqual(1);
    expect(res.set.mock.calls[0][0]).toEqual('Content-Type');
    expect(res.set.mock.calls[0][1]).toEqual('image/svg+xml');

    expect(mockService.mock.calls.length).toEqual(1);
    expect(mockService.mock.calls[0][0]).toEqual(HELMString);
    expect(mockService.mock.calls[0][1]).toBeUndefined();
    expect(mockService.mock.calls[0][2]).toBeUndefined();
    expect(mockService.mock.calls[0][3]).toBeUndefined();
    expect(mockService.mock.calls[0][4]).toBeFalsy();
  });

  it('with multiple HELM parameter', async () => {
    const req: any = {
      path: `${pathPrefix}${HELMString}&${HELMString}2`,
      query: {},
    };

    await transformHELMtoSVG(req, res);

    expect(res.send.mock.calls.length).toEqual(1);
    expect(res.send.mock.calls[0][0]).toBeTruthy();

    expect(res.set.mock.calls.length).toEqual(1);
    expect(res.set.mock.calls[0][0]).toEqual('Content-Type');
    expect(res.set.mock.calls[0][1]).toEqual('application/json');

    expect(mockService.mock.calls.length).toEqual(2);
    expect(mockService.mock.calls[0][0]).toEqual(HELMString);
    expect(mockService.mock.calls[0][1]).toBeUndefined();
    expect(mockService.mock.calls[0][2]).toBeUndefined();
    expect(mockService.mock.calls[0][3]).toBeUndefined();
    expect(mockService.mock.calls[0][4]).toBeUndefined();

    expect(mockService.mock.calls[1][0]).toEqual(`${HELMString}2`);
    expect(mockService.mock.calls[1][1]).toBeUndefined();
    expect(mockService.mock.calls[1][2]).toBeUndefined();
    expect(mockService.mock.calls[1][3]).toBeUndefined();
    expect(mockService.mock.calls[1][4]).toBeUndefined();
  });

  it('multiple HELM with usePNG', async () => {
    const req: any = {
      path: `${pathPrefix}${HELMString}&${HELMString}2`,
      query: {
        usePNG: 'true',
      },
    };

    await transformHELMtoSVG(req, res);

    expect(res.send.mock.calls.length).toEqual(1);
    expect(res.send.mock.calls[0][0]).toBeTruthy();

    expect(res.set.mock.calls.length).toEqual(1);
    expect(res.set.mock.calls[0][0]).toEqual('Content-Type');
    expect(res.set.mock.calls[0][1]).toEqual('application/json');

    expect(mockService.mock.calls.length).toEqual(2);
    expect(mockService.mock.calls[0][0]).toEqual(HELMString);
    expect(mockService.mock.calls[0][1]).toBeUndefined();
    expect(mockService.mock.calls[0][2]).toBeUndefined();
    expect(mockService.mock.calls[0][3]).toBeUndefined();
    expect(mockService.mock.calls[0][4]).toBeTruthy();

    expect(mockService.mock.calls[1][0]).toEqual(`${HELMString}2`);
    expect(mockService.mock.calls[1][1]).toBeUndefined();
    expect(mockService.mock.calls[1][2]).toBeUndefined();
    expect(mockService.mock.calls[1][3]).toBeUndefined();
    expect(mockService.mock.calls[1][4]).toBeTruthy();
  });

  it('multiple HELM with sequence index', async () => {
    const req: any = {
      path: `${pathPrefix}${HELMString}&${HELMString}2`,
      query: {
        seqIndexFrom: '5',
      },
    };

    await transformHELMtoSVG(req, res);

    expect(res.send.mock.calls.length).toEqual(1);
    expect(res.send.mock.calls[0][0]).toBeTruthy();

    expect(res.set.mock.calls.length).toEqual(1);
    expect(res.set.mock.calls[0][0]).toEqual('Content-Type');
    expect(res.set.mock.calls[0][1]).toEqual('application/json');

    expect(mockService.mock.calls.length).toEqual(2);
    expect(mockService.mock.calls[0][0]).toEqual(HELMString);
    expect(mockService.mock.calls[0][1]).toBeUndefined();
    expect(mockService.mock.calls[0][2]).toEqual(5);
    expect(mockService.mock.calls[0][3]).toBeUndefined();
    expect(mockService.mock.calls[0][4]).toBeUndefined();

    expect(mockService.mock.calls[1][0]).toEqual(`${HELMString}2`);
    expect(mockService.mock.calls[1][1]).toBeUndefined();
    expect(mockService.mock.calls[1][2]).toEqual(6);
    expect(mockService.mock.calls[1][3]).toBeUndefined();
    expect(mockService.mock.calls[1][4]).toBeUndefined();
  });
});
