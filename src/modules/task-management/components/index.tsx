import React, { useEffect, useState } from "react";
import { Button, Divider, Form, Input, Table } from "antd";
import { ITask, ITasks } from "../types/type";
import { apiAddTask, apiGetTasks, apiUpdateTask } from "../services/apis";
import { taskColumns } from "./task-column";
import "../scss/styles.css";

const TaskManagement = () => {
  const [tasks, setTasks] = useState<ITasks>({
    data: [],
  });
  const [filterStatus, setFilterStatus] = useState<boolean | undefined>();
  const [form] = Form.useForm();

  const onFinish = () => {
    apiAddTask({ name: form.getFieldValue("task_name"), status: false }).then(
      (rs) => {
        setTasks({
          ...tasks,
          data: [...tasks.data, rs],
        });
      }
    );
    form.setFieldValue("task_name", "");
  };

  const handleUpdateTask = (data: ITask) => () => {
    apiUpdateTask(data);
    setTasks({
      ...tasks,
      data: tasks.data.map((d) => (d.id !== data.id ? d : { ...d, ...data })),
    });
  };

  useEffect(() => {
    apiGetTasks().then((rs) => {
      setTasks({
        data: rs,
      });
    });
  }, []);

  return (
    <div className="wrapper">
      <h3>Task management UI</h3>
      <Form form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item name="task_name" label="Task" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form>
      <Divider />
      <Button
        type={filterStatus === undefined ? "primary" : "default"}
        size="small"
        onClick={() => setFilterStatus(undefined)}
      >
        All
      </Button>{" "}
      <Button
        type={filterStatus === true ? "primary" : "default"}
        size="small"
        onClick={() => setFilterStatus(true)}
      >
        Completed
      </Button>{" "}
      <Button
        type={filterStatus === false ? "primary" : "default"}
        size="small"
        onClick={() => setFilterStatus(false)}
      >
        Incomplete
      </Button>
      <Table<ITask>
        columns={taskColumns(handleUpdateTask)}
        pagination={false}
        dataSource={tasks.data
          .filter((d) =>
            filterStatus === undefined
              ? 1
              : filterStatus === true
              ? d.status === true
              : d.status !== true
          )
          .map((d) => ({ ...d, key: d.id }))}
      />
    </div>
  );
};

export default TaskManagement;
