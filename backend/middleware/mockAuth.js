// Mock authentication for testing without Auth0
export const mockAuthMiddleware = (req, res, next) => {
  // Simulate logged-in user data
  req.oidc = {
    user: {
      given_name: "John",
      family_name: "Doe", 
      name: "John Doe",
      email: "john.doe@example.com",
      picture: "https://picsum.photos/seed/user123/80/80.jpg"
    },
    isAuthenticated: () => true
  };
  next();
};

export const mockRequiresAuth = () => (req, res, next) => {
  if (req.oidc && req.oidc.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
};
