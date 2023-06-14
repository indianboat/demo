
import { useForm, SubmitHandler } from "react-hook-form";
import {NavLink,useNavigate} from 'react-router-dom';

type Inputs = {
  name:string,
  email: string,
  password: string,
};

export default function Signup() {
  let navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> =async (data) => {
    // const {name,email,password} = data;
    // console.log(name);
    try {
        const res = await fetch('/signup',{
            method:'POST',
            headers:{
                "Content-Type":'application/json',
            },
            body:JSON.stringify(data)
        })
        const result = await res.json();
        if(result.message==='Sign up success !'){
          alert('registered Successfully!')
          navigate('/signin');
        }
        console.log('submitted data:',result)
        
    } catch (error) {
        console.log('error,not fetched!',error);
    }
    
  }

//   console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input defaultValue="" {...register("name")} placeholder="full name" /> */}
      <div className="container w-25 mt-3">
      <div className="pb-2">
        <h5>signup and start learning</h5>
      </div>
      <div className="form-floating mb-3 border-1 rounded-0 ">
          <input defaultValue=""
          {...register("name")}
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Full Name"
        />
        <label htmlFor="floatingInput">Full Name</label>
      </div>

      <div className="form-floating mb-3">
          <input defaultValue=""
          {...register("email")}
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Email"
        />
        <label htmlFor="floatingInput">Email</label>
      </div>
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input defaultValue="" {...register("email")} placeholder="email" /> */}
      
      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("password", { required: true })} placeholder="password" /> */}
      <div className="form-floating mb-3">
          <input defaultValue=""
          {...register("password")}
          type="password"
          className="form-control"
          id="floatingInput"
          placeholder="Password"
        />
        <label htmlFor="floatingInput">Password</label>
      </div>
      {/* errors will return when field validation fails  */}
      {errors.password && <span>This field is required</span>}
      
      <div className="form-floating mt-5 mb-2 register-btn">
      <input className="d-flex w-100 justify-content-center py-3" type="submit" value="Sign up" />
      <div className="mt-2 h6">By signing up, you agree to our Terms of Use and Privacy Policy.</div>

      </div>
      <div className="login">
      Already have an account? 
      <NavLink to="/signin" className="text-decoration-none">
                <span className=""> Login</span>
              </NavLink>
      </div>

      </div>
    </form>
  );
}