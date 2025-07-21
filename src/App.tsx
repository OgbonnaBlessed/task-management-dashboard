import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import AddTask from './pages/AddTask'
import Completed from './pages/Completed'
import Pending from './pages/Pending'
import Overdue from './pages/Overdue'
import EditTask from './pages/EditTask'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/pending" element={<Pending />} />
        <Route path="/overdue" element={<Overdue />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Route>
    </Routes>
  )
}

export default App