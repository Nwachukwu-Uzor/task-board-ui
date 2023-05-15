import { useState, SetStateAction, Dispatch } from "react";
import { tasks as dummyTasks } from "../data/tasks";
import { Tasks } from ".";
import { ITask } from "../types";

import { DragDropContext } from "react-beautiful-dnd";

const NOT_STARTED = "not-started";
const IN_PROGRESS = "in-progress";
const COMPLETED = "completed";

export const TasksContainer = () => {
  const [notStartedTasks, setNotStartedTasks] = useState(
    dummyTasks?.filter((task) => task?.status === NOT_STARTED)
  );
  const [inProgressTasks, setInProgressTasks] = useState(
    dummyTasks?.filter((task) => task?.status === IN_PROGRESS)
  );
  const [completedTasks, setCompletedTasks] = useState(
    dummyTasks?.filter((task) => task?.status === COMPLETED)
  );

  const updateTasksForDifferentLists = (
    tempList1: ITask[],
    tempList2: ITask[],
    setSourceTasks: Dispatch<SetStateAction<ITask[]>>,
    setDestinationTasks: Dispatch<SetStateAction<ITask[]>>,
    sourceIndex: number,
    destinationIndex: number,
    destinationStatus: string
  ) => {
    const [removedItem] = tempList1.splice(sourceIndex, 1);
    tempList2.splice(destinationIndex, 0, {
      ...removedItem,
      status: destinationStatus,
    });
    setSourceTasks(tempList1);
    setDestinationTasks(tempList2);
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (!source) return;

    if (
      destination?.droppableId === source?.droppableId &&
      destination?.index === source?.index
    ) {
      return;
    }

    if (destination?.droppableId === source?.droppableId) {
      if (destination?.droppableId === NOT_STARTED) {
        const tempList = [...notStartedTasks];
        const removedItem = tempList.splice(source?.index, 1)[0];
        tempList.splice(destination?.index, 0, removedItem);
        setNotStartedTasks(tempList);
        return;
      }

      if (destination?.droppableId === IN_PROGRESS) {
        const tempList = [...inProgressTasks];
        const removedItem = tempList.splice(source?.index, 1)[0];
        tempList.splice(destination?.index, 0, removedItem);
        setInProgressTasks(tempList);
        return;
      }

      if (destination?.droppableId === COMPLETED) {
        const tempList = [...completedTasks];
        const [removedItem] = tempList.splice(source?.index, 1);
        tempList.splice(destination?.index, 0, removedItem);
        setCompletedTasks(tempList);
        return;
      }
      return;
    }

    if (source?.droppableId === NOT_STARTED) {
      const tempList1 = [...notStartedTasks];
      const tempList2 =
        destination?.droppableId === IN_PROGRESS
          ? [...inProgressTasks]
          : [...completedTasks];

      const destinationStateUpdateFunction =
        destination?.droppableId === IN_PROGRESS
          ? setInProgressTasks
          : setCompletedTasks;

      updateTasksForDifferentLists(
        tempList1,
        tempList2,
        setNotStartedTasks,
        destinationStateUpdateFunction,
        source?.index,
        destination?.index,
        destination?.droppableId
      );

      return;
    }

    if (source?.droppableId === IN_PROGRESS) {
      const tempList1 = [...inProgressTasks];
      const tempList2 =
        destination?.droppableId === NOT_STARTED
          ? [...notStartedTasks]
          : [...completedTasks];
      const destinationStateUpdateFunction =
        destination?.droppableId === NOT_STARTED
          ? setNotStartedTasks
          : setCompletedTasks;

      updateTasksForDifferentLists(
        tempList1,
        tempList2,
        setInProgressTasks,
        destinationStateUpdateFunction,
        source?.index,
        destination?.index,
        destination?.droppableId
      );

      return;
    }

    if (source?.droppableId === COMPLETED) {
      const tempList1 = [...completedTasks];
      const tempList2 =
        destination?.droppableId === NOT_STARTED
          ? [...notStartedTasks]
          : [...inProgressTasks];
      const destinationStateUpdateFunction =
        destination?.droppableId === NOT_STARTED
          ? setNotStartedTasks
          : setInProgressTasks;

      updateTasksForDifferentLists(
        tempList1,
        tempList2,
        setCompletedTasks,
        destinationStateUpdateFunction,
        source?.index,
        destination?.index,
        destination?.droppableId
      );

      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-center items-center">
        <div className="w-[90%] max-w-[1000px] py-3 grid lg:grid-cols-3 items-start gap-2 lg:gap-6">
          <Tasks tasks={notStartedTasks} title="Not Started" id={NOT_STARTED} />
          <Tasks tasks={inProgressTasks} title="In Progress" id={IN_PROGRESS} />
          <Tasks tasks={completedTasks} title="Completed" id={COMPLETED} />
        </div>
      </div>
    </DragDropContext>
  );
};
