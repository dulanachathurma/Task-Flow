import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { FaTrash, FaCheck, FaSearch, FaPlus, FaRocket } from 'react-icons/fa'
import { MdCalendarToday, MdAccessTime, MdEvent, MdCheckBox } from 'react-icons/md'

const PRIORITY_ORDER = { High: 1, Medium: 2, Low: 3 }

export default function Dashboard() {
  const { user, logout } = useAuth()
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('Medium')
  const [showSchedule, setShowSchedule] = useState(false)
  const [scheduleDate, setScheduleDate] = useState('')
  const [adding, setAdding] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('/api/tasks')
      setTasks(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleAddTask = async () => {
    if (!title.trim()) return
    setAdding(true)
    try {
      await axios.post('/api/tasks', {
        title,
        description,
        priority,
        scheduleDate: showSchedule && scheduleDate ? scheduleDate : null
      })
      setTitle('')
      setDescription('')
      setPriority('Medium')
      setScheduleDate('')
      setShowSchedule(false)
      fetchTasks()
    } catch (err) {
      console.error(err)
    } finally {
      setAdding(false)
    }
  }

  const toggleComplete = async (task) => {
    try {
      await axios.put(`/api/tasks/${task._id}`, { completed: !task.completed })
      fetchTasks()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`)
      fetchTasks()
    } catch (err) {
      console.error(err)
    }
  }

  const filterBySearch = (taskList) => {
    if (!searchQuery.trim()) return taskList
    const q = searchQuery.toLowerCase()
    return taskList.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.description && t.description.toLowerCase().includes(q))
    )
  }

  const pending = filterBySearch(
    tasks
      .filter(t => !t.completed)
      .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  )

  const done = filterBySearch(
    tasks
      .filter(t => t.completed)
      .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
  )

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', {
    month: '2-digit', day: '2-digit', year: 'numeric'
  })

  const formatTime = (d) => new Date(d).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  })

  const getDaysLeft = (dateStr) => {
    const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24))
    if (diff < 0) return 'Overdue'
    if (diff === 0) return 'Today'
    return `${diff}d left`
  }

  const getBadgeClass = (p) => {
    if (p === 'High') return 'badge-high'
    if (p === 'Low') return 'badge-low'
    return 'badge-medium'
  }

  const getCardClass = (task) => {
    if (task.completed) return 'task-card done'
    return `task-card ${task.priority.toLowerCase()}`
  }

  const TaskCard = ({ task }) => (
    <div className={getCardClass(task)}>
      <div className="task-card-top">
        <div style={{ flex: 1 }}>
          <span className={`task-title ${task.completed ? 'striked' : ''}`}>{task.title}</span>
          <br />
          <span className={`priority-badge ${getBadgeClass(task.priority)}`}>{task.priority}</span>
          {task.description && <p className="task-desc">{task.description}</p>}
        </div>
        <div className="task-card-actions">
          <button
            className={`complete-btn ${task.completed ? 'done' : ''}`}
            onClick={() => toggleComplete(task)}
            title={task.completed ? 'Mark pending' : 'Mark done'}
          >
            {task.completed && <FaCheck size={10} />}
          </button>
          <button className="delete-btn" onClick={() => deleteTask(task._id)} title="Delete">
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="task-meta">
        <span><MdCalendarToday /> {formatDate(task.createdAt)}</span>
        <span><MdAccessTime /> {formatTime(task.createdAt)}</span>
        {task.scheduleDate && (
          <span className="schedule-info">
            <MdEvent /> {new Date(task.scheduleDate).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            })} ({getDaysLeft(task.scheduleDate)})
          </span>
        )}
        {task.completedAt && (
          <span className="completed-info">
            <MdCheckBox /> {new Date(task.completedAt).toLocaleString('en-GB', {
              year: 'numeric', month: '2-digit', day: '2-digit',
              hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            }).replace(',', '')}
          </span>
        )}
      </div>
    </div>
  )

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <FaRocket />
          <span>NexaTask</span>
        </div>
        <div className="navbar-right">
          <span>Welcome, {user?.name}</span>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </nav>

      <div className="dashboard">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h2>Hey, {user?.name} 👋</h2>
            <p className="date">{today}</p>
          </div>
          <div className="search-container">
            <FaSearch />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card yellow">
            <span className="stat-title">Total Tasks</span>
            <span className="stat-value">{tasks.length}</span>
          </div>
          <div className="stat-card green">
            <span className="stat-title">Completed</span>
            <span className="stat-value">{tasks.filter(t => t.completed).length}</span>
          </div>
        </div>

        {/* Add Task */}
        <div className="add-task-section">
          <div className="section-brand">
            <FaRocket size={24} />
            <div>
              <h3>NexaTask</h3>
            </div>
          </div>
          <span className="add-task-label">Add New Task</span>
          <div className="task-form-row">
            <div>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAddTask()}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Add details..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div>
              <select value={priority} onChange={e => setPriority(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: 'auto', flex: 'none' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.9rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <input
                  type="checkbox"
                  checked={showSchedule}
                  onChange={e => setShowSchedule(e.target.checked)}
                />
                Schedule
              </label>
            </div>
            {showSchedule && (
              <div>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={e => setScheduleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            )}
            <button className="add-task-btn" onClick={handleAddTask} disabled={adding || !title.trim()}>
              {adding ? 'Adding...' : <><FaPlus /> Add Task</>}
            </button>
          </div>
        </div>

        {/* Task Columns */}
        <div className="task-columns">
          <div className="task-col">
            <div className="col-header">
              <h3 className="todo-title">📋 Pending</h3>
              <span className="task-count">{pending.length}</span>
            </div>
            <div className="tasks-scroll">
              {pending.length === 0
                ? <div className="empty-state">🎉 No pending tasks!</div>
                : pending.map(t => <TaskCard key={t._id} task={t} />)
              }
            </div>
          </div>

          <div className="task-col">
            <div className="col-header">
              <h3 className="done-title">✅ Done</h3>
              <span className="task-count">{done.length}</span>
            </div>
            <div className="tasks-scroll">
              {done.length === 0
                ? <div className="empty-state">Complete a task to see it here</div>
                : done.map(t => <TaskCard key={t._id} task={t} />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
