import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getImages from './getImages';

describe('Get Images API', () => {
    it('returns data when getImages is called', done => {
        var mock = new MockAdapter(axios);
        const data = { response: true };
        mock.onGet('http://localhost:1337/products/images').reply(200, data);

        getImages.getImages(1).then(response => {
            expect(response).toEqual(data);
            done();
        });
    });
});