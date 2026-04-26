import TaskProgressBoard from "../../components/ngo/taskboard/TaskProgressBoard";

const taskBoardData = [
  { id: "t1", state: "Open", title: "Waste Segregation Drive", location: "Sector 8", volunteers: 10, progress: 15, deadline: "May 02", priority: "High" },
  { id: "t2", state: "Open", title: "Nutrition Awareness Session", location: "Ward 4", volunteers: 6, progress: 10, deadline: "May 04", priority: "Medium" },
  { id: "t3", state: "In Progress", title: "Community Health Camp", location: "Ward 3", volunteers: 8, progress: 62, deadline: "Apr 29", priority: "Urgent" },
  { id: "t4", state: "In Progress", title: "School Sanitation Audit", location: "Ward 11", volunteers: 5, progress: 47, deadline: "May 01", priority: "High" },
  { id: "t5", state: "Completed", title: "Riverfront Cleanup", location: "River Zone", volunteers: 14, progress: 100, deadline: "Apr 22", priority: "Low" }
];

const TaskBoard = () => <TaskProgressBoard tasks={taskBoardData} />;

export default TaskBoard;
