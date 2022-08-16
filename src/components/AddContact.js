import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify"

const AddContact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const contacts = useSelector((state)=>state);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const handleSubmit = (event)=>{
        event.preventDefault()
        const checkEmail = contacts.find(
            (contact)=>contact.email === email && email
        )
        const checkNumber = contacts.find(
            (contact)=>contact.number === parseInt(number) && number
        )
        if(!email || !number || !name){
            return toast.warning("Please fill in all fields!")
        }
        if(checkEmail){
            return toast.error("This email already exists!")
        }
        if(checkNumber){
            return toast.error("This number already exists!")
        }
        const data = {
            id: contacts[contacts.length - 1].id + 1,
            name,
            email,
            number

        }
        dispatch({type: "ADD_CONTACT", payload: data})
        toast.success("Student added successfully!")
        navigate("/");

    }

    return (

        <div className='container'>
            <div className='row'>
                <h1 className='display-3 text-center my-5'>
                    Add Contact
                </h1>
                <div className='col-md-6 shadow mx-auto p-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input className="form-control mb-3"
                                   type='text'
                                   placeholder = "Name"
                                   onChange={(event)=>setName(event.target.value)}
                                   value={name}/>
                        </div>
                        <div className='form-group'>
                            <input className="form-control mb-3"
                                   type='email'
                                   value={email}
                                   onChange={(event)=>setEmail(event.target.value)}
                                   placeholder = "Email" />
                        </div>
                        <div className='form-group'>
                            <input className="form-control mb-3"
                                   type='number'
                                   value={number}
                                   onChange={(event)=>setNumber(event.target.value)}
                                   placeholder = "Phone number" />
                        </div>
                        <div className='form-group'>
                            <input className="btn btn-block btn-dark"
                                   type='submit'
                                   value = "Add student" />
                        </div>
                    </form>
                </div>
            </div>

        </div>

    );
};

export default AddContact;
