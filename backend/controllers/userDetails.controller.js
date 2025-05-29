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

export const createUserDetails = (req, res) => {
    const userDetails = req.body;
    // Here you would typically save the userDetails to your database
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



