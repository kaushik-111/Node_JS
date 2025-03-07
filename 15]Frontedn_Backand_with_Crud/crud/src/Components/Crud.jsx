import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Crud () {
  const [record, setRecord] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState(null)
  const [rate, setRate] = useState('')
  const [count, setCount] = useState('')
  const [editID, setEditID] = useState(null)

  const fetchApi = async () => {
    try {
      const response = await axios.get('http://localhost:1122')
      console.log('Fetched Data:', response.data.data); // 🔍 Debugging ke liye
      setRecord(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [editID])

  const addData = async e => {
    e.preventDefault()

    if (
      !image ||
      title === '' ||
      price === '' ||
      description === '' ||
      category === ''
    ) {
      alert('All fields are required!')
      return
    }

    const formData = new FormData()
    formData.append('image', image)
    formData.append('title', title)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('rate', rate)
    formData.append('count', count)

    try {
      await axios.post('http://localhost:1122/addData', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      fetchApi()
      resetForm()
    } catch (error) {
      console.error(
        'Error adding data:',
        error.response ? error.response.data : error.message
      )
    }
  }

  const deleteData = async id => {
    try {
      await axios.delete(`http://localhost:1122/deleteData/${id}`)
      fetchApi()
    } catch (error) {
      console.error('Error deleting data:', error)
    }
  }

  const editData = item => {
    setEditID(item._id)
    setTitle(item.title)
    setPrice(item.price)
    setDescription(item.description)
    setCategory(item.category)
    setRate(item.rate)
    setCount(item.count)
    if (item.image) {
      setImage(item.image) // ✅ Purana image set karo
    } else {
      setImage(null) // Agar image nahi hai toh null rakhna
    }
    document.querySelector('.form').scrollIntoView({ behavior: 'smooth' })
  }

  const updateData = async e => {
    e.preventDefault()

    if (!editID) {
      alert('No data selected for update!')
      return
    }

    const formData = new FormData()
    formData.append('title', title)
    formData.append('price', price)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('rate', rate)
    formData.append('count', count)

    if (image instanceof File) {
      formData.append('image', image) // ✅ Agar naya image select ho toh bhejo
    }

    try {
      await axios.put(`http://localhost:1122/updateData/${editID}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      fetchApi()
      resetForm()
    } catch (error) {
      console.error(
        'Error updating data:',
        error.response ? error.response.data : error.message
      )
    }
  }

  const resetForm = () => {
    setTitle('')
    setPrice('')
    setDescription('')
    setCategory('')
    setRate('')
    setCount('')
    setEditID(null)
    setImage(null) // ✅ Image reset tabhi hoga jab update ho chuka ho
    if (document.getElementById('imageInput')) {
      document.getElementById('imageInput').value = '' // ❌ Update ke baad input clear mat karo
    }
  }

  // Input validation handlers
  const handleTextChange = (e, setter) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '') // Allow only letters and spaces
    setter(value)
  }

  const handleNumberChange = (e, setter) => {
    const value = e.target.value.replace(/\D/g, '') // Allow only numbers
    setter(value)
  }

  return (
    <div className='container'>
      <form
        className='form'
        onSubmit={editID ? updateData : addData}
        encType='multipart/form-data'
      >
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={e => handleTextChange(e, setTitle)}
          className='input'
          required
        />
        <input
          type='text'
          placeholder='Price'
          value={price}
          onChange={e => handleNumberChange(e, setPrice)}
          className='input'
          required
        />
        <input
          type='text'
          placeholder='Description'
          value={description}
          onChange={e => handleTextChange(e, setDescription)}
          className='input'
          required
        />
        <input
          type='text'
          placeholder='Category'
          value={category}
          onChange={e => handleTextChange(e, setCategory)}
          className='input'
          required
        />
        <input
          id='imageInput'
          type='file'
          accept='image/*'
          onChange={e => setImage(e.target.files[0])}
          className='input'
          required={!editID} // ✅ Required only if NOT in edit mode
        />
        <input
          type='number'
          placeholder='Rate'
          value={rate}
          onChange={e => {
            let value = e.target.value
            if (value < 0) value = 0
            if (value > 5) value = 5
            setRate(value)
          }}
          className='input'
          min='0'
          max='5'
          step='0.1'
          required
        />

        <input
          type='text'
          placeholder='Count'
          value={count}
          onChange={e => handleNumberChange(e, setCount)}
          className='input'
          required
        />
        <button type='submit' className='button'>
          {editID ? 'Update Data' : 'Add Data'}
        </button>
      </form>

      <h1 className='heading'>Product Records</h1>
      <div className='records'>
        {record.length === 0 ? (
          <p className='no-records'>No records available</p>
        ) : (
          record.map(item => (
            <div key={item._id} className='record-card'>
              <img
                src={`http://localhost:1122/${item.image}`}
                alt={item.title}
                className='record-image'
              />
              <h3 className='record-title'>{item.title}</h3>
              <p className='record-price'>Price: ${item.price}</p>
              <p className='record-description'>
                {item.description.length > 50
                  ? `${item.description.slice(0, 50)}...`
                  : item.description}
              </p>
              <p className='record-category'>Category: {item.category}</p>
              <p className='record-rating'>
                {'⭐'.repeat(Math.floor(item.rate)) +
                  (item.rate % 1 >= 0.5 ? '½' : '') || 'No Rating'}
              </p>

              <div className='record-buttons'>
                <button
                  onClick={() => deleteData(item._id)}
                  className='delete-btn'
                >
                  Delete
                </button>
                <button onClick={() => editData(item)} className='edit-btn'>
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
