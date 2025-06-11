import UserDetails from '../models/userDetailsModel.js';


export const getUserDetails = async(req, res) => {
  const userDetails = await UserDetails.find();
  try{
    if (!userDetails) {
      return res.status(404).json({ success: false, message: 'No user details found' });
    }
    res.status(200).json({ success: true, data: userDetails });
  }
  catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user details', error });
  }

};

export const deleteUserDetails = (req, res) => {
  const id = req.params.id;

  UserDetails.findByIdAndDelete(id)
    .then(userDetails => {
      if (!userDetails) {
        return res.status(404).json({ success: false, message: 'User details not found' });
      }
      res.status(200).json({ success: true, message: 'User details deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({ success: false, message: 'Error deleting user details', error });
    });};

export const getUserDetailsById = (req, res) => {
  const id = req.params.id;

  UserDetails.findById(id)
    .then(userDetails => {
      if (!userDetails) {
        return res.status(404).json({ success: false, message: 'User details not found' });
      }
      res.status(200).json({ success: true, data: userDetails });
    })
    .catch(error => {
      res.status(500).json({ success: false, message: 'Error fetching user details', error });
    });
};

export const getUserDetailsByUserId = async (req, res) => {
  const userId = req.params.id;

  try {
    const userDetails = await UserDetails.findOne({ user: userId });

    // If no details found, return success with empty data (null or {})
    if (!userDetails) {
      return res.status(200).json({ success: true, data: null }); // or data: {}
    }

    res.status(200).json({ success: true, data: userDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user details by userId', error });
  }
};

export const createUserDetails = (req, res) => {
    const userDetails = req.body;
    if (!userDetails) {
        return res.status(400).json({ message: 'User details are required' });
    }
    const newUserDetails = new UserDetails(userDetails);

    try {
        newUserDetails.save();
        res.status(201).json({ success: true, message: 'User details saved successfully', data: newUserDetails });
    } catch (error) {
        res.status(500).json({ message: 'Error saving user details', error });
    }
};

export const updateUserDetails = async (req, res) => {
  const userDetails = req.body;
  if (!userDetails || !userDetails.user) {
    return res.status(400).json({ message: 'User details and user ID are required' });
  }

  try {
    // Try to update only if it already exists
    const updatedUserDetails = await UserDetails.findOneAndUpdate(
      { user: userDetails.user }, // Match by user ID
      userDetails,
      { new: true } // Return the updated document, but don't create if missing
    );

    if (!updatedUserDetails) {
      return res.status(404).json({ message: 'User details not found. Cannot update non-existing record.' });
    }

    res.status(200).json({
      success: true,
      message: 'User details updated successfully',
      data: updatedUserDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user details',
      error: error.message,
    });
  }
};



