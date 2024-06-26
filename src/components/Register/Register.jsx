import { GithubAuthProvider, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithPopup, signOut, sendEmailVerification, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Register = () => {

    const [userInfo, setUserInfo] = useState('');
    const [createUserInfo, setCreateUserInfo] = useState('');
    const [errorCreateUserInfo, setErrorCreateUserInfo] = useState('');
    const [showHidePassword, setShowHidePassword] = useState(false)
    // const [loginLogoutState, setLoginLogoutState] = useState(false)

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    // Form Submission Integration
    const handleFormSubmit = e => {
        e.preventDefault();
        const name = e.target.name.value
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;



    // Reset Message;
        setCreateUserInfo('')
        setErrorCreateUserInfo('')

        if (password.length < 6) {
            setErrorCreateUserInfo(alert('Password should be atleadt 6 character or longer'));
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setErrorCreateUserInfo(alert('Password should be include  atleast one uppercase'));
            return
        }
        else if (!accepted) {
            setErrorCreateUserInfo('Please accept terms and condition');
            return
        }
        

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                setCreateUserInfo('Account Created Successfully')
                console.log(result.user)

    // Update User Details
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                .then()
                .catch(() => {

                })
    // Send Verification Mail
                sendEmailVerification(result.user)
                .then(() => {
                    alert('Please verify your email')
                })
            })
            .catch(error => {
                setErrorCreateUserInfo(error.message)
            })
    }

    // SignIn With Google Popup
    const handleGoogleSignInPopup = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user)
                setUserInfo(result.user)
            })
            .catch(error => {
                console.log(error.message);
                errorCreateUserInfo(error)
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
            <form onSubmit={handleFormSubmit} className="card-body w-1/2 mx-auto">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <div className="relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={showHidePassword ? "text" : "password"} name="password" placeholder="password" className="input w-full input-bordered" required />
                        <button className="absolute mt-4 ml-[-25px]" onClick={() => setShowHidePassword(!showHidePassword)}>
                            {showHidePassword ? <IoEye></IoEye> : <IoMdEyeOff></IoMdEyeOff>}
                        </button>
                    </div>

                    {/* <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label> */}
                </div>
                <div>
                    <input type="checkbox" name="terms" id="terms" />
                    <label className="ml-3" htmlFor="terms">Accept our <a className="underline text-blue-500" href="#">Terms and Conditions</a></label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Submit</button>
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
                        createUserInfo && <p className="text-green-600">{createUserInfo}</p>
                    }
                    {
                        userInfo && <>
                            <p className="text-xl">{userInfo.displayName}</p>
                            <p>{userInfo.email}</p>
                        </>
                    }
                    {
                        errorCreateUserInfo && <p className="text-red-600">{errorCreateUserInfo}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Register;