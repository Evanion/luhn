# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.1](https://github.com/Evanion/luhn/compare/v2.0.0...v2.0.1) (2023-05-20)

## [2.0.0](https://github.com/Evanion/luhn/compare/v1.0.0...v2.0.0) (2023-05-20)


### ⚠ BREAKING CHANGES

* **luhn:** Different checksums will be calculated from previous version.

### Bug Fixes

* **luhn:** correct how dictionary is filtered when in sensitive mode ([9284369](https://github.com/Evanion/luhn/commit/9284369b44c3b87bb55e942a5e13dcdc4f1258ca))

## 1.0.0 (2022-05-28)


### ⚠ BREAKING CHANGES

* **luhn:** Changes the return signature of both methods to now return an object containing the
filteredstring, and the checksum/validity
* **luhn:** nothing existed before

### Features

* **luhn:** first implementation ([ae129d9](https://github.com/Evanion/luhn/commit/ae129d9e8ddd39714861d0ee7a0107f97c856f35))
* **luhn:** return filtered string ([bc5c5c7](https://github.com/Evanion/luhn/commit/bc5c5c7d1a2db751ed5394881f49bc8523326ae0))


### Bug Fixes

* **dictionary:** odd dictionary length throws error ([0abc992](https://github.com/Evanion/luhn/commit/0abc992ec7adea014d886730a658747f0a70e388))
* **dictionary:** refer to local dictionary ([2277b21](https://github.com/Evanion/luhn/commit/2277b215ef6a1f0d9391a233911350306a571cd7))
