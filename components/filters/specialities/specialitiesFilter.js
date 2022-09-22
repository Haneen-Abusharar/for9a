import React from 'react'
import { useFormik } from 'formik'

const SpecialitiesFilter = () => {
    const filter = useFormik({
        initialValues: {
            specialityCategory: "",
            skills: "",
            cost: "",
            need: "",
            search: ""
        }
    })
    return (
        <form>
            <div className='container mt-6 flex justify-between'>
                <select
                    className='border-2 outline-0 appearance-none text-base p-2 rounded-md'
                    id='specialityCategory'
                    name='specialityCategory'
                    type="text"
                    placeholder='فئة التخصص'
                    onChange={filter.handleChange}
                    value={filter.values.specialityCategory}
                >
                    <option value="" label="فئة التخصص" />

                </select>
                <select
                    className='border-2 outline-0 appearance-none text-base p-2 rounded-md'
                    id='skills'
                    name='skills'
                    type="text"
                    placeholder='المهارات'
                    onChange={filter.handleChange}
                    value={filter.values.skills}
                >
                    <option value="" label="المهارات" />

                </select>
                <select
                    className='border-2 outline-0 appearance-none text-base p-2 rounded-md'
                    id='cost'
                    name='cost'
                    type="text"
                    placeholder='تكاليف الدراسة'
                    onChange={filter.handleChange}
                    value={filter.values.cost}
                >
                    <option value="" label="تكاليف الدراسة" />

                </select>
                <select
                    className='border-2 outline-0 appearance-none text-base p-2 rounded-md'
                    id='need'
                    name='need'
                    type="text"
                    placeholder='حاجة السوق'
                    onChange={filter.handleChange}
                    value={filter.values.need}
                >
                    <option value="" label="حاجة السوق" />

                </select>
                <input
                    className='border-2 outline-0 text-base p-2 pl-6
                     rounded-md bg-[url("https://img.icons8.com/windows/32/000000/search--v1.png")]
                      bg-no-repeat bg-left'
                    id='search'
                    name='search'
                    type="text"
                    autoComplete="off"
                    placeholder='البحث بواسطة كلمة دالة'
                    onChange={filter.handleChange}
                    value={filter.values.search}
                />
            </div>
        </form>
    )
}

export default SpecialitiesFilter