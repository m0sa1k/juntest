import {useState, useEffect} from 'react'
import Employee from './Employee'
import {DeleteEmployee} from './modals/DeleteEmployee'
import {CreateEmployee} from './modals/CreateEmployee'
import {EditEmployee} from './modals/EditEmployee'


const App = () => {

  const url = 'https://jsonplaceholder.typicode.com'

  const [employees, setEmployees] = useState([])
  const [currentEmployer, setCurrentEmployer] = useState(null)
  
  const fetchUsers = () => {
    fetch(url+'/users')
      .then(response => response.json())
      .then(json => setEmployees(json))
      .then(() => console.log('done'))
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
              {employees.map(empl => <Employee
                                        key = {empl.id}
                                        data = {empl}
                                        editEmployee = {editEmployee}
                                        deleteEmployee = {deleteEmployee}
                                        />)}
            </tbody>
        </table> : 
        <h3 className='text-center'>No employees</h3>}

        <button onClick={createEmployee} className='btn btn-primary'>Создать</button>

        <EditEmployee
          visible={ editModal }
          onClose={ closeEditModal }
          currentEmployer = { currentEmployer }
          fetchUsers = { fetchUsers }
        />

        <DeleteEmployee
          visible={ deleteModal }
          onClose={ closeDeleteModal }
          currentEmployer = { currentEmployer }
          fetchUsers = { fetchUsers }
        />

        <CreateEmployee
          visible={ createModal }
          onClose={ closeCreateModal }
          fetchUsers = { fetchUsers }
        />
      </main>
    </div>
  );
}

export default App;