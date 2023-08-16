import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const VoterList = ({ isConnected, voterListFormInput, setvoterListFormInput, voterData, getVoterData }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isConnected) {
            navigate("/");
        }
    }, [isConnected, navigate]);

    return (
        <div>
            <div className='relative '>
                <div className=' absolute ml-2 mt-5 flex'>
                    <NavLink to='/voter'
                        className='py-2 px-4 text-3xl font-VT323 font-bold'
                        style={({ isActive }) => { return isActive ? { color: "#F6896E" } : { color: "white" } }}
                    >Create Voter</NavLink>
                    <div className='font-VT323 font-bold text-blackpink-color py-2 px-4 text-3xl '>/</div>
                    <NavLink to='/voterList' className='py-2 px-4 text-3xl font-VT323 font-bold'
                        style={({ isActive }) => { return isActive ? { color: "#F6896E" } : { color: "white" } }}
                    >Voter List</NavLink>
                </div>
                <div>
                    <div className='absolute inset-0 -z-10 bg-homepage min-h-screen bg-cover bg-no-repeat bg-center'></div>
                </div>
                <div>
                    <div className=''>
                        <label className=' text-2xl text-blue-300 absolute mt-[105px] ml-[20px] text-right font-Handlee font-semibold'>
                            PLs Input Election ID To Check Voters
                        </label>
                        <input className='absolute mt-[100px] ml-[460px] py-1 px-2 focus:border-c21 leading-tight border-4 rounded border-gray-200 focus:outline-none '
                            placeholder="Election ID"
                            onChange={(e) => setvoterListFormInput({ ...voterListFormInput, checkvoterListUsingId: e.target.value })} />
                        <button className=' absolute mt-[95px] ml-[690px] container w-[150px] h-[40px] text-2xl  bg-transparent font-VT323 text-blue-300 font-bold hover:text-white border border-blue-300 hover:transparent hover:border-white rounded'
                            onClick={() => getVoterData(voterListFormInput)}>
                            Check
                        </button>
                        <div>
                        <table className=' absolute w-auto text-white mt-[180px] -ml-1'>
                            <thead>
                                <tr>
                                    <th className='text-3xl font-bold font-Lobster text-c21 px-6 py-3'>Voter Code</th>
                                    <th className='text-3xl font-bold font-Lobster text-c21 px-6 py-3'>Voter Name</th>
                                    <th className='text-3xl font-bold font-Lobster text-c21 px-6 py-3'>Voter Address</th>
                                    <th className='text-3xl font-bold font-Lobster text-c21 px-6 py-3'>Got Vote?</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {voterData.map((voter) => (
                                    <tr key={voter.voterID}>
                                        <td className='text-2xl font-Noticia px-8 py-3'>{voter.voterID}</td>
                                        <td className='text-2xl font-Noticia px-8 py-3'>{voter.voterName}</td>
                                        <td className='text-2xl font-Noticia px-8 py-3'>{voter.voterAddress}</td>
                                        <td className='text-2xl font-Noticia px-8 py-3'>{voter.gotVote}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoterList