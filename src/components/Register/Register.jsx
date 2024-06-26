import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { useState } from "react";

const Register = () => {

    const [userInfo, setUserInfo] = useState('');
    const [errorInfo, setErrorInfo] = useState('');
    // const [loginLogoutState, setLoginLogoutState] = useState(false)

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // SignIn With Google Popup
    const handleGoogleSignInPopup = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user)
                setUserInfo(result.user)
            })
            .catch(error => {
                console.log(error.message);
                setErrorInfo(error)
            })
    }
    // SignIn With GitHub Popup
    const handleGitHubSignInPopup = () => {
        signInWithPopup(auth, githubProvider)
        .then(result => {
            setUserInfo(result.user)
            console.log(result.user);
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    // SignOut Integration
    const handleSignOutButton = () => {
        signOut(auth)
        .then(result => {
            setUserInfo('')
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="max-w-[1280px] mx-auto">
            <h2 className="text-center text-4xl capitalize font-bold">Please Register</h2>
            <form className="card-body w-1/2 mx-auto">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" className="input input-bordered" required />
                    {/* <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label> */}
                </div>
                <div>
                    <input type="checkbox" name="" id="terms" />
                    <label className="ml-3" htmlFor="terms">Accept our <a href="#">Terms and Conditions</a></label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
                <div>
                    <p>Already Have and Account? <Link to='/login' className="underline text-blue-500">Please login</Link></p>
                </div>
            </form>
            <div className="text-center">
                <h1 className="text-xl font-bold">Or Sign In With</h1>
                <div className="mt-3">
                    {userInfo ? <button onClick={handleSignOutButton} className="btn btn-info text-white hover:bg-transparent hover:text-black duration-500">LogOut</button> :
                    <div className="space-x-3">
                        <button onClick={handleGoogleSignInPopup} className="btn btn-info text-white hover:bg-transparent hover:text-black duration-500">Google<FcGoogle /></button>
                        <button onClick={handleGitHubSignInPopup} className="btn btn-info text-white hover:bg-transparent hover:text-black duration-500">GitHub<FaGithub /></button>
                        <button className="btn btn-info text-white hover:bg-transparent hover:text-black duration-500">Twitter<FaTwitterSquare /></button>
                    </div>}
                </div>
                <div className="mt-3">
                    {
                        userInfo && <>
                            <p className="text-xl">{userInfo.displayName}</p>
                            <p>{userInfo.email}</p>
                        </>
                    }
                    {
                        errorInfo && <p>{errorInfo}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Register;