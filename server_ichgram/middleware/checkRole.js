function checkRole(req, res, next) {
  if (req.user.plan === "free" && req.files.length > 5) {
    return res.status(400).json({
      message: "Regular users can upload up to 5 photos.",
      success: false,
    });
  }
  if (req.user.plan === "vip" && req.files.length > 10) {
    return res.status(400).json({
      message: "VIP users can upload up to 10 photos.",
      success: false,
    });
  }
  next();
}

export default checkRole;
