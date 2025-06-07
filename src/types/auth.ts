/**
 * Ambil token dari localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

/**
 * Simpan token ke localStorage
 */
export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

/**
 * Hapus token dan redirect ke login
 */
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

/**
 * Verifikasi token ke backend (async)
 * Akan return true jika token valid
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = getToken();
  if (!token) return false;

  try {
    const res = await fetch("https://api4.app.iklin.online/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return res.ok && data.valid;
  } catch {
    return false;
  }
};

/**
 * Ambil user dari backend jika diperlukan (opsional)
 */
export const getUser = async () => {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await fetch("https://api4.app.iklin.online/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (res.ok && data.valid) {
      return data.user;
    }

    return null;
  } catch {
    return null;
  }
};
