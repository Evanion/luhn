import test from 'ava';

import { InvalidDictionaryError } from './exceptions';
import { Luhn } from './luhn';

test('Generate', (t) => {
  t.is(Luhn.generate('justarandomstringofletters').checksum, 'k');
});

test('Generate filters out characters not in the dictionary', (t) => {
  t.deepEqual(Luhn.generate('just-a-random-string-of-letters'), {
    phrase: 'justarandomstringofletters',
    checksum: 'k',
  });
});

test('Generate is not case sensitive', (t) => {
  t.is(Luhn.generate('justARandomStringOfLetters').checksum, 'k');
});

test('Generate can be made case sensitive', (t) => {
  t.is(Luhn.generate('JUSTARANDOMSTRINGOFLETTERS', true).checksum, '0');
});

test('validate', (t) => {
  t.true(Luhn.validate('justarandomstringoflettersk').isValid);
});

test('Validate is not case sensitive', (t) => {
  t.true(Luhn.validate('JUSTARANDOMSTRINGOFLETTERSK').isValid);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static dictionary(_sensitive: boolean) {
      return 'abcdefghijklmnopqrstuvwxyz';
    }
  }

  t.is(Luhn.generate('justARandomStringOfLetters123').checksum, 'k');
  t.is(CustomLuhn.generate('justARandomStringOfLetters123').checksum, 'v');

  t.true(CustomLuhn.validate('justARandomStringOfLetters123v').isValid);
  t.false(CustomLuhn.validate('justARandomStringOfLettersk').isValid);
});

test('should enforce an even length of the dictionary', (t) => {
  class TestLuhn extends Luhn {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static dictionary(_sensitive: boolean) {
      return 'abcfo';
    }
  }

  t.throws(() => TestLuhn.generate('ab'), {
    instanceOf: InvalidDictionaryError,
  });
});
