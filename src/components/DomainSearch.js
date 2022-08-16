import React, { useState } from 'react';
import bgImg from "../assets/nftbid-preview.png";
import axios from "axios";


const DomainSearch = () => {
    
  const API_URL = 'https://unstoppabledomains.g.alchemy.com/domains/';
  const API_KEY = 'ZDwwQcFfAdAa-QTOY3zKqEsL5DutDMTk';

  const [ info, setInfo ] = useState(null);
  const [ userDomain, setUserDomain ] = useState();

  const checkOut = (e) => {
    e.preventDefault();

    if(!userDomain) return;

    axios.get(API_URL + userDomain, {
        headers: {
            'Authorization': `bearer ${API_KEY}`
        }
    })
    .then(res => {
        setInfo(res.data);
    })
    .catch(err => {
        setInfo(err);
    });
    setPopUp(!popUp)
  }

  const [popUp, setPopUp] = useState(true);

  console.log(info);

  return (
    <div>
            <div>
      <div className="w-full h-screen bg-slate-800 flex flex-col justify-between text-black">

            {/* popup area */}
        <div className={ `${popUp ? 'popup' : 'popup active'}`} id="popup-1">
        <div className="overlay"></div>
        <div className="content">
          <div className="close-btn" onClick={() => {setPopUp(!popUp);}}>
            &times;
          </div>
          <h1>Hash Phrase</h1>
          {info ? 
          <div>
            <p>DomainName : {info.meta.domain} </p><hr/>
            <p>Owner : {info.meta.owner} </p><hr/>
            <p>Blockchain : {info.meta.blockchain} </p><hr/>
            <p>Sale_Record : {info.records["whois.for_sale.value"] ? 
            "On Sale" : "Not on Sale"}
            </p><hr/>
            <p>Mail : {info.records["whois.email.value"]}</p><hr/>
            <p><strong>Here are the differnts blockchain addresses in the domain profile</strong></p><hr/>
            <div>
              {info.records["crypto.ETH.address"] ? 
              <p>ETH address : {info.records["crypto.ETH.address"]}</p> :
              <p>No ETH address</p>}
            </div><hr/>
            <div>
              {info.records["crypto.MATIC.version.MATIC.address"] ? 
              <p>Matic address : {info.records["crypto.MATIC.version.MATIC.address"]}</p> :
              <p>No matic address</p>}

                <button className="btn" >Send_Crypto</button>

            </div>
          </div> : 
          <p>please wait user is loading....</p>}
          {/* {hashes.length !== 0 ? 
          (<p> {hashes} </p>) : 
          (<p>Loading Please be patient</p>)} */}
          
        </div>
      </div>

        <div className="grid md:grid-cols-2 mx-w-[1240px] m-auto">
          <div>
            {/* <input type='' /> */}
            <img className="w-full" src={bgImg} alt="nft" />
          </div>
          <div className="flex justify-center md:items-center -ful px-2 py-8">
            {/* <div class="flex justify-center mt-10"> */}
                <input 
                    onChange={(e) => {setUserDomain(e.target.value)}}
                    placeholder="Enter Domain name" 
                    class="border-2 transition duration-500 placeholder-white-400 focus:placeholder-transparent border-white-400 w-full py-2 text-center text-white bg-transparent rounded-md focus:outline-none "/>
                <button onClick={checkOut} className="py-2 px-8 my-4 flex bg-cyan-700 text-white font-bold rounded-md " >
                Search
                </button>
            {/* </div> */}
            
            
          </div>
          

          {/* <div className="absolute flex flex-col py-8 md:min-w-[760px] button-[-5%] mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-zinc-200 border-slate-300 rounded-xl text-center shadow-xl">
          <p>Data Services</p>
          <div>
            <p><scaleIcon/>Icon, Create</p>
            <p><scaleIcon/>Icon, Bidder</p>
            <p><scaleIcon/>Icon, Create</p>
            <p><scaleIcon/>Icon, Create</p>
          </div>
        </div> */}
        </div>
      </div>
    </div>
    </div>
  )
}

export default DomainSearch