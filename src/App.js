import {useState, useEffect} from 'react'
import Employee from './Employee'
import {DeleteEmployee} from './modals/DeleteEmployee'
import {CreateEmployee} from './modals/CreateEmployee'
import {EditEmployee} from './modals/EditEmployee'

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = 'http://localhost:5000/employees'

  const [employees, setEmployees] = useState([])
  const [currentEmployer, setCurrentEmployer] = useState(null)
  
  const fetchUsers = () => {
    fetch(url)
      .then(response => {
        if(response.status !== 200) throw new Error('Ошибка: статус '+response.status)
        return response.json()
      })
      .then(json => setEmployees(json))
      .catch(e => toast(e.message, {
        hideProgressBar: true,
        type: 'error'
      }))
  }

  useEffect(() => { fetchUsers() }, [])

  const remove = id => {
    setEmployees(employees.filter(employee => id !== employee.id))
  }

  const add = employee => {
    setEmployees([...employees, employee])
  }

  const edit = (newEmployee, id) => {
    setEmployees(employees.map(employee => {
      return id === employee.id ? {...newEmployee, id} : employee
    }))
  }

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
                                        key={employee.id}
                                        employee={employee}
                                        editEmployee={editEmployee}
                                        deleteEmployee={deleteEmployee}
                                        index={++index}
                                        />)}
            </tbody>
        </table> : 
        <h3 className='text-center'>No employees</h3>}

        <button onClick={createEmployee} className='btn btn-secondary'>Создать</button>

        <EditEmployee
          visible={editModal}
          onClose={closeEditModal}
          currentEmployer={currentEmployer}
          fetchUsers={fetchUsers}
          url={url}
          edit={edit}
        />

        <DeleteEmployee
          visible={deleteModal}
          onClose={closeDeleteModal}
          currentEmployer={currentEmployer}
          fetchUsers={fetchUsers}
          url={url}
          remove={remove}
        />

        <CreateEmployee
          visible={createModal}
          onClose={closeCreateModal}
          fetchUsers={fetchUsers}
          url={url}
          add={add}
        />

        <ToastContainer />
      </main>
    </div>
  );
}

export default App;