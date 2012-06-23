"use strict";

var PRIME = 0
  , NON_PRIME = 1
  , UNKNOWN = 2
  ;

function seive(max, min) {
  min = min || 2;

  // shitty browser support
  if (typeof Int8Array === 'undefined') Int8Array = Array;
  if (typeof Uint32Array === 'undefined') Uint32Array = Array;

  // Int8Array is really fast
  var numbers = new Int8Array(max + 1);

  // all evens are non-primes
  for (var i = 0; i < max + 1; ++i) {
    numbers[i] = (i % 2 ? UNKNOWN : NON_PRIME);
  }

  // mark the first three
  numbers[0] = NON_PRIME;
  numbers[1] = NON_PRIME;
  numbers[2] = PRIME;
  var primeCount = 1;
  if (min >= 2) ++primeCount;

  // use the seive of Eratosthenes to find all primes up to max
  for (var prime = 2; prime < max;) {
    // advance to next prime
    while (prime < max && numbers[prime] !== UNKNOWN) ++prime;

    if (prime !== max) {
      numbers[prime] = PRIME;
      ++primeCount;
    }

    // mark all numbers divisible by that prime
    for (var i = prime * 2; i < max; i += prime) {
      numbers[i] = NON_PRIME;
      if (prime >= min) ++primeCount;
    }
  }

  var primes = new Uint32Array(primeCount);
  var pi = 0;
  for (var i = min; i < max + 1; ++i) {
    if (numbers[i] === PRIME) {
      primes[pi] = i;
      ++pi;
    }
  }

  return primes;
}

module.exports = seive;