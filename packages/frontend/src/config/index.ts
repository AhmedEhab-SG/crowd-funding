const appRoutes = {
  home: "/",
  auth: "/auth",
};

const apiRoutes = {
  register: "/api/auth/register",
  login: "/api/auth/login",
  refresh: "/api/auth/refresh",
  revokeRefresh: "/api/auth/revoke-refresh",
  projects: "/api/projects",
};

export { appRoutes, apiRoutes };
