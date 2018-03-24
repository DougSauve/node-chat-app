const expect = require('expect');
//const request = require('supertest');


const {generateMessage, generateLocationMessage} = require('./message');

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
describe('Utils/Message/generateLocationMessage', () => {
  it('should return an object with from, url, and createdAt properties.', () => {
    const from = 'Bob';
    const lat = "-34";
    const lng = "-64";
    const url = "https://www.google.com/maps?q=-34,-64";

    const message = generateLocationMessage(from, lat, lng);

    expect(message.from).toBe(from);
    expect(message.url).toBe(url);
    expect(typeof message.createdAt).toBe('number');
  });
});
