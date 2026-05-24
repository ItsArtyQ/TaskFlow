import { useEffect, useState } from 'react'
import { api } from '../lib/api'

interface Board {
  id: string
  title: string
}

interface Task {
  id: string
  title: string
  description: string
  status: string
  boardId: string
}

export default function DashboardPage() {
  const [boards, setBoards] = useState<Board[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  const [boardTitle, setBoardTitle] = useState('')

  const [taskTitle, setTaskTitle] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [selectedBoardId, setSelectedBoardId] = useState('')

  useEffect(() => {
    fetchBoards()
    fetchTasks()
  }, [])

  async function fetchBoards() {
    const response = await api.get('/boards')

    if (Array.isArray(response.data)) {
      setBoards(response.data)
      return
    }

    if (Array.isArray(response.data.data)) {
      setBoards(response.data.data)
      return
    }

    setBoards([])
  }

  async function fetchTasks() {
    try {
      const response = await api.get('/tasks')

      if (Array.isArray(response.data)) {
        setTasks(response.data)
        return
      }

      if (Array.isArray(response.data.data)) {
        setTasks(response.data.data)
        return
      }

      setTasks([])
    } catch {
      setTasks([])
    }
  }

  async function createBoard() {
    if (!boardTitle.trim()) return

    await api.post('/boards', {
      title: boardTitle,
    })

    setBoardTitle('')

    fetchBoards()
  }

  async function createTask() {
    if (!taskTitle.trim() || !selectedBoardId) return

    await api.post('/tasks', {
      title: taskTitle,
      description: taskDescription,
      boardId: selectedBoardId,
    })

    setTaskTitle('')
    setTaskDescription('')

    fetchTasks()
  }

  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <div className='dashboard'>
      <div className='header'>
        <div>
          <h1 className='title'>TaskFlow</h1>
          <p className='subtitle'>Boards and tasks dashboard</p>
        </div>

        <button className='button logout' onClick={logout}>
          Logout
        </button>
      </div>

      <div className='board-card' style={{ marginBottom: 24 }}>
        <h2>Create Board</h2>

        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          <input
            className='input'
            placeholder='Board title'
            value={boardTitle}
            onChange={(e) => setBoardTitle(e.target.value)}
          />

          <button className='button' onClick={createBoard}>
            Create
          </button>
        </div>
      </div>

      <div className='board-card' style={{ marginBottom: 32 }}>
        <h2>Create Task</h2>

        <div className='form' style={{ marginTop: 16 }}>
          <input
            className='input'
            placeholder='Task title'
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />

          <textarea
            className='input'
            placeholder='Description'
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />

          <select
            className='input'
            value={selectedBoardId}
            onChange={(e) => setSelectedBoardId(e.target.value)}
          >
            <option value=''>Select board</option>

            {boards.map((board) => (
              <option key={board.id} value={board.id}>
                {board.title}
              </option>
            ))}
          </select>

          <button className='button' onClick={createTask}>
            Create Task
          </button>
        </div>
      </div>

      {boards.length === 0 ? (
        <div className='empty'>
          No boards yet. Create your first board.
        </div>
      ) : (
        <div className='board-grid'>
          {boards.map((board) => (
            <div className='board-card' key={board.id}>
              <h2>{board.title}</h2>

              {tasks.filter((task) => task.boardId === board.id).length === 0 ? (
                <div className='empty'>
                  No tasks in this board.
                </div>
              ) : (
                tasks
                  .filter((task) => task.boardId === board.id)
                  .map((task) => (
                    <div className='task' key={task.id}>
                      <h3>{task.title}</h3>

                      <p style={{ marginTop: 8 }}>
                        {task.description}
                      </p>

                      <div className='status'>
                        {task.status}
                      </div>
                    </div>
                  ))
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}