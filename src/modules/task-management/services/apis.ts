import { Api } from "../../common/axios";
import { ITask } from "../types/type";

export const apiGetTasks = (): Promise<any> => {
  return Api.get(`http://localhost:3000/tasks`, {});
};

export const apiAddTask = (params: ITask): Promise<ITask> => {
  return Api.post(`http://localhost:3000/tasks`, params);
};

export const apiUpdateTask = (params: ITask): Promise<ITask[]> => {
  return Api.put(`http://localhost:3000/tasks/${params.id}`, params);
};
