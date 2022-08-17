import React, { Fragment, useState } from 'react'
import UserDisplay from './User_Display';
import arrow1 from '../assets/arrw1.png';
import arrow2 from '../assets/arrw2.png';


function Users
    () {

    const UsersInfo = [
        {
            id: 1,
            name: 'Jason Crejza',
            username: 'Danny_123',
            Gender: 'Male',
            email: '123@gmail.com',
            img: '1',

        },
        {
            id: 2,
            name: 'Emily Watson',
            username: 'Danny_123',
            Gender: 'Male',
            email: '123@gmail.com',
            img: '5',

        },
        {
            id: 3,
            name: 'Sarah Taylor',
            username: 'Danny_123',
            Gender: 'Male',
            email: '123@gmail.com',
            img: '6',


        },
        {
            id: 4,
            name: 'Jeff Kim ',
            username: 'Danny_123',
            Gender: 'Male',
            email: '123@gmail.com',
            img: '2',


        },
    ]


    const [dis, setdis] = useState(true)
    const [Ids, setids] = useState()

    const handleclick = (Id) => {

        setdis(!dis)
        setids(Id)

    }

    return (
        <Fragment>

            <div className='font-Poppins'>
                <label className="flex p-8 text-3xl font-semibold">
                    Users
                </label>
                <hr />
                {!dis ?
                    <UserDisplay parent={Ids} /> :
                        <div className= {!dis ? 'hidden' : 'm-5 bg-white'}>
                            
                            <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                                <table class="w-full text-sm text-left text-gray">
                                    
                                    <thead class="text-xs text-gray-700 uppercase pb-6 bg-colornav">
                                        <tr>
                                            <th scope="col" class="py-3 px-6">

                                            </th>
                                            <th scope="col" class="py-3 px-6">
                                                Name
                                            </th>
                                            <th scope="col" class="py-3 px-6">
                                                Email
                                            </th>
                                            <th scope="col" class="py-3 px-6">
                                                Username
                                            </th>
                                            <th scope="col" class="py-3 px-6">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* T body  */}

                                    {
                                        UsersInfo.map((val, id) => {

                                            const b = val.img
                                            return <UserDisplay
                                                id={val.id}
                                                name={val.name}
                                                email={val.email}

                                                username={val.username}
                                                img={require('./profile/users/img' + b + '.png')}
                                                click={handleclick}
                                            />
                                        })
                                    }

                                </table>
                                <hr></hr>

                                <div className='flex my-4'>
                                    <div className='flex justify-end w-[90%] text-[#9FA2B4] space-x-40'>
                                        <label>Rows per page 8</label>
                                        <label >1-8 of 1240</label>

                                    </div>
                                    <img src={arrow1} alt='' className='  ' />
                                    <img src={arrow2} alt='' className='  ' />
                                </div>

                            </div>

                        </div>


                }





            </div>



        </Fragment>

    )
}

export default Users