const mockVisModule = {
  parse: jest.fn(() => ({
    sequences: true,
  })) as jest.Mock,

  generateSVG: jest.fn(() => ({
    outerHTML: 'svg',
  })) as jest.Mock,
}

jest.mock('@peptidesar/helm-visualisation', () => mockVisModule);

const mockSharpModule = jest.fn(() => ({
  png: () => ({ toBuffer: () => 'png' }),
})) as jest.Mock;

jest.mock('sharp', () => mockSharpModule);

import transformHELMtoSVG from '.';

const HELMString = 'PEPTIDE1{A}$$$';

describe('transformHELMtoSVG', () => {
  afterEach(() => {
    mockVisModule.parse.mockClear();
    mockVisModule.generateSVG.mockClear();
    mockSharpModule.mockClear();
  });

  it('generate result without optional parameters', async () => {
    const result = await transformHELMtoSVG(HELMString);
    expect(result).toEqual('svg');

    expect(mockVisModule.parse.mock.calls.length).toEqual(1);
    expect(mockVisModule.parse.mock.calls[0][0]).toEqual(HELMString);

    expect(mockVisModule.generateSVG.mock.calls.length).toEqual(1);
    expect(mockVisModule.generateSVG.mock.calls[0][0]).toEqual({ sequences: true });
    expect(mockVisModule.generateSVG.mock.calls[0][1]).toBeUndefined();
    expect(mockVisModule.generateSVG.mock.calls[0][2]).toBeUndefined();
    expect(mockVisModule.generateSVG.mock.calls[0][3]).toBeUndefined();
  });

  it('generate result with optional parameters', async () => {
    const result = await transformHELMtoSVG(HELMString, HELMString, 1, true);
    expect(result).toEqual('svg');

    expect(mockVisModule.parse.mock.calls.length).toEqual(2);
    expect(mockVisModule.parse.mock.calls[0][0]).toEqual(HELMString);
    expect(mockVisModule.parse.mock.calls[1][0]).toEqual(HELMString);

    expect(mockVisModule.generateSVG.mock.calls.length).toEqual(1);
    expect(mockVisModule.generateSVG.mock.calls[0][0]).toEqual({ sequences: true });
    expect(mockVisModule.generateSVG.mock.calls[0][1]).toBeTruthy();
    expect(mockVisModule.generateSVG.mock.calls[0][2]).toEqual(1);
    expect(mockVisModule.generateSVG.mock.calls[0][3]).toBeTruthy();
  });

  it('generate result as png', async () => {
    const result = await transformHELMtoSVG(HELMString, undefined, undefined, undefined, true);
    expect(result).toEqual('png');

    expect(mockVisModule.parse.mock.calls.length).toEqual(1);
    expect(mockVisModule.parse.mock.calls[0][0]).toEqual(HELMString);

    expect(mockVisModule.generateSVG.mock.calls.length).toEqual(1);
    expect(mockVisModule.generateSVG.mock.calls[0][0]).toEqual({ sequences: true });
    expect(mockVisModule.generateSVG.mock.calls[0][1]).toBeUndefined();
    expect(mockVisModule.generateSVG.mock.calls[0][2]).toBeUndefined();
    expect(mockVisModule.generateSVG.mock.calls[0][3]).toBeUndefined();

    expect(mockSharpModule.mock.calls.length).toEqual(1);
    expect(mockSharpModule.mock.calls[0][0]).toEqual(Buffer.from('svg'));
  });
});
