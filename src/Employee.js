const Employee = ({
  employee,
  editEmployee,
  deleteEmployee,
  index}) => {
  return (
      <tr>
        <th className='d-none d-sm-table-cell' scope='row'>{index}</th>
        <td className='text-break'>{employee.firstname}</td>
        <td className='text-break'>{employee.lastname}</td>
        <td>
          <div className='d-flex flex-column flex-sm-row' style={{height: '100%'}}>
            <button
              onClick={() => editEmployee(employee)}
              className='btn btn-secondary me-sm-1 mb-1 mb-sm-0'>Изменить</button>
            <button
              onClick={() => deleteEmployee(employee)}
              className='btn btn-danger'>Удалить</button>
          </div>
        </td>
      </tr>
  );
}

export default Employee;