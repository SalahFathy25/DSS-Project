const Employee = require('../models/employee');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const employee = await Employee.findOne({ username });
    if (!employee || employee.password !== password) {
        return res.status(401).send('Invalid credentials');
    }

    res.send('Login successful');
};
