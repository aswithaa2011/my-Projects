export const mockTasks = [
  {
    day: 1,
    title: "Day 1",
    tasks: [
      { id: "t1-1", title: "Task 1", status: "done", path: "/labs/day1/task1" },
      { id: "t1-2", title: "Task 2", status: "done", path: "/labs/day1/task2" },
    ],
    progress: 100
  },
  {
    day: 2,
    title: "Day 2",
    tasks: [
      { id: "t2-1", title: "Timer", status: "done", path: "/labs/day2/timer" },
      { id: "t2-2", title: "Recipes", status: "done", path: "/labs/day2/recipes" },
      { id: "t2-3", title: "Todo", status: "done", path: "/labs/day2/todo" },
    ],
    progress: 100
  },
  {
    day: 3,
    title: "Day 3",
    tasks: [
      { id: "t3-1", title: "Counter", status: "done", path: "/labs/day4/counter" },
      { id: "t3-2", title: "Form", status: "done", path: "/labs/day4/form" },
    ],
    progress: 100
  },
  {
    day: 4,
    title: "Day 4",
    tasks: [
      { id: "t4-1", title: "Feedback Form", status: "active", path: "/labs/day6/feedback" },
      { id: "t4-2", title: "Search Form", status: "active", path: "/labs/day6/search" },
    ],
    progress: 50
  },
  {
    day: 5,
    title: "Day 5",
    tasks: [
      { id: "t5-1", title: "Login Form", status: "todo", path: "/labs/day7/login-form" },
      { id: "t5-2", title: "Alert", status: "todo", path: "/labs/day7/alert" },
    ],
    progress: 0
  },
  {
    day: 6,
    title: "Day 6",
    tasks: [
      { id: "t6-1", title: "Sum", status: "todo", path: "/labs/day8/sum" },
      { id: "t6-2", title: "Sorting", status: "todo", path: "/labs/day8/sorting" },
      { id: "t6-3", title: "Filter Name", status: "todo", path: "/labs/day8/filter-name" },
    ],
    progress: 0
  },
  {
    day: 7,
    title: "Day 7",
    tasks: [
      { id: "t7-1", title: "Hooks", status: "todo", path: "/labs/day9/hooks" },
    ],
    progress: 0
  },
  {
    day: 8,
    title: "Day 8",
    tasks: [
      { id: "t8-1", title: "CRUD", status: "todo", path: "/labs/day10/crud" },
    ],
    progress: 0
  },
  {
    day: 9,
    title: "Day 9",
    tasks: [
      { id: "t9-1", title: "TextChange", status: "todo", path: "/labs/day11/text-change" },
    ],
    progress: 0
  }
];

export const getTaskStats = (tasks) => {
  let done = 0;
  let active = 0;
  let todo = 0;

  tasks.forEach(day => {
    day.tasks.forEach(task => {
      if (task.status === 'done') done++;
      if (task.status === 'active') active++;
      if (task.status === 'todo') todo++;
    });
  });

  return { done, active, todo };
};
