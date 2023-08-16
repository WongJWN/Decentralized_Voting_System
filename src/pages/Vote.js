import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Vote = ({ isConnected,voteCandiate,voteFormInput,setvoteFormInput }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isConnected) {
            navigate("/");
        }
    }, [isConnected, navigate]);

    return (
        <div>
            <div>
                <div className='absolute flex inset-0 -z-10 bg-homepage min-h-screen bg-cover bg-no-repeat bg-center'>
                    <div className='absolute flex items-center bg-cVote h-[550px] bg-no-repeat p-52 ml-[935px] mt-[150px]'></div>
                    <div className=' bg-orange-200/30 items-center h-[550px] ml-[260px] mt-[150px]'>
                        <div className='flex'>
                            <div>
                                <h1 className=' font-VT323 px-20 py-10 pt-30 mt-9 text-center text-6xl text-white font-extrabold '>~VOTE~</h1>
                                <div className=''>
                                    <div className='md:flex px-20 items-center py-5'>
                                        <label className='block text-white text-2xl w-[300px] font-bold md:text-right mb-1 md:mb-0 pr-4' >
                                            Election ID
                                        </label>
                                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blackpink-color" type="text"
                                            placeholder="Election ID"
                                        onChange={(e) => setvoteFormInput({ ...voteFormInput, voteelectionid: e.target.value })}/>
                                    </div>
                                </div>
                                <div className='md:flex px-20 items-center py-5'>
                                    <label className='block text-white text-2xl w-[300px] font-bold md:text-right   mb-1 md:mb-0 pr-4' >
                                        Candidate Code
                                    </label>
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blackpink-color" type="text"
                                        placeholder="Candidate Code"
                                    onChange={(e) => setvoteFormInput({ ...voteFormInput, voteaddress: e.target.value })}/>
                                </div>
                                <div className='md:flex px-20 items-center py-5'>
                                    <label className='block text-white text-2xl w-[300px] font-bold md:text-right   mb-1 md:mb-0 pr-4' >
                                        Voter Code
                                    </label>
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blackpink-color" type="text"
                                        placeholder="Voter Code"
                                    onChange={(e) => setvoteFormInput({ ...voteFormInput, voteeID: e.target.value })}/>
                                </div>
                                <div className=' py-5 text-right mr-20'>
                                    <button className='container w-60 text-2xl py-2 px-2 bg-transparent font-VT323 text-c2 font-bold hover:text-white border border-c2 hover:transparent hover:border-white rounded'
                                    onClick={() => voteCandiate(voteFormInput)}>
                                        VOTE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vote