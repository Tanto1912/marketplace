import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setValid(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("https://api4.app.iklin.online/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setValid(res.ok && data.valid);
      } catch {
        setValid(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) return <div>Checking auth...</div>;
  if (!valid) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
