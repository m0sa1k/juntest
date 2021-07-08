const Employee = ({data, editEmployee, deleteEmployee}) => {
  return (
      <tr>
        <th className='d-none d-sm-table-cell' scope='row'>{data.id}</th>
        <td>{data.name}</td>
        <td>{data.username}</td>
        <td className='d-flex flex-column flex-sm-row'>
          <button
            onClick={() => editEmployee(data)}
            className='btn btn-success me-sm-1 mb-1 mb-sm-0'>Изменить</button>
          <button
            onClick={() => deleteEmployee(data)}
            className='btn btn-danger'>Удалить</button>
        </td>
      </tr>
  );
}

export default Employee;