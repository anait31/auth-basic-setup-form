import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import app from "../../firebase/firebase.init";

const Login = () => {

    const auth = getAuth(app);

    const handleLoginWithEmailAndPassword = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user)
        })
        .catch(error => {
            console.log(error.message);
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
                    <input type="email" name="email" placeholder="email" className="input input-bordered" required />
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
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
                <div>
                    <p>New to this website? <Link to='/register' className="underline text-blue-500">Please Register</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;