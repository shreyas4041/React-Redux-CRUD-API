import "./App.css";
import TableData from "./table-data/TableData";
import AddPost from "./add-contact/index.js";
import EditPost from "./edit-contact";
import AddPosts from "./users-post/AddPost";
import { Route, Routes } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import UsersPost from "./users-post/UsersPost";
import EditPosts from "./users-post/EditPosts";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TableData />} />
        <Route path="/add" element={<AddPost />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/userpost/:id" element={<UsersPost />} />
        <Route exact path="/addPosts/:id" element={<AddPosts />} />
        <Route exact path="/edit-post/:id" element={<EditPosts />} />
        {/* <Route path="edit">
          <Route index={true} element={<EditPost />} />
          <Route path=":id" element={<EditPost />} />
        </Route> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
