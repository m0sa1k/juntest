import {useState, useEffect} from 'react'
import Employee from './Employee'
import {DeleteEmployee} from './modals/DeleteEmployee'
import {CreateEmployee} from './modals/CreateEmployee'
import {EditEmployee} from './modals/EditEmployee'


const App = () => {

  const url = 'http://localhost:5000/employees'

  const [employees, setEmployees] = useState([])
  const [currentEmployer, setCurrentEmployer] = useState(null)
  
  const fetchUsers = () => {
    fetch(url)
      .then(response => {
        if(response.status !== 200) throw new Error('Статус '+response.status)
        return response.json()
      })
      .then(json => setEmployees(json))
      .catch(e => console.log(e.message))

  }

  useEffect(() => { fetchUsers() }, [])

  const [deleteModal, setDeleteModal] = useState(false)
  const closeDeleteModal = () => setDeleteModal(false)

  const [createModal, setCreateModal] = useState(false)
  const closeCreateModal = () => setCreateModal(false)

  const [editModal, setEditModal] = useState(false)
  const closeEditModal = () => setEditModal(false)

  const createEmployee = () => {
    setCreateModal(true)
  }

  const editEmployee = emp => {
    setCurrentEmployer(emp)
    setEditModal(true)
  }

  const deleteEmployee = emp => {
    setCurrentEmployer(emp)
    setDeleteModal(true)
  }

  return (
    <div className='container'>
      <header>
        <h1 className='text-center'>List of Employees</h1>
      </header>
      <main>
        {employees.length ? 
        <table className='table'>
            <thead>
              <tr>
                <th className='d-none d-sm-table-cell' scope='col'></th>
                <th scope='col'>Firstname</th>
                <th scope='col'>Lastname</th>
                <th scope='col'>Methods</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => <Employee
                                        key = {employee.id}
                                        employee = {employee}
                                        editEmployee = {editEmployee}
                                        deleteEmployee = {deleteEmployee}
                                        index = {++index}
                                        />)}
            </tbody>
        </table> : 
        <h3 className='text-center'>No employees</h3>}

        <button onClick={createEmployee} className='btn btn-primary'>Создать</button>

        <EditEmployee
          visible = { editModal }
          onClose = { closeEditModal }
          currentEmployer = { currentEmployer }
          fetchUsers = { fetchUsers }
          url = {url}
        />

        <DeleteEmployee
          visible = { deleteModal }
          onClose = { closeDeleteModal }
          currentEmployer = { currentEmployer }
          fetchUsers = { fetchUsers }
          url = {url}
        />

        <CreateEmployee
          visible = { createModal }
          onClose = { closeCreateModal }
          fetchUsers = { fetchUsers }
          url = {url}
        />
      </main>
    </div>
  );
}

export default App;