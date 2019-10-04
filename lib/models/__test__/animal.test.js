const Animal = require('../animal');

describe('Animal model', () => {
  it('valid model', () => {
    const data = {
      name: 'dog',
      limbs: 5,
      hasTail: true,
      traits: {
        isFurry: true,
        canFly: false,
        breathsWater: false
      },
      diet: ['kibble', 'peanut butter']
    };

    const animal = new Animal(data);
    const errors = animal.validateSync();
    expect(errors).toBeUndefined();

    const json = animal.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object)
    });
  });

  it('validates required properties', () => {
    const data = {};
    const animal = new Animal(data);
    const { errors } = animal.validateSync();

    expect(errors.name.kind).toBe('required');
  });

  it('populates default properties', () => {

  });


});