var User = require('../Model/user');
const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/Clothingstore';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe(' Testing of User Schema', () => {
    it(' Testing of Adding User', () => {
        const user = {
            'name': 'naresh shrestha',
            'email': 'istamitra@gmail.com',
            'password': 'istamitra'
        };

        return User.create(user)
            .then((user) => {
                expect(user.email).toEqual('istamitra@gmail.com');
            });
    });
});












// it('Testing of User Deletion', async () => {
//     const status = await User.deleteOne({ "_id": "5e3cbf1a04e3d84ef2dc55e2" });
//     expect(status.ok).toBe(1);
// });
