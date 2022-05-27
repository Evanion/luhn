import test from 'ava';

import { Luhn } from './luhn';

test('Generate', (t) => {
  t.is(Luhn.generate('justarandomstringofletters'), 'k');
});

test('Generate filters out characters not in the dictionary', (t) => {
  t.is(Luhn.generate('just-a-random-string-of-letters'), 'k');
});

test('Generate is not case sensitive', (t) => {
  t.is(Luhn.generate('justARandomStringOfLetters'), 'k');
});

test('Generate can be made case sensitive', (t) => {
  t.not(Luhn.generate('justARandomStringOfLetters', true), 'k');
});

test('validate', (t) => {
  t.true(Luhn.validate('justarandomstringoflettersk'));
});

test('Validate is not case sensitive', (t) => {
  t.true(Luhn.validate('justARandomStringOfLettersk'));
});

test('Validate can be made case sensitive', (t) => {
  t.false(Luhn.validate('justARandomStringOfLettersk', true));
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

  t.not(CustomLuhn.generate('justARandomStringOfLetters'), 'k');
  t.is(CustomLuhn.generate('justARandomStringOfLetters'), 'a');
  t.false(CustomLuhn.validate('justARandomStringOfLettersk'));
  t.true(CustomLuhn.validate('justARandomStringOfLettersa'));
});
