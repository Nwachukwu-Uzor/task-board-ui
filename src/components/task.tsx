import  { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

import { ITask } from "../types";

interface TaskProps extends ITask {
  index: number;
}

export const Task: FC<TaskProps> = ({ title, description, index, id }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="bg-white px-2 py-4 rounded-md cursor-pointer"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p>{description}</p>
        </div>
      )}
    </Draggable>
  );
};
