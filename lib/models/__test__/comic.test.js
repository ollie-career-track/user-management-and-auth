const Comic = require('../comic');

describe('Comic model', () => {
  it('valid model', () => {
    const data = {
      title: 'book',
      author: 'random person',
      chapters: 88,
      ongoing: false,
      genre: ['fiction', 'romance']
    };

    const comic = new Comic(data);
    const errors = comic.validateSync();
    expect(errors).toBeUndefined();

    const json = comic.toJSON();

    expect(json).toEqual({
      _id: expect.any(Object),
      ...data
    });
  });
});