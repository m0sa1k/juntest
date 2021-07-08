export const DeleteEmployee = ({
  visible = false,
  onClose,
  currentEmployer,
  fetchUsers,
  url
}) => {
  if (!visible) return null

  const closeWithAction = () => {
    fetch(`${url}/${currentEmployer.id}`, {
      method: 'DELETE',
    })
    .then(response => console.log(response.status))
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
          <div className='custom-modal-content'>Вы уверены, что хотите удалить {currentEmployer.firstname} {currentEmployer.lastname}?</div>
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