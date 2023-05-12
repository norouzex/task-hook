import React, { useCallback, useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";
function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];
      console.log(tasksObj["results"]);
      for (const taskKey in tasksObj["results"]) {
        loadedTasks.push({
          id: taskKey,
          text: tasksObj["results"][taskKey].text,
        });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: "https://parseapi.back4app.com/classes/tasks",
        headers: {
          "X-Parse-Application-Id": "cVa5RzxZ8wl3S1x5NYEjnOhD5mEQ59YMRm4HGxla",
          "X-Parse-REST-API-Key": "SVt8YjzQNasABJ8tJk901zOBVuYldNlAd5slIfSR",
          "Content-Type": "application/json",
        },
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
