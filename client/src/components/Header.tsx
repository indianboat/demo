import React, { useEffect, useState } from 'react'
import {NavLink, Navigate,useNavigate} from 'react-router-dom';
import logoUdemy from '../logo-udemy.svg'
import cart from '../cart.svg';
import {Cookies, useCookies} from 'react-cookie';
// import Cookies2 from 'js-cookie';
import language from '../language.svg';
import jwt from 'jwt-decode'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {updateuser} from '../redux/slices/userdata';
function Header() {
  interface JwtToken {
    email: string,
    iat?: number,
    id?: string,
    name: string
  }

  const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);
  const navigate = useNavigate();
  // const [session,setSession] = useState<JwtToken>(cookies.jwt_token?jwt(cookies.jwt_token):{name:'',email:''});
  // const cook :string |undefined = ;
  // console.log('jscookie bhai2',session)
  const currUser = useAppSelector((state)=>state.user);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(updateuser((cookies && cookies.jwt_token && jwt(cookies.jwt_token))?jwt(cookies.jwt_token):''));
  },[])

  // console.log('redux state:',currUser);
  // console.log('hi token',jwt(cookies.jwt_token));
          if(cookies.jwt_token){
            // let dataname : Cookies = jwt(cookies.jwt_token)
            // setSession(jwt(cookies.jwt_token));
          // const kk = jwt.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ODJlZWIxZTdiNzYxYzMwMDY4ZTNlOSIsImVtYWlsIjoiZ292aW5kQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGFocnVraCIsImlhdCI6MTY4NjMwNDk3MX0.duwFpfBKoovhgzBl3JHgzgEREfQ349smWPlV9Dn9drI');
          // console.log('hi session',jwt(cookies.jwt_token));
          }
  return (
    <>
      <div className="p-3 header-section d-flex justify-content-between align-items-center shadow">
        <img className="logoudemy" src={logoUdemy} width={91} />

        <div className="categories-link">
          <span>Catogories</span>
        </div>

        <div className="search-link">
          <input
            type="text"
            className="m-0"
            placeholder="Search for anything"
          />
        </div>

        <div className="business-link">
          <span>Udemy Businesses</span>
        </div>

        <div className="teachon-link">
          <span>Teach on Udemy</span>
        </div>

        <div className="cart-link">
          <img className="logoudemy" src={cart} width={28} />
        </div>
        {/* {!cookies.jwt_token ? ( */}
        {currUser.cuser ? (
          <>
            {currUser.cuser}
            <button onClick={()=>{removeCookie('jwt_token');
            window.location.reload();
            navigate('/signin');
            }} className="signup-link border border-dark bg-dark text-white px-3 py-2 mx-1">
                <span className="fw-bold">Log out</span>
              </button>
            {/* govind  */}
          </>
        ) : (
          <>
            <div className="btn-links d-flex">
              <NavLink to="/signin" className="text-decoration-none text-black">
                <div onClick={()=>dispatch(updateuser((cookies && cookies.jwt_token && jwt(cookies.jwt_token))?jwt(cookies.jwt_token):''))} className="login-link border border-dark px-3 py-2 mx-1">
                  <span className="fw-bold">Log in</span>
                </div>
              </NavLink>

              <NavLink to="/signup" className="text-decoration-none">
              <div className="signup-link border border-dark bg-dark text-white px-3 py-2 mx-1">
                <span className="fw-bold">Sign up</span>
              </div>
              </NavLink>

              <div className="language-link border border-dark p-2 mx-1">
                <img className="logoudemy p-0 m-0" src={language} width={20} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Header