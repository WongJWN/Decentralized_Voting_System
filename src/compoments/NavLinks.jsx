import React from 'react';
import { NavLink } from "react-router-dom";
import { links } from './MyLinks';

const NavLinks = () => {

    return (
        <>
            {links.map((Link) => (
                <div key={Link.id}>
                    <div className='px-3 text-left md:cursor-pointer group'>
                        <NavLink to={Link.link} className='py-7 text-2xl text-blackpink-color font-bold'>{Link.name}</NavLink>
                    </div>
                </div>
            ))}
        </>

    )
}

export default NavLinks