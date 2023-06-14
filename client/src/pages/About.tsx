import React from 'react'
// import Header from '../components/Header'
import cart from '../cart.svg'

function About() {
  return (
    <div>
      {/* <Header/> */}
        <div className=" border mx-auto py-2 d-flex justify-content-center">
          <div className="w-md-80 d-flex justify-content-center mt-md-3 mt-md-2 mt-3 border border-danger w-50 ">
            login card
            <div className='login section'>
            <div className="text-center my-1 w-md-80 w-100">
                <button
                  type="button"
                  className="w-100 d-flex flex-row justify-content-around text-center align-items-center p-2 bg-white font-weight-medium shadow-sm border-0 rounded hover:bg-[#FAFBFC]" style={{color:"#42526E"}}
                >
                  {/* <Image width={18} height={18} src="/microsoft-logo.svg" className="" alt="Microsoft-Image" /> */}
        <img className="logoudemy" src={cart} width={31} />
                  Continue with Microsoft
                </button>
              </div>

              <div className="text-center my-1 w-md-80 w-100">
                <button
                  type="button"
                  className="w-100 d-flex flex-row justify-content-around text-center align-items-center p-2 bg-white font-weight-medium shadow-sm border-0 rounded hover:bg-[#FAFBFC]" style={{color:"#42526E"}}
                >
                  {/* <Image width={18} height={18} src="/microsoft-logo.svg" className="" alt="Microsoft-Image" /> */}
        <img className="logoudemy" src={cart} width={31} />
                  Continue with Microsoft
                </button>
              </div>
            </div>
            </div>
          </div>
    </div>
  )
}

export default About