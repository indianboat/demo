import { useForm, SubmitHandler } from "react-hook-form";
import {useNavigate,NavLink} from "react-router-dom";
// import {useCookies} from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {updateuser} from '../redux/slices/userdata';

import {Cookies, useCookies} from 'react-cookie';
import jwt from 'jwt-decode'


type Inputs = {
  email: string,
  password: string,
};

export default function Signin() {
  // const [cookies, setCookie, removeCookie] = useCookies();
  const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);
    let navigate = useNavigate();
  const currUser = useAppSelector((state)=>state.user);

  const dispatch = useAppDispatch();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> =async (data) => {
    // const {name,email,password} = data;
    console.log(data);
    try {
        const res = await fetch('/signin',{
            method:'POST',
            headers:{
                "Content-Type":'application/json',
            },
            body:JSON.stringify(data)
        })
        const result = await res.json();

        console.log(result);
        

        if(result.authenticated===false){
            alert('invalid credentials!');
        }
        else if(result.authenticated===true){
            setCookie("jwt_token",result.token);
            alert('login success!');
            dispatch(updateuser((cookies && cookies.jwt_token && jwt(cookies.jwt_token))?jwt(cookies.jwt_token):''))
            console.log('after sign in  dispatch ',cookies && cookies.jwt_token && jwt(cookies.jwt_token)?jwt(cookies.jwt_token):'not value till yet')
            navigate('/');
            window.location.reload();
            // console.log('signin')
        }
        // console.log('submitted data:',result)
        
    } catch (error) {
        console.log('error,not fetched!',error);
    }
    
  }

//   console.log(watch("example")) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div className="container w-25 mt-3">
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <input defaultValue="" {...register("name")} placeholder="full name" /> */}
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
      
      {/* <input type="submit" /> */}
      <div className="form-floating mt-5 mb-2 register-btn">
      <input className="d-flex w-100 justify-content-center py-3" type="submit" value="Log in" />
      {/* <div className="mt-2 h6">By signing up, you agree to our Terms of Use and Privacy Policy.</div> */}

      </div>
      <div className="signup">
      Dont have an account? 
      <NavLink to="/signup" className="text-decoration-none">
                <span className=""> Sign up</span>
              </NavLink>
      </div>
    </form>
    </div>
  );
}