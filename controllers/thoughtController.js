const { Thought } = require('../models');

const thoughtController = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Get a single thought by ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
      
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      
      // Push the created thought's _id to the associated user's thoughts array field
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Update a thought by ID
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete a thought by ID
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json({ message: 'Thought deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Create a reaction for a thought
  async createReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = thoughtController;
