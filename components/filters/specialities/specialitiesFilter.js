import React, { useState } from 'react'
import axios from 'axios';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router';
import { useForm, Controller } from "react-hook-form";
import { arrayToUrl } from '../../utilities/helper';

const SpecialitiesFilter = () => {
    const [showModal, setShowModal] = useState(false);
    const { push } = useRouter()
    const { register, handleSubmit, control } = useForm();
    const { isLoading, error, data } = useQuery(['repoData'], () =>
        axios.get(`${process.env.api}/speciality/list`).then(res => res.data))

    const onSubmit = (data) => {
        const urlData = {};
        if (data.skills && Array.isArray(data.skills)) urlData['skills'] = data.skills.map((skill) => skill.id)
        if (data.cost) urlData['cost'] = data.cost;
        if (data.type) urlData['type'] = data.type;
        if (data.market) urlData['market'] = data.market;
        if (data.term) urlData['term'] = data.term;
        push(`/specialities/s?${arrayToUrl(urlData)}`)
    }

    if (error || isLoading || !data) return (<div className='container w-full h-20' />)

    return (
        <>
            <form className={`container border mb-16 shadow-md rounded-md bg-white flex flex-col md:flex-row
             md:items-center
              ${showModal ? "xs:flex sm:flex overflow-x-hidden overflow-y-auto top-0 h-full fixed z-100 outline-none focus:outline-none"
                    : "sm:hidden xs:hidden md:flex"}`}
                onSubmit={handleSubmit(onSubmit)}>
                {showModal ? <div className='flex items-center justify-between'>
                    <span className='font-bold text-lg'> فلترة</span>
                    <button type="button" onClick={() => setShowModal(false)}
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400
                         hover:text-gray-500hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button> </div>
                    : null}
                <div className={`h-full w-full flex flex-col-reverse md:flex-row xs:justify-around md:justify-between`}>
                    <select
                        className='border-2 md:border-l outline-0 text-base
                     p-1 my-2 w-full rounded-md md:border-none'
                        id='type'
                        type="text"
                        placeholder='فئة التخصص'
                        {...register("type")}
                    >
                        <option label='فئة التخصص' disabled >فئة التخصص</option>
                        {data.category.map((category) =>
                            <option
                                value={category.id}
                                label={category.name}
                                key={category.id} >
                                {category.name}
                            </option>
                        )}
                    </select>
                    <label className='md:hidden -mb-8'>فئة التخصص</label>
                    <Controller
                        name={"skills"}
                        control={control}
                        render={({ field: { value, onChange } }) => {
                            return (
                                <Select
                                    className='MultiSelect text-base border-l  
                                    w-full md:mr-5 my-2 rounded-md border-2 md:border-none'
                                    closeMenuOnSelect={false}
                                    placeholder="المهارات"
                                    isMulti
                                    options={data.skills}
                                    getOptionLabel={option => option.name}
                                    getOptionValue={option => option.id}
                                    onChange={onChange}
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            primary: 'gray',
                                        },
                                    })}
                                />
                            )
                        }}
                    />
                    <label className='md:hidden -mb-8'>المهارات</label>
                    <select
                        className='md:border-l border-2 md:border-none md:outline-0 text-base
                         p-1 my-2 md:mr-5 w-full rounded-md'
                        id='cost'
                        type="text"
                        placeholder='تكاليف الدراسة'
                        {...register("cost")}
                    >
                        <option label="تكاليف الدراسة" disabled>تكاليف الدراسة</option>
                        {data.cost.map((cost) =>
                            <option
                                value={cost.id}
                                label={cost.name}
                                key={cost.id} >
                                {cost.name}
                            </option>
                        )}
                    </select>
                    <label className='md:hidden -mb-8'>تكاليف الدراسة</label>
                    <select
                        className='border-2 md:border-none md:border-l md:outline-0 text-base 
                        p-1 my-2 md:mr-5 w-full rounded-md -webkit-appearance-none'
                        id='need'
                        type="text"
                        placeholder='حاجة السوق'
                        {...register("market")}
                    >
                        <option label="حاجة السوق" disabled>حاجة السوق</option>
                        {data.market.map((market) =>
                            <option
                                value={market.id}
                                label={market.name}
                                key={market.id} >
                                {market.name}
                            </option>
                        )}
                    </select>
                    <label className='md:hidden -mb-8'>حاجة السوق</label>
                    <input
                        className='border-2 md:border-none md:border-l md:outline-0 text-base
                        w-full md:mr-5 p-2 pl-6 my-2 rounded-md'
                        id='term'
                        type="text"
                        autoComplete="off"
                        placeholder='البحث بواسطة كلمة'
                        {...register("term")}
                    />
                    <label className='md:hidden -mb-8'>ابحث</label>
                </div>
                <button type='submit' className={` ${showModal ? "w-full" : "w-1/6"} h-10
                 mb-5 md:mr-5 md:mb-0 rounded-lg bg-orange-400 hover:bg-orange-300 
                 hover:shadow-md transition ease-in-out delay-10 border`} >
                    <svg xmlns="http://www.w3.org/2000/svg" className='inline'
                        width="20px" height="20px" viewBox="0 0 24 24">
                        <path fill="#000000" d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11
                         15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,
                         15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,
                         1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,
                         14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                    </svg>
                    <span className='mr-1'>تطبيق</span>
                </button>
            </form>
            <div className='container flex justify-center'>
                {!showModal ? <button type='button' onClick={() => setShowModal(true)}
                    className=" md:hidden bg-orange-400 rounded-md 
                  py-3 px-8 mb-5 text-base font-medium hover:bg-orange-300">
                    فلترة
                </button> : null}
            </div>
        </>
    )
}

export default SpecialitiesFilter