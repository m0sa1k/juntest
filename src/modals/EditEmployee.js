import {useState, useEffect, Fragment} from 'react';
import {toast} from 'react-toastify';
import {Modal} from './Modal';

export const EditEmployee = ({
  visible,
  onClose,
  currentEmployer,
  url,
  edit
}) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  useEffect( () => {
    setFirstname(currentEmployer ? currentEmployer.firstname : '')
    setLastname(currentEmployer ? currentEmployer.lastname : '')
  }, [currentEmployer])

  if (!visible) return null

  const closeWithAction = () => {

    let first = firstname.trim()
    let last = lastname.trim()

    if (!first || !last) {
      (!first && !last) ? toast('Заполните пустые поля', {
          hideProgressBar: true,
          type: 'error'
        }) : first ? toast('Заполните поле Lastname', {
          hideProgressBar: true,
          type: 'error'
        }) : toast('Заполните поле Firstname', {
          hideProgressBar: true,
          type: 'error'
        })

      return
    }

    let newEmployee = {
      firstname,
      lastname
    }

    fetch(url+'/'+currentEmployer.id, {
      method: 'PUT',
      body: JSON.stringify(newEmployee),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.status !== 200) throw new Error('Ошибка: статус '+response.status)
      return response.json()
    })
    .then(() => edit(newEmployee, currentEmployer.id))
    .then(() => toast(`Сотрудник ${firstname} ${lastname} успешно изменен.`, {
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
    setFirstname(currentEmployer.firstname)
    setLastname(currentEmployer.lastname)
    onClose()
  }

  const body = (
    <form>
      <label className='form-label'>
        Firstname:
      </label>
      <input
        className='form-control'
        type='text'
        value={firstname}
        onChange={e => setFirstname(e.target.value)}
      />
      <label className='form-label'>
        Lastname:
      </label>  
      <input
        className='form-control'
        type='text'
        value={lastname}
        onChange={e => setLastname(e.target.value)}
      />
    </form>
  )

  const footer = (
    <Fragment>
      <button className='btn btn-secondary me-1'
        onClick={closeWithAction}>Изменить</button>
      <button className='btn btn-outline-info'
        onClick={closeWithoutAction}>Назад</button>
    </Fragment>
  )
  

  return (
    <Modal
      visible = {visible}
      onClose = {closeWithoutAction}
      body = {body}
      footer = {footer}
    />
  )
}