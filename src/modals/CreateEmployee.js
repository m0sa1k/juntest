import {useState, useRef} from 'react';
import {toast} from 'react-toastify';

export const CreateEmployee = ({
  visible=false,
  onClose,
  url,
  add
}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  
  const iFN = useRef(null);
  const iLN = useRef(null);
  const formRef = useRef(null);

  if (!visible) return null

  const closeWithAction = () => {
    let newEmployee = {
      id: Date.now(),
      firstname,
      lastname
    }

    // iFN.current.focus()

    if (!firstname || !lastname) {
      formRef.current.className += ' was-validated';

      (!firstname && !lastname) ? toast('Заполните пустые поля', {
          hideProgressBar: true,
          type: 'error'
        }) : firstname ? toast('Заполните поле Lastname', {
          hideProgressBar: true,
          type: 'error'
        }) : toast('Заполните поле Firstname', {
          hideProgressBar: true,
          type: 'error'
        })

      return
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(newEmployee),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.status !== 201) throw new Error('Ошибка: статус '+response.status)
      return response.json()
    })
    .then(() => {
      add(newEmployee)
      setFirstname('')
      setLastname('')
    })
    .then(() => toast(`Добавлен сотрудник ${firstname} ${lastname}.`, {
      hideProgressBar: true,
      type: 'success'
    }))
    .catch(e => toast(e.message, {
      hideProgressBar: true,
      type: 'error'
    }))

    onClose()
  }

  const closeWithoutAction = () => {
    setFirstname('')
    setLastname('')
    onClose()
  }

  return (
    <div className='custom-modal' onClick={closeWithoutAction}>
      <div className='custom-modal-dialog' onClick={e => e.stopPropagation()}>
        <div className='custom-modal-header'>
          <div className='custom-modal-title'>
            Создание нового сотрудника
          </div>
          <span className='custom-modal-close' onClick={closeWithoutAction}>
            &times;
          </span>
        </div>
        <div className='custom-modal-body'>
          <div className='custom-modal-content'>
            <form className='form' ref={formRef}>
              <label className='form-label'>
                Firstname:
              </label>
              <input
                className='form-control'
                type='text'
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
                ref={iFN}
                required
              />
              <label className='form-label'>
                Lastname:
              </label>
              <input
                className='form-control'
                type='text'
                value={lastname}
                onChange={e => setLastname(e.target.value)}
                ref={iFN}
                required
              />
            </form>
          </div>
        </div>
        <div className='custom-modal-footer'>
          <button className='btn btn-secondary me-1'
            onClick={closeWithAction}>Создать</button>
          <button className='btn btn-outline-info'
            onClick={closeWithoutAction}>Назад</button>
        </div>
      </div>
    </div>
  )
}