const Poll = require("../model/pollSchema");

const create = async (req, res) => {
  try {
    const {title, startdate, enddate, totalvote, status } = req.body;

      // Check if poll already exists
      const existingPoll = await Poll.findOne({ where: { title } });
      if (existingPoll) {
        return res.status(400).send({ message: "Poll already exists with this title." });
      }
  // Create the new user
  const poll = await Poll.create({
    title,
    startdate,
    enddate,
    totalvote, 
    status: status || 'draft', 
  });

     res.status(201).send({ data: poll, message: "Successfully created poll" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create poll" });
  }
};

//Delete a user by ID

const deletePoll = async (req, res) => {
  try {
    const pollId = req.params.pollId;

//Find the user by ID and delete
    const result = await poll.destroy({
      where: { id: pollId },//Use 'id' if it's the primary key in your model
    });

    if (result === 0) {
      return res.status(404).send({ message: "Poll not found" });
    }

    res.status(200).send({ message: "Poll deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to delete poll" });
  }
};

//Get all users

const getAllPoll = async (req, res) => {
  try {
    // Assuming you are using Sequelize to interact with the database
    const polls = await Poll.findAll();
    res.status(200).json(polls);
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPollById = async (req, res) => {
  try {
    const pollId = req.params.id;
    const poll = await Poll.findByPk(pollId);

    if (!poll) {
      return res.status(404).send({ message: "Poll not found" });
    }
    const pollData = poll.toJSON();
    res.status(200).send({ data: trekData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "failed to fetch trek" });
  }
};

const updatePollStatus = async (req, res) => {
  try {
    console.log("Request received to update status:", req.params.id, req.body);

    const { id } = req.params;
    const { status } = req.body;

    console.log(`status: ${status} for poll with ID: ${id} `);
    
    // Check if request exists
    const existingPoll = await Poll.findByPk(id);
    if (!existingPoll) {
      console.log("Poll not found with ID:", id);
      return res.status(404).json({ message: "Poll not found" });
    }

    console.log("Existing poll found:", existingPoll);

    // Update status
    existingPoll.status = status;
    await existingPoll.save();

    console.log("Updated request:", existingPoll);

    res.status(200).json({
      message: "Poll status updated successfully",
      data: existingPoll,
    });
  } catch (error) {
    console.error("❌ Error updating poll status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const incrementTotalVotes = async (req, res) => {
  try {
    // const pollId = req.params.pollId;

    const { pollId } = req.body;
    console.log(`Incrementing total votes for poll with ID: ${pollId}`);

    // Find the poll by ID
    const poll = await Poll.findByPk(pollId);
    console.log("Poll found:", poll);

    if (!poll) {
      return res.status(404).send({ message: "Poll not found" });
    }

    // Increment the total votes by the specified amount
    poll.totalvote += 1;

    // Save the updated poll
    await poll.save();

    res.status(200).send({
      message: `Total votes incremented by 1`,
      data: poll,
    });
  } catch (error) {
    console.error("Error incrementing total votes:", error);
    res.status(500).json({ message: "Failed to increment total votes" });
  }

}

module.exports = { create, deletePoll, getAllPoll, getPollById, updatePollStatus, incrementTotalVotes };
