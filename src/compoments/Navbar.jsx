import React from 'react';
import { ethers } from 'ethers';
import { NavLink, Outlet } from 'react-router-dom';
import Logo from "../styles/Logo_title.png";
import NavLinks from './NavLinks';

const Navbar = ({ isConnected, setIsConnected, setAccount, account }) => {
  const connectToMetamask = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Metamask is not detected in the browser")
    }
  };

  return (
    <nav>
      <nav>
        <div className='flex items-center font-medium justify-between px-4 py-4 bg-navbg h-20'>
          <div>
            <div>
              <img src={Logo} alt="Logo" />
            </div>
          </div>
          <div>
            {isConnected ? (
              <div className='flex'>
                <div className='flex'>
                  <ul className='flex uppercase items-center gap-8 font-Codystar'>
                    <li>
                      <NavLink to="/" className='inline-block mr-5 text-blackpink-color font-bold text-2xl'>
                        HOME
                      </NavLink>
                    </li>
                    <NavLinks />
                  </ul>
                  <p className="flex ml-5 px-6 items-center gap-8 font-Codystar text-blackpink-color text-2xl font-bold ">
                    ID:{account.length > 10 ? `${account.slice(0, 10)}...` : account}
                  </p>
                </div>
              </div>
            ) : (
              <button className='container w-60 h-10 text-xl bg-transparent font-Codystar hover:bg-blackpink-color text-blackpink-color font-bold hover:text-black border border-blackpink-color hover:border-transparent rounded'
                onClick={connectToMetamask}>Login MetaMask</button>
            )}
          </div>
        </div>
        <Outlet context={isConnected} />
      </nav>
    </nav>
  );
};

export default Navbar;
