const { day, trek } = require('../model/associations');

const create = async (req, res) => {
    const request = req.body;
    try {
        const newDay = await day.create(request);  // Renamed to avoid conflict
        res.status(201).send({ data: newDay, message: "successfully created user" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllday = async (req, res) => {
    try {
        const allDays = await day.findAll({
            include: [
                {
                    model: day,  // Check if this is correct model reference
                    as: 'days'
                }
            ]
        });
        res.json(allDays);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { create, getAllday };
