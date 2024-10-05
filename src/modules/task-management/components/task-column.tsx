import React from "react";
import { Button, TableProps } from "antd";
import { ITask } from "../types/type";

export const taskColumns: (
  handleUpdateTask: Function
) => TableProps<ITask>["columns"] = (handleUpdateTask) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (data) => <span>{data}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (data) => (
        <span>{data === true ? "Completed" : "Incomplete"}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "status",
      key: "status",
      render: (data, _) => (
        <>
          {data === true ? (
            <Button
              type="dashed"
              size="small"
              onClick={handleUpdateTask({ ..._, status: false })}
            >
              Make incomplete
            </Button>
          ) : (
            <Button
              type="primary"
              size="small"
              onClick={handleUpdateTask({ ..._, status: true })}
            >
              Make completed
            </Button>
          )}
        </>
      ),
    },
  ];
};
