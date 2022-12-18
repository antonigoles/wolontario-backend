module.exports = async function (req, res, next) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).json({
          error: `Nie ma takiego użytkownika`,
        });
      } else if (user.emailStatus === 'unconfirmed') {
        res.status(401).json({
          error: 'This account has not been confirmed. Click on the link in the email sent to you to confirm.',
        });
      } else {
        return next();
      }
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };