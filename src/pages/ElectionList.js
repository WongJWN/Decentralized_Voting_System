import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const ElectionList = ({ isConnected, getElectionData, electionData }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isConnected) {
            navigate("/");
        }else{
            getElectionData();
            console.log(electionData);
        }
    }, [isConnected, navigate]);


    return (
        <div>
            <div className='relative '>
                <div className=' absolute ml-2 mt-5 flex'>
                    <NavLink to='/el'
                        className='py-2 px-4 text-3xl font-VT323 font-bold'
                        style={({ isActive }) => { return isActive ? { color: "pink" } : { color: "white" } }}
                    >Create Election</NavLink>
                    <div className='font-VT323 font-bold text-blackpink-color py-2 px-4 text-3xl '>/</div>
                    <NavLink to='/elList' className='py-2 px-4 text-3xl font-VT323 font-bold'
                        style={({ isActive }) => { return isActive ? { color: "pink" } : { color: "white" } }}
                    >Election List</NavLink>
                </div>
                <div>
                    <div className='absolute inset-0 -z-10 bg-homepage min-h-screen bg-cover bg-no-repeat bg-center'></div>
                </div>
                <div>
                    <div className=''>
                        <table className=' absolute w-auto text-white mt-[150px] ml-[350px]'>
                            <thead>
                                <tr>
                                    <th className='text-3xl font-bold font-Lobster text-pink-300 px-6 py-3'>Election ID</th>
                                    <th className='text-3xl font-bold font-Lobster text-pink-300 px-6 py-3'>Election Tiltle</th>
                                    <th className='text-3xl font-bold font-Lobster text-pink-300 px-6 py-3'>Election Description</th>
                                    <th className='text-3xl font-bold font-Lobster text-pink-300 px-6 py-3'>Owner Name</th>
                                </tr>
                            </thead>

                            <tbody className='' >
                                {electionData.map((election) => (
                                    <tr key={election.electionId}>
                                        <td className='text-2xl font-Noticia px-8 py-3 '>{election.electionId}</td>
                                        <td className='text-2xl font-Noticia px-8 py-3'>{election.electionTitle}</td>
                                        <td className='text-2xl font-Noticia px-8 py-3'>{election.electionDescription}</td>
                                        <td className='text-2xl font-Noticia px-8 py-3'>{election.ownerName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElectionList