const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const fileServices = require('./users.serviсe');
app.get('/users', async (req, res) => {
    const users = await fileServices.getAllUsers();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const {name, age, gender} = req.body;
    if (!name || name.length < 3) {
        return res.json('name is wrong')
    }
    if (!age || age < 1 || age > 200) {
        return res.json('age is wrong')
    }
    if (!gender || (gender !== "male" && gender !== "female")) {
        return res.json('gender mast be male or female')
    }
    const users = await fileServices.getAllUsers();
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name,
        age,
        gender,
    }

    users.push(newUser);
    await fileServices.pushAllUsers(users);
    res.status(201).json(newUser);
});

app.get('/users/:id', async (req, res) => {
    const {id} = req.params;
    const users = await fileServices.getAllUsers();

    const user = users.find(user => user.id === +id);
    if (!user) {
        return res.status(422).json('user not found')
    }
    res.json(user);
});

app.put('/users/:id', async (req, res) => {
    const {id} = req.params;
    const users = await fileServices.getAllUsers();

    const user = users.find(user => user.id === +id);
    const {name, age, gender} = req.body;
    if (!name || !age || !gender) {
        return res.status(422).json('all fields must be filled');
    }
    users.splice((+id - 1), 1);
    user.name = name;
    user.age = age;
    user.gender = gender;

    users.push(user);
    await fileServices.pushAllUsers(users.sort((a, b) => a.id > b.id ? 1 : -1));
    res.json(user);
});
app.patch('/users/:id', async (req, res) => {
    const {id} = req.params;
    const users = await fileServices.getAllUsers();
    const user = users.find(user => user.id === +id);
    const {name, age, gender} = req.body;
    if (!user) {
        return res.status(422).json('user not found');
    }
    if (name) user.name = name;
    if (age) user.age = age;
    if (gender) user.gender = gender;

    await fileServices.pushAllUsers(users.sort((a, b) => a.id > b.id ? 1 : -1));
    res.json(user);
});

app.delete('/users/:id', async (req, res) => {
    const {id} = req.params;
    const users = await fileServices.getAllUsers();

    const userIndex = users.findIndex(user => user.id === +id);

    if (userIndex === -1) {
        return res.status(422).json('user not found');
    }
    ;
    users.splice(userIndex, 1);
    await fileServices.pushAllUsers(users.sort((a, b) => a.id > b.id ? 1 : -1));
    res.json(await fileServices.getAllUsers())
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`);
});

