import React, { useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

const CandidateList = ({ isConnected, candidateListFormInput, setcandidateListFormInput, candidateData, getCandidateData }) => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isConnected) {
            navigate("/");
        } else {
            getCandidateData();
            console.log(candidateData);
        }
    }, [isConnected, navigate]);

    return (
        <div>
            <div className='relative '>
                <div className=' absolute ml-2 mt-5 flex'>
                    <NavLink to='/candidate'
                        className='py-2 px-4 text-3xl font-VT323 font-bold'
                        style={({ isActive }) => { return isActive ? { color: "lightblue" } : { color: "white" } }}
                    >Create Candidate</NavLink>
                    <div className='font-VT323 font-bold text-blackpink-color py-2 px-4 text-3xl '>/</div>
                    <NavLink to='/candidateList' className='py-2 px-4 text-3xl font-VT323 font-bold'
                        style={({ isActive }) => { return isActive ? { color: "lightblue" } : { color: "white" } }}
                    >Candidate List</NavLink>
                </div>
                <div>
                    <div className='absolute inset-0 -z-10 bg-homepage min-h-screen bg-cover bg-no-repeat bg-center'></div>
                </div>
                <div>
                    <div className=''>
                        <label className=' text-2xl text-blue-300 absolute mt-[105px] ml-[20px] text-right font-Handlee font-semibold'>
                            PLs Input Election ID To Check Candidatas
                        </label>
                        <input className='absolute mt-[100px] ml-[460px] py-1 px-2 focus:border-c21 leading-tight border-4 rounded border-gray-200 focus:outline-none '
                            placeholder="Election ID"
                            onChange={(e) => setcandidateListFormInput({ ...candidateListFormInput, checkcandidateListUsingId: e.target.value })} />
                        <button className=' absolute mt-[95px] ml-[690px] container w-[150px] h-[40px] text-2xl  bg-transparent font-VT323 text-blue-300 font-bold hover:text-white border border-blue-300 hover:transparent hover:border-white rounded'
                            onClick={() => getCandidateData(candidateListFormInput)}>
                            Check
                        </button>
                    </div>
                    <div>
                        <table className=' absolute w-auto text-white mt-[180px] -ml-1'>
                            <thead>
                                <tr>
                                    <th className='text-3xl font-bold font-Lobster text-c21 px-6 py-3'>Candidata Code</th>
                                    <th className='text-3xl font-bold font-Lobster text-c21 px-6 py-3'>Candidata Name</th>
                                    <th className='text-3xl font-bold font-Lobster text-c21 px-6 py-3'>Candidata Address</th>
                                    <th className='text-3xl font-bold font-Lobster text-c21 px-6 py-3'>VoteCount</th>
                                </tr>
                            </thead>

                            <tbody className=''>
                                {candidateData.map((candidate) => (
                                    <tr key={candidate.candidateID}>
                                        <td className='text-2xl font-Noticia px-8 py-3'>{candidate.candidateID}</td>
                                        <td className='text-2xl font-Noticia px-8 py-3'>{candidate.candidateName}</td>
                                        <td className='text-2xl font-Noticia px-8 py-3'>{candidate.candidateAddress}</td>
                                        <td className='text-2xl font-Noticia px-8 py-3'>{candidate.voteCount}</td>
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

export default CandidateList