# HELM to SVG API

API for converting HELM string to an image

## Docs

There is only one API method for now

**GET /transform-helm-to-svg/{helm}** for single HELM string parameter
**GET /transform-helm-to-svg/{helm&helm&...}** for multiple HELM string parameter

You can pass multiple HELM strings as a GET parameter with _&_ separator

| params       | pass via        | is required | description |
|--------------|-----------------|-------------|-------------|
| helm         | url parameter   | true        | HELM string to be transformed to image |
| compareWith  | query parameter | false       | HELM string to compare monomers with   |
| seqIndexFrom | query parameter | false       | sequence index to be pass to svg object to handle it on client side. If multiple _helm_ parameter was provided - index will be increased by 1 for each following sequence |
| linear       | query parameter | false       | boolean, if true - HELM will be placed in a row, if false or not provided - HELM will be placed with circular structures |
| usePNG       | query parameter | false       | boolean, if true - result will be in PNG format, if false or not provided - result will be in SVG format |
| colorSchema  | query parameter | false       | string name of color scheme (`spotfire` is used by default) |

<br>

**returns image representation of a HELM string or of an array of HELM strings**

### Available color schemes

- charge,
- cinema,
- clustal,
- lesk,
- maeditor,
- natural,
- rasmol,
- shapely,
- spotfire,
- spotfireplus,
- spotfirekelly8,
- spotfirekelly,
- spotfireuaa

## Development part

For using this library install it via npm

```
npm i helm-to-svg-api
```

Before starting server run the following command for dependencies installation

```bash
npm install
```

Then run server in `watch` mode
```bash
npm run dev
```

Server should start at [localhost:3000](http://localhost:3000)
