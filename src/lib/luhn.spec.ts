import test from 'ava';

import { InvalidDictionaryError } from './exceptions';
import { Luhn } from './luhn';

test('Generate', (t) => {
  t.is(Luhn.generate('justarandomstringofletters').checksum, 'e');
});

test('Generate filters out characters not in the dictionary', (t) => {
  t.deepEqual(Luhn.generate('just-a-random-string-of-letters'), {
    phrase: 'justarandomstringofletters',
    checksum: 'e',
  });
});

test('Generate is not case sensitive', (t) => {
  t.is(Luhn.generate('justARandomStringOfLetters').checksum, 'e');
});

test('Generate can be made case sensitive', (t) => {
  t.is(Luhn.generate('JUSTARANDOMSTRINGOFLETTERS', true).checksum, '0');
});

test('validate', (t) => {
  t.true(Luhn.validate('justarandomstringofletterse').isValid);
});

test('Validate is not case sensitive', (t) => {
  t.true(Luhn.validate('JUSTARANDOMSTRINGOFLETTERSe').isValid);
});

test('Validate can be made case sensitive', (t) => {
  t.true(Luhn.validate('JUSTARANDOMSTRINGOFLETTERS0', true).isValid);
});

test('you can globally set the class to be case sensitive', (t) => {
  class SensitiveLuhn extends Luhn {
    static readonly sensitive = true;
  }

  t.is(SensitiveLuhn.generate('justARandomStringOfLetters').checksum, 'J');
  t.true(SensitiveLuhn.validate('justARandomStringOfLettersJ').isValid);
});

test('you can change the dictionary', (t) => {
  class CustomLuhn extends Luhn {
    static dictionary = 'abcdefghijklmnopqrstuvwxyz';
  }

  t.is(Luhn.generate('justARandomStringOfLetters123').checksum, 'S');
  t.is(CustomLuhn.generate('justARandomStringOfLetters123').checksum, 'v');

  t.true(CustomLuhn.validate('justARandomStringOfLetters123v').isValid);
  t.false(CustomLuhn.validate('justARandomStringOfLettersk').isValid);
});

test('should enforce an even length of the dictionary', (t) => {
  class TestLuhn extends Luhn {
    static dictionary = 'abcfo';
  }

  t.throws(() => TestLuhn.generate('ab'), {
    instanceOf: InvalidDictionaryError,
  });
});
