[![CircleCI](https://circleci.com/gh/Evanion/luhn/tree/main.svg?style=shield)](https://circleci.com/gh/Evanion/luhn/tree/main)
[![codecov](https://codecov.io/gh/Evanion/luhn/branch/main/graph/badge.svg?token=S5V045X33K)](https://codecov.io/gh/Evanion/luhn)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Evanion_luhn&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Evanion_luhn)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Evanion_luhn&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Evanion_luhn)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Evanion_luhn&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Evanion_luhn)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=Evanion_luhn&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=Evanion_luhn)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Evanion_luhn&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Evanion_luhn)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Evanion_luhn&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Evanion_luhn)
[![Known Vulnerabilities](https://snyk.io/test/github/Evanion/luhn/badge.svg)](https://snyk.io/test/github/Evanion/luhn)
![npm (scoped)](https://img.shields.io/npm/v/@evanion/luhn)

# @Evanion/Luhn

A Luhn mod-N library.  
This library will generate and validate checksum characters based on the Luhn mod-N (or mod 10) algorithm.

```ts
import { Luhn } from '@Evanion/luhn';
import { generateRandom } from 'some_library';

const createToken = () => {
  const randomString = generateRandom();
  const { checksum } = Luhn.generate(randomString);
  return `${randomString}-${checksum}`;
};
```

## What is the Luhn and Luhn mod-N Algorithms?

The [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) is a simple checksum formula used to validate identification numbers such as credit card numbers, IMEI numbers, social security/insurance numbers, and National identification numbers in some countries.

The [mod-N algorithm](https://en.wikipedia.org/wiki/Luhn_mod_N_algorithm) is an extension to the regular Luhn algorithm, that adds support for alphanumerical strings.

## Why should you use the Luhn algorithm

The luhn algorithm allows you to quickly validate an input, without having to look it up in a database. It's useful when you want to improve the user experience in cases where a user needs to input a string of characters. Like a license key, gift card number, or similar.

## Generate a checksum

Generating a checksum is simple

```ts
const checked = Luhn.generate('foo'); // -> {phrase: 'foo', checksum: '5'}
```

### Case-insensitive

The library defaults to being case insensitive.

```ts
const checked = Luhn.generate('FoO'); // -> {phrase: 'foo', checksum: '5'}
```

### Filtering

The generate method will filter out any characters not in the dictionary

```ts
Luhn.generate('foo-baz'); // -> {phrase: 'foobaz', checksum: 'p'}
Luhn.generate('fooö-baz'); // -> {phrase: 'foobaz', checksum: 'p'}
```

## Validate a string

Validating a string is also simple

```ts
Luhn.validate('foo5'); // -> {phrase: 'foo5', isValid: true}
Luhn.validate('FoOö5'); // -> {phrase: 'foo5', isValid: true}
Luhn.validate('FoO-ö5'); // -> {phrase: 'foo5', isValid: true}
Luhn.validate('bar5'); // -> {phrase: 'bar5', isValid: false}
```
