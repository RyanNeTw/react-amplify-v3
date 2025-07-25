const isUserAdmin = async (token: string | null): Promise<boolean> => {
  if (!token) return false;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000/";

  try {
    const response = await fetch(`${baseUrl}api/auth/me`, {
      method: "GET",
      headers: {
        Authorization: token,
        "X-Middleware-Request": "true",
      },
      credentials: "include",
    });
    if (!response.ok) return false;

    const res = await response.json();
    return res.data.role === "OWNER";
  } catch (e) {
    console.warn(e);
    return false;
  }
};

export default isUserAdmin;
