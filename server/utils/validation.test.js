const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should accept a valid string', () => {

    const str1 = isRealString("Doug");

    expect(str1).toBe(true);
  });
  it('should reject a non-string', () => {
    const str2 = isRealString(4424);
    expect(str2).toBe(false);
  });
  it('should reject a string of spaces', () => {
    const str3 = isRealString("     ");
    expect(str3).toBe(false);
  });
  it('should accept a string with extra spaces', () => {
    const str4 = isRealString("   Hi  ");
    expect(str4).toBe(true);
  });
});
