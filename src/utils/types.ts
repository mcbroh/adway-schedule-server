export interface ISchema {
  id?: string;
  date: string;
  user: string;
  restDay: boolean;
  isHoliday: boolean;
}

export type TSchemaData = Record<string, ISchema>;

export interface IUpdateReadResponse {
  data?: TSchemaData;
  error?: Error | string;
}

export interface ISupportScheduleEntry {
  resource: string | null;
  date: string;
}
