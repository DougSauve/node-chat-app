const expect = require('expect');
//const request = require('supertest');


const {generateMessage} = require('./message');

describe('Utils/Message/generateMessage', () => {
  it('should return an object with from, text, and createdAt properties.', () => {
    const from = 'Bob';
    const text = "Hey man eat some fries";

    const message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe('number');
  });
});
