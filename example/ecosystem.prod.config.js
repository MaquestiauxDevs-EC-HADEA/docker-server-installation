module.exports = {
  apps: [
    {
      name: "My Application",
      script: "./server.js",
      instance: 1,
      env: {
        HTTP_PORT: 3000,
        HTTP_HOST: "localhost",
        NODE_ENV: "production",
        DATABASE_HOST: "dbp.hadea.cec.eu.int",
        DATABASE_PORT: 1521,
        DATABASE_SID: "ORCLCDB",
        DATABASE_SERVICE_NAME: "ORCLCDB",
        DATABASE_USER: "BTSFLEG",
        DATABASE_USER_PWD: "Pr*l3gacy",
      },
    },
  ],
};
