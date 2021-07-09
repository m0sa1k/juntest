const Employee = ({
  employee,
  editEmployee,
  deleteEmployee,
  index}) => {
  return (
      <tr>
        <th className='d-none d-sm-table-cell' scope='row'>{index}</th>
        <td>{employee.firstname}</td>
        <td>{employee.lastname}</td>
        <td className='d-flex flex-column flex-sm-row'>
          <button
            onClick={() => editEmployee(employee)}
            className='btn btn-secondary me-sm-1 mb-1 mb-sm-0'>Изменить</button>
          <button
            onClick={() => deleteEmployee(employee)}
            className='btn btn-danger'>Удалить</button>
        </td>
      </tr>
  );
}

export default Employee;