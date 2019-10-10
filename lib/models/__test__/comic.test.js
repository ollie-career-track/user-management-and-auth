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

  it('it validates required properties', () => {
    const data = {};
    const comic = new Comic(data);
    const { errors } = comic.validateSync();

    expect(errors.title.kind).toBe('required');
    expect(errors.author.kind).toBe('required');
  });

  it('populates default properties', () => {
    const data = {
      title: 'book',
      author: 'random person',
      genre: ['fiction', 'romance']
    };

    const comic = new Comic(data);
    const err = comic.validateSync();

    expect(err).toBeUndefined();
    expect(comic.chapters).toBe(1);
    expect(comic.ongoing).toBe(true);
  });
});