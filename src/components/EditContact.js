import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import contacts from "bootstrap/js/src/dom/selector-engine";
import {toast} from "react-toastify";

const EditContact = () => {
    const {id} = useParams()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const contacts = useSelector((state)=>state);
    const currentContact = contacts.find((contact)=>contact.id===parseInt(id))
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(currentContact){
            setName(currentContact.name);
            setEmail(currentContact.email);
            setNumber(currentContact.number);
        }

    }, [currentContact]);

    const handleSubmit = (event)=>{
        event.preventDefault()
        const checkEmail = contacts.find(
            (contact)=>contact.id !== parseInt(id) && contact.email === email
        );
        const checkNumber = contacts.find(
            (contact)=>contact.id !== parseInt(id) && contact.number === parseInt(number)
        );
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
            id: parseInt(id),
            name,
            email,
            number

        }
        dispatch({type: "UPDATE_CONTACT", payload: data})
        toast.success("Student updated successfully!")
        navigate("/");

    }

    return (
        <div className='container'>
            {currentContact?(
                <>
                    <div className='row'>
                        <h1 className='display-3 text-center my-5'>
                            Edit Contact {id}
                        </h1>
                        <div className='col-md-6 shadow mx-auto p-5'>
                            <form onSubmit={handleSubmit}>
                                <div className='form-group'>
                                    <input
                                        className="form-control mb-3"
                                        type='text'
                                        placeholder = "Name"
                                        onChange={(event)=>setName(event.target.value)}
                                        value={name}/>
                                </div>
                                <div className='form-group'>
                                    <input
                                        className="form-control mb-3"
                                        type='email'
                                        placeholder = "Email"
                                        onChange={(event)=>setEmail(event.target.value)}
                                        value={email}/>
                                </div>
                                <div className='form-group'>
                                    <input
                                        className="form-control mb-3"
                                        type='number'
                                        placeholder = "Phone number"
                                        onChange={(event)=>setNumber(event.target.value)}
                                        value={number}/>
                                </div>
                                <div className='form-group'>
                                    <input
                                        className="btn btn-dark"
                                        type='submit'
                                        value = "Update student" />
                                    <Link className="btn btn-dark m-3" to="/">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            ):(
                <h1 className='display-3 text-center my-5'>
                    Student contact with id {} not exists
                </h1>
            )}


        </div>
    );
};

export default EditContact;
