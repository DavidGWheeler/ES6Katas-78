'use strict';
// 78: Promise - API overview
// To do: make all tests pass, leave the assert lines unchanged!

describe('`Promise` API overview', function() {

  it('`new Promise()` requires a function as param', () => {
    const param = () => {console.log("words actions, and stuff")};
    assert.doesNotThrow(() => { new Promise(param); });
  });

  describe('resolving a promise', () => {
    it('via constructor parameter `new Promise((resolve) => { resolve(); })`', () => {
      const param = new Promise((resolve) => {
        resolve();
      });
    });
    it('using `Promise.resolve()`', () => {
      return Promise.resolve();
    });
  });

  describe('a rejected promise', () => {
    it('using the constructor parameter', (done) => {
      const promise = new Promise((reject) => {
        promise.reject();
      });
      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });
    it('via `Promise.reject()`', (done) => {
      const promise = Promise.reject();
      promise
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done());
    });
  });

  const resolvingPromise = Promise.resolve();
  const rejectingPromise = Promise.reject();

  describe('`Promise.all()`', () => {
    it('`Promise.all([p1, p2])` resolves when all promises resolve', () =>
      Promise.all([resolvingPromise, resolvingPromise])
    );
    it('`Promise.all([p1, p2])` rejects when a promise is rejected', (done) => {
      Promise.all([ rejectingPromise ])
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done())
    });
  });

  describe('`Promise.race()`', () => {
    it('`Promise.race([p1, p2])` resolves when one of the promises resolves', () =>
      Promise.race([resolvingPromise])
    );
    it('`Promise.race([p1, p2])` rejects when one of the promises rejects', (done) => {
      Promise.race([ rejectingPromise])
        .then(() => done(new Error('The promise is expected to be rejected.')))
        .catch(() => done())
    });
    it('`Promise.race([p1, p2])` order matters (and timing)', () =>
      Promise.race([ resolvingPromise, rejectingPromise ])
    );
  });

});
