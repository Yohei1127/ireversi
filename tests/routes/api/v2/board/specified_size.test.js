const chai = require('chai');
const app = require('../../../../../src/routes/app.js');
// const boardStore = require('../../../../../src/models/v2/BoardStore.js');
// const pieceStore = require('../../../../../src/models/v2/PieceStore.js');

const basePath = '/api/v2';

function convertComparisonResult(result) {
  const fPieces = [];
  const size = Math.sqrt(result.length);
  for (let i = 0; i < result.length; i += 1) {
    if (result[i] !== 0) {
      const piece = {
        x: Math.floor(i % size),
        y: Math.floor(i / size),
        userId: result[i],
      };
      fPieces.push(piece);
    }
  }
  return fPieces;
}

describe('board/specified_size', () => {
  // beforeAll(prepareDB);
  // afterEach(deleteAllDataFromDB);

  // 一つ駒を置く
  it('gets specified range', async () => {
    // Given
    const xMin = 1;
    const xMax = 3;
    const yMin = 1;
    const yMax = 3;
    const userId = 1;

    // const testCase = [
    //   0, 0, 0, 0, 0,
    //   0, 1, 2, 0, 0,
    //   4, 5, 0, 7, 1,
    //   0, 9, 0, 2, 0,
    //   0, 0, 0, 0, 0,
    // ];

    const result = [
      1, 2, 0,
      5, 0, 7,
      9, 0, 2,
    ];
    // const result = boardStore.getBoard().pieces;
    const matchers = convertComparisonResult(result);

    // await Promise.all(matchers.map(m => PieceStore(m).save()));

    // When
    const response = await chai.request(app).get(`${basePath}/board/specified_size?x_min=${xMin}&x_max=${xMax}&y_min=${yMin}&y_max=${yMax}&userId=${userId}`);
    // Then
    expect(response.body.pieces).toHaveLength(matchers.length);
    expect(response.body.pieces).toEqual(expect.arrayContaining(matchers));
  });
});
