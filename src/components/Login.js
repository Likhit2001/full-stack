import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [credentials, setcredentials] = useState({email:" " , password:""})
    const navigate = useNavigate();
    const host = "http://localhost:5500";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
           method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body :JSON.stringify({email: credentials.email, password: credentials.password}),
        });
        
        const json = await response.json();
        console.log(json);

        if(json.success){
            localStorage.setItem('token' , json.authtoken);
            navigate("/")
        }else{
            alert("Invalid Credentials")
        }
        
    }

    const onchange =(e)=>{
        setcredentials({...credentials , [e.target.name]:[e.target.value]})

    }
    return (
        <div>
            <div className='container my-2'>
                <form className='container my-2' onSubmit={handleSubmit}>
                    <div className="form-group  my-2 ">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" value={credentials.email} name='email' aria-describedby="emailHelp" placeholder="Enter email"  onChange={onchange} />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group  my-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" value={credentials.password} name='password' id="password" placeholder="Password"  onChange={onchange}/>
                    </div>

                    <button type="submit" className="btn btn-primary my-2">Submit</button>
                </form>
            </div>

        </div>
    )
}
