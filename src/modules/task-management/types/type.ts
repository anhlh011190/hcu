export interface ITask {
  id?: number;
  name: string;
  status?: boolean;
}

export interface ITasks {
  total?: number;
  page?: number;
  size?: number;
  data: ITask[];
}
