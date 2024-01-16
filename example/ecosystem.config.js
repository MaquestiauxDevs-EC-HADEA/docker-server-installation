module.exports = {
  apps: [
    {
      name: "My Application",
      script: "./server.js",
      instance: 1,
      env: {
        HTTP_PORT: 3000,
        HTTP_HOST: "localhost",
        NODE_ENV: "development",
        DATABASE_HOST: "172.17.0.4", // Use container ip as dockerised
        DATABASE_PORT: 1521, // Oracle Container port on Portainer
        DATABASE_SID: "ORCLCDB",
        DATABASE_SERVICE_NAME: "ORCLCDB",
        DATABASE_USER: "USER_TEST_001",
        DATABASE_USER_PWD: "user_test_001",
      },
    },
  ],
};
