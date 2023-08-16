import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const CreateVoter = ({ isConnected, createVoter, voterFormInput, setvoterFormInput }) => {
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
                    <div className='absolute flex inset-0 -z-10 bg-homepage min-h-screen bg-cover bg-no-repeat bg-center'>
                        <div className='absolute flex items-center bg-cV h-[550px] bg-no-repeat p-52 ml-[260px] mt-[100px]'></div>
                        <div className=' bg-red-400/30 items-center h-[550px] ml-[602px] mt-[100px]'>
                            <div className='flex'>
                                <div>
                                    <h1 className=' font-VT323 px-20 py-10 pt-30 mt-9 text-center text-6xl text-white font-extrabold '>Create Voter</h1>
                                    <div className=''>
                                        <div className='md:flex px-20 items-center py-5'>
                                            <label className='block -ml-[40px]  text-white text-2xl w-[300px] font-bold md:text-right mb-1 md:mb-0 pr-4' >
                                                Election ID
                                            </label>
                                            <input className="bg-gray-200 appearance-none ml-[40px] border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blackpink-color" type="text"
                                                placeholder="Election ID"
                                            onChange={(e) => setvoterFormInput({ ...voterFormInput, velectionid: e.target.value })}/>
                                        </div>
                                    </div>
                                    <div className='md:flex px-20 items-center py-5'>
                                        <label className='block text-white text-2xl w-[300px] font-bold md:text-right -ml-[30px] mr-[30px] mb-1 md:mb-0 pr-4' >
                                            Voter Name
                                        </label>
                                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blackpink-color" type="text"
                                            placeholder="Voter Name"
                                        onChange={(e) => setvoterFormInput({ ...voterFormInput, vname: e.target.value })}/>
                                    </div>
                                    <div className='md:flex px-20 items-center py-5'>
                                        <label className='block text-white text-2xl w-[300px] font-bold md:text-right -ml-2 mr-2 mb-1 md:mb-0 pr-4' >
                                            Voter Address
                                        </label>
                                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blackpink-color" type="text"
                                            placeholder="Voter Address"
                                        onChange={(e) => setvoterFormInput({ ...voterFormInput, vaddress: e.target.value })}/>
                                    </div>
                                    <div className=' py-5 text-right mr-20'>
                                        <button className='container w-60 text-2xl py-2 px-2 bg-transparent font-VT323 text-red-200 font-bold hover:text-white border border-red-200 hover:transparent hover:border-white rounded'
                                        onClick={() => createVoter(voterFormInput)}>
                                            Create Voter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateVoter