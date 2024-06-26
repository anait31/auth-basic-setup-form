import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";
import { useRef, useState } from "react";

const Login = () => {

    const [userInfo, setUserInfo] = useState('')

    const emailRef = useRef();

    const auth = getAuth(app);

    // Handle SignIn With Email and Password

    const handleLoginWithEmailAndPassword = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user)
            if(result.user.emailVerified) {
                setUserInfo('Account Login Successfully')
            }
            else{
                alert('Please verify your email')
            }
        })
        .catch(error => {
            console.log(error.message);
        })

    }

    // Handle Forget Password

    const handleForgetPassword = () => {
        const email = emailRef.current.value;

        if(!email) {
            alert('Please provide an email address')
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert('Please provide a valid email address');
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then(() => {
            alert('Please check your email. Thanks you')
        })
        .catch(error => {
            console.log(error.message)
        })

    }

    return (
        <div className="max-w-[1280px] mx-auto">
            <h2 className="text-center text-4xl capitalize font-bold">Please Login</h2>
            <form onSubmit={handleLoginWithEmailAndPassword} className="card-body w-1/2 mx-auto">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" ref={emailRef} name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                    {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                </div>
                <div>
                    <label className="label">
                        <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
                <div>
                    <p>New to this website? <Link to='/register' className="underline text-blue-500">Please Register</Link></p>
                </div>
            </form>
            <div>
                {userInfo && <p className="text-center">{userInfo}</p>}
            </div>
        </div>
    );
};

export default Login;