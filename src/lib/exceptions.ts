export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class InvalidDictionaryError extends ValidationError {
  constructor(dictionary: string) {
    super(
      `Luhn directory is of invalid length (${dictionary.length}). The directory length needs to be even`
    );
    this.name = 'InvalidError';
    this.dictionary = dictionary;
  }
  readonly dictionary: string;
}
