import { User } from "../model/user.model.js";
export const authCallback = async (req, res) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;
    const user = await User.findOne({ clerkId: id });
    if (!user) {
      await User.create({
        fullName: lastName ? `${firstName} ${lastName}` : firstName,
        clerkId: id,
        imageUrl,
      });
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("error in auth callback function:", error);
    next(error);
  }
};
