import { Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import style from "./App.module.scss";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Classes from "./pages/classes/Classes";
import Schedules from "./pages/schedules/Schedules";
import Subjects from "./pages/subjects/Subjects";
import Teachers from "./pages/teachers/Teachers";
import Login from "./pages/login/Login";
import Classrooms from "./pages/classrooms/Classrooms";
import AddClass from "./pages/classes/add-class/AddClass";
import EditClass from "./pages/classes/edit-class/EditClass";
import AddSubject from "./pages/subjects/add-subject/AddSubject";
import EditSubject from "./pages/subjects/edit-subject/EditSubject";
import AddTeacher from "./pages/teachers/add-teacher/AddTeacher";
import EditTeacher from "./pages/teachers/edit-teacher/EditTeacher";
import AddClassroom from "./pages/classrooms/add-classroom/AddClassroom";
import ScheduleCreator from "./pages/schedules/creators/ScheduleCreator";
import ScheduleEditor from "./pages/schedules/creators/ScheduleEditor";
import SchedulePreview from "./pages/schedules/SchedulePreview";
import ClassChoice from "./pages/schedules/class-choice/ClassChoice";

import { gapi } from "gapi-script";

const App = () => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId: "*****.apps.googleusercontent.com",
      plugin_name: "chat",
    });
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={style.app}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/add-class" element={<AddClass />} />
          <Route path="/edit-class" element={<EditClass />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/add-schedule" element={<ScheduleCreator />} />
          <Route path="/choose-class-for-schedule" element={<ClassChoice />} />
          <Route path="/edit-schedule" element={<ScheduleEditor />} />
          <Route path="/preview-schedule" element={<SchedulePreview />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/add-subject" element={<AddSubject />} />
          <Route path="/edit-subject" element={<EditSubject />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/edit-teacher" element={<EditTeacher />} />
          <Route path="/login" element={<Login />} />
          <Route path="/classrooms" element={<Classrooms />} />
          <Route path="/add-classroom" element={<AddClassroom />} />
        </Routes>
      </div>
    </DndProvider>
  );
};

export default App;
