import oracledb from "oracledb";
import databaseConfig from "../configs/database.config";

class DatabaseService {
  private pool: Promise<oracledb.Pool>;

  constructor() {
    this.pool = oracledb.createPool(databaseConfig);
    console.log("incodedbug:databaseservice:constructor", databaseConfig);
  }

  public async executeStatement(
    sql: string,
    binds: any[] | {} = [],
    opts: any = {}
  ): Promise<any> {
    let connection;
    opts.outFormat = oracledb.OUT_FORMAT_OBJECT;

    try {
      const actualPool = await this.pool;
      connection = await actualPool.getConnection();
      const result = await connection.execute(sql, binds);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}

export default DatabaseService;
