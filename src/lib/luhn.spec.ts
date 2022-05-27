import test from 'ava';

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
  t.not(Luhn.generate('JUSTARANDOMSTRINGOFLETTERS', true).checksum, 'k');
  t.is(Luhn.generate('JUSTARANDOMSTRINGOFLETTERS', true).checksum, '0');
});

test('validate', (t) => {
  t.true(Luhn.validate('justarandomstringoflettersk'));
});

test('Validate is not case sensitive', (t) => {
  t.true(Luhn.validate('JUSTARANDOMSTRINGOFLETTERSK'));
});

test('Validate can be made case sensitive', (t) => {
  t.false(Luhn.validate('JUSTARANDOMSTRINGOFLETTERSk', true));
  t.true(Luhn.validate('JUSTARANDOMSTRINGOFLETTERS0', true));
});

test('you can globally set the class to be case sensitive', (t) => {
  class SensitiveLuhn extends Luhn {
    static readonly sensitive = true;
  }

  t.not(SensitiveLuhn.generate('justARandomStringOfLetters'), '0');
  t.false(SensitiveLuhn.validate('justARandomStringOfLetters'));
});

test('you can change the dictionary', (t) => {
  class CustomLuhn extends Luhn {
    static readonly dictionary = 'abcdefghijklmnopqrstuvwxyz';
  }

  t.is(CustomLuhn.generate('justARandomStringOfLetters123').checksum, 'k');
  t.not(CustomLuhn.generate('justARandomStringOfLetters123').checksum, 'a');
  t.true(CustomLuhn.validate('justARandomStringOfLettersk'));
  t.false(CustomLuhn.validate('justARandomStringOfLettersa'));
});
