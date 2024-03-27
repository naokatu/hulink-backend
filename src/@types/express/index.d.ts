// 既存の Request 型に存在しないプロパティをセットするために、既存の Request 型を上書く
declare namespace Express {
  export interface Request {
    logger: {
      trace: string
    }
  }
}