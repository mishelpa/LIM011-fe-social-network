import MockFirebase from 'mock-cloud-firestore';
import {
  addPost, showPost,
} from '../src/models/model-firebase.js';

const fixtureData = {
  __collection__: {
    notes: {
      __doc__: {
        abc1d: {
          title: 'publicacion',
        },
      },
    },
  },
};
const obj = {
  title: 'publicacion',
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('addPost', () => {
  it('deberia agregar una nota', (done) => addPost(obj).then(() => {
    showPost((data) => {
      const result = data.find((note) => note.title === 'publicacion');
      expect(result.title).toBe('publicacion');
      done();
    });
  }));
});
