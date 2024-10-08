const config = {
  filesUploadName: "uploads",
  localFilesLocation: "./uploads",
  maxFileSize: 50 * 1024 * 1024,
};

const apiRoutes = {
  base: "/api",
  auth: {
    base: "/auth",
    login: "/login",
    register: "/register",
    refresh: "/refresh",
  },
  campaign: "/campaign",
};

export default config;
export { apiRoutes };
