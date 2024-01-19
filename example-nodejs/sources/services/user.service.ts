import DatabaseService from "./database.service";

export interface ExecutionMessageModel {
  message: string;
  status: number;
  data?: any;
}

export class UserService {
  static async fetchAll(queryParams: any): Promise<ExecutionMessageModel> {
    let query =
      "SELECT id, name, description , COUNT(*) OVER () AS TotalCount FROM newtable";

    if (queryParams) {
      //.. handle query params
      // e.g. filters
      // e.g. orders
      query += " ORDER BY name";
      // e.g. paging (page, limit)
      // query += " OFFSET 9 ROWS FETCH FIRST 5 ROWS ONLY";
    }

    const dbService = new DatabaseService();
    let response: ExecutionMessageModel = {
      data: null,
      status: 500,
      message: "System Error",
    };
    await dbService
      .executeStatement(query)
      .then((result) => {
        response = {
          data: {
            records: result.rows,
            recordsCount: 0,
            metaData: result.metaData,
          },
          status: 200,
          message: "No record found",
        };
      })
      .catch((err) => {
        response = { data: null, status: 500, message: err.message };
      });
    return response;
  }
}
