export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn); // session 값이 Undefined 일 수도 있으니 Boolean값으로 만들어 줌
  res.locals.siteName = "Mytube";
  res.locals.loggedInUser = req.session.user;
  next();
};
