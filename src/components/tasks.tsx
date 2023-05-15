import { FC } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ITask } from "../types";
import { Task } from ".";

interface TasksProps {
  tasks: ITask[];
  title: string;
  id: string;
}

export const Tasks: FC<TasksProps> = ({ tasks, title, id }) => {
  return (
    <div className="bg-gray-100">
      <h1 className="p-1 text-xl font-semibold">{title}</h1>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="flex flex-col gap-4 p-2"
            {...provided.droppableProps}
            ref={provided?.innerRef}
          >
            {tasks?.map((task, index) => (
              <Task {...task} key={task.id} index={index} />
            ))}
            {provided?.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
