import { useInitializeAuth } from "../hooks/auth/useInitializeAuth";

const AuthProvider = ({ children }) => {
  useInitializeAuth();

  return children;
};

export default AuthProvider;