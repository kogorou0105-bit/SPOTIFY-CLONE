import { clerkClient } from "@clerk/express";
export const legacyRequireAuth = (req, res, next) => {
  if (!req.auth.userId) {
    return res
      .status(401)
      .json({ message: "Unauthenticated - please login in first!" });
  }
  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;
    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthencated - you should be admin to check this" });
    }
    next();
  } catch (error) {
    console.log("error in requireAdmin function:", error);
    res.status(500).json({ message: "internal server error" });
  }
};
