import { useState, useEffect } from 'react';

export const EditEmployee = ({
  visible = false,
  onClose,
  currentEmployer,
  fetchUsers
}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  useEffect( () => {
        setFirstname(currentEmployer ? currentEmployer.name : '')
        setLastname(currentEmployer ? currentEmployer.username : '')
    }, [currentEmployer])

  if (!visible) return null

  const closeWithAction = () => {
    console.log(`Submitting Name ${firstname} ${lastname}`)

    // fetch(`https://jsonplaceholder.typicode.com/users/1`, {
    //   method: 'DELETE',
    // })
    // .then(response => console.log(response.status))
    // .then(() => fetchUsers())
    
    onClose()
  }

  return (
    <div className='custom-modal' onClick={onClose}>
      <div className='custom-modal-dialog' onClick={ e => e.stopPropagation() }>
        <div className='custom-modal-header'>
          <div className='custom-modal-title'>Изменение</div>
          <span className='custom-modal-close' onClick={onClose}>
            &times;
          </span>
        </div>
        <div className='custom-modal-body'>
          <div className='custom-modal-content'>
            <form className='form'>
              <label>
                Firstname:
                <input
                  type="text"
                  value={firstname}
                  onChange={e => setFirstname(e.target.value)}
                />
              </label>
              <label>
                Lastname:
                <input
                  type="text"
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
                />
              </label>
            </form>
          </div>
        </div>
        <div className='custom-modal-footer'>
          <button className='btn btn-success me-1'
            onClick={closeWithAction}>Изменить</button>
          <button className='btn btn-primary'
            onClick={onClose}>Назад</button>
        </div>
      </div>
    </div>
  )
}