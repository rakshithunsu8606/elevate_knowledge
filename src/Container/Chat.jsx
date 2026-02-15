import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import Textinput from '../admin/Componet/TextFiled/Textinput';
import { Form, Formik } from 'formik';
import { object, string } from 'yup';
import { Button } from '@mui/material';

function Chat(props) {
    const [to, setTo] = useState("")
    const [msg, setMsg] = useState("");
    const [allmsg, setAllmsg] = useState([]);
    const [group, setGroup] = useState('');

    const socket = useMemo(() => io("http://localhost:5000"), []);

    socket.on('connect', () => {
        console.log("Server Concted:", socket.id);

    });

    socket.on('Welcome', (message) => {
        console.log(message);
    })

    useEffect(() => {
        socket.on('Receiver-Send', (message) => {
            console.log(message);
            setAllmsg((prev) => ([...prev, message]))
        })
    }, [])

    const handleSubmit = () => {
        event.preventDefault();

        console.log(to, msg);

        socket.emit("SendMsg", { to, msg })
    }

    const handleGroupsubmit = () => {
        event.preventDefault();

        console.log("CreateGroup:", group);

        socket.emit("CreateGroup",group)
    }



    return (
        <div>
            {
                allmsg.map((m) => (
                    <p>{m}</p>
                ))
            }

            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='to'
                    onChange={(e) => setTo(e.target.value)}
                    placeholder='Enter Sende_id'
                />
                <br />

                <input
                    type='text'
                    name='msg'
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder='Enter Msg'
                />
                <br />

                <input
                    type='submit'
                />

            </form>

            <br /><br />

            <form onSubmit={handleGroupsubmit}>
                <input
                    type='text'
                    name='group'
                    onChange={(e) => setGroup(e.target.value)}
                    placeholder='Enter Group'
                />
                <br />

                <input
                    type='submit'
                />
            </form>
        </div>
    );
}

export default Chat;