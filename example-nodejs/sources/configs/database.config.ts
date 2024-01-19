const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
const DATABASE_PORT = process.env.DATABASE_PORT || "1521";
const DATABASE_SID = process.env.DATABASE_SID || "ORCLCDB";
const DATABASE_SERVICE_NAME = process.env.DATABASE_SERVICE_NAME || "ORCLCDB";
const CONNECTION_STRING_SID = `(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = ${DATABASE_HOST})(PORT = ${DATABASE_PORT}))(CONNECT_DATA =(SID= ${DATABASE_SID})))`;
const CONNECTION_STRING_SERVICE_NAME = `(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = ${DATABASE_HOST})(PORT = ${DATABASE_PORT}))(CONNECT_DATA =(SERVICE_NAME= ${DATABASE_SERVICE_NAME})))`;

interface DatabaseConfig {
  user: string;
  password: string;
  connectString: string;
  poolMin: number;
  poolMax: number;
  poolIncrement: number;
  retry: {
    times: number;
    interval: number;
  };
}

const databaseConfig: DatabaseConfig = {
  user: process.env.DATABASE_USER || "A_DB_USER",
  password: process.env.DATABASE_USER_PWD || "a-db-user-pas$w0rd",
  connectString: CONNECTION_STRING_SERVICE_NAME,
  poolMin: 10,
  poolMax: 10,
  poolIncrement: 0,
  retry: {
    times: 10,
    interval: 10000,
  },
};

export default databaseConfig;
