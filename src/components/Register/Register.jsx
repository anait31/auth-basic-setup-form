import { Link } from "react-router-dom";

const Register = () => {
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
        </div>
    );
};

export default Register;