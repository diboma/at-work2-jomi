export const isCoach = (req, res, next) => {
  if (req.user.role.id !== 1) return res.redirect('/');
  return next();
};
