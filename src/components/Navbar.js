import React, { useState, useEffect } from "react";
import { useContext } from "react";
import UAuth from '@uauth/js';
import {loadStdlib} from '@reach-sh/stdlib';
import { MainAppContext } from "../context/MainAppContext";
import { Link } from "react-router-dom";

const Reach = loadStdlib('ALGO');


const uauth = new UAuth(
  {
    clientID: "d9e7f28b-7d96-4298-8933-e767a91096b0",
    redirectUri: "https://firstunstoppable.vercel.app/",
    scope: "openid wallet"
  }
)

const fmt = (x) => Reach.formatCurrency(x, 4);



const Navbar = () => {
      const [userWallet, setUserWallet] = useState(null);

    //useEffect model
    useEffect(() => {
    // setUserWallet("Login With Unstoppable")
    uauth.user()
    .then((user) => {
      setUserWallet(user.sub)
      // user exists
      console.log("User information:", user);
    })
    .catch((err) => {
      console.log(err)
      // user does not exist
    })
  }, []);

  //login button
  const login = async () => {
    try {
        const authorization = await uauth.loginWithPopup();
        uauth.user()
        .then((user) => {
            setUserWallet(user.sub)
            // user exist
            console.log("User information:", user);
        })
        console.log(authorization)
    } catch (err) {
        console.error(err)
    }
  }

  const logout = async () => {
    try {
        await uauth.logout();
        setUserWallet(null);
    } catch (err) {
        console.error(err);
    }
  }


  const {accountBal} = useContext(MainAppContext);
  const {account} = useContext(MainAppContext);
  const {accountAddr} = useContext(MainAppContext);

  function truncate(string, limit){
    if(string.length <= limit){
      return string;
    }
    return string.slice(0, limit) + "...  ";
  }

  const {connectWallet} = useContext(MainAppContext);
  return (
      <div>
        <div className="w-screen h-[80px] z-10 bg-slate-800 text-white fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
          <div className="flex items-center">
              <h1 className="text-3xl font-bold mr-4 sm:text-4xl"><Link to='/'>NFTXALG</Link>.</h1>
              <ul className="hidden md:flex">
                <li>Home</li>
                <li>About</li>
                <li>Support</li>
                <li><Link to='/common'>DomainSearch</Link></li>

              </ul>
          </div>
          <div className="hidden md:flex pr-4">
            {
            (account == undefined || account == null) 
              ? (
                  <>
                  <button className=" bg-cyan-700 text-white-600 mr-5" onClick={connectWallet}>
                    Connect Wallet 
                  </button>
                  {userWallet ? 
                  <button className=" bg-cyan-700 text-white-600 mr-5" onClick={logout}>
                    {userWallet} 
                  </button> : 
                  <button className=" bg-cyan-700 text-white-600 mr-5" onClick={login}>
                    Unstoppable Domain 
                  </button>
                  }
                  
                  </>
                ) 
              : (
                <>
                <div><span className=" font-bold"> {truncate(accountAddr, 3)} </span>
                </div>
                <div>
                  <span className=" font-bold">Balance: </span><span>{accountBal}</span><span className=" font-bold"> ALGO</span>
                </div>

                </>
                
              )
            }
              {/* <div className="md:hidden" >
                  {!nav ? <MenuIcon className="w-5"/> : <XIcon className="w-5"/> }
                <MenuIcon className="w-5"/>
              </div>
               */}
          </div>
      </div>
      
    {/* <ul className="absolute bg-zinc-200 v-full px-8">
        <li className=" border-b-2 border-zinc-300 w-full">Home</li>
        <li className=" border-b-2 border-zinc-300 w-full">About</li>
        <li className=" border-b-2 border-zinc-300 w-full">Support</li>
        <li className=" border-b-2 border-zinc-300 w-full">Platforms</li>
        <div className="flex flex-col my-4">
            <button className="bg-transparent text-indigo-600 px-8 py-3 mb-3" onClick={connectWallet}>
              Connect Wallet
            </button>
        </div>
    </ul> */}

    </div>


      </div>
      
  );
};

export default Navbar;
