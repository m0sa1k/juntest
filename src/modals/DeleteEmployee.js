export const DeleteEmployee = ({
  visible = false,
  onClose,
  currentEmployer,
  fetchUsers
}) => {
  if (!visible) return null

  const closeWithAction = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${currentEmployer.id}`, {
      method: 'DELETE',
    })
    .then(response => console.log(response.status, currentEmployer.name))
    .then(() => fetchUsers())
    
    onClose()
  }

  return (
    <div className='custom-modal' onClick={onClose}>
      <div className='custom-modal-dialog' onClick={ e => e.stopPropagation() }>
        <div className='custom-modal-header'>
          <span className='custom-modal-close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='custom-modal-body'>
          <div className='custom-modal-content'>Вы уверены, что хотите удалить {currentEmployer.name}?</div>
        </div>
        <div className='custom-modal-footer'>
          <button className='btn btn-danger me-1'
            onClick={closeWithAction}>Удалить</button>
          <button className='btn btn-primary'
            onClick={onClose}>Назад</button>
        </div>
      </div>
    </div>
  )
}