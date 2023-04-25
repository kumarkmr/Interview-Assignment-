import PageList from '@/components/PageList';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import data from '../../assets/data.json'
import { BiSearch } from "react-icons/bi";
import { MultiSelect } from "react-multi-select-component";

const options = [
    {
        label: 'Name',
        value: 'Name'
    },
    {
        label: 'Position',
        value: 'Position'
    },
    {
        label: 'Office',
        value: 'Office'
    }
]

const index = () => {
    const router = useRouter()
    const { page } = router.query;
    const [currentPage, setCurrentPage] = useState([])
    const [search, setSearch] = useState('')
    const [selectedFilters, setSelectedFilters] = useState(options)
    const [filtersValue, setFiltersValue] = useState([ ])

    useEffect(() => {
        if (!page) return;
        const currentPagePersons = data.slice((page - 1) * 5, page * 5)
        setCurrentPage(currentPagePersons)
    }, [page])

    useEffect(() => {
        setFiltersValue(selectedFilters.map(filter => filter.value))
    }, [selectedFilters])

    useEffect(() => {
        const currentPagePersons = data.slice((page - 1) * 5, page * 5)
        if (!search) setCurrentPage(currentPagePersons)

        let filteredPersons = currentPagePersons.filter(person => {
            return filtersValue.some(filter => {
                return person[filter].includes(search)
            })
        })
        setCurrentPage(filteredPersons)
    }, [search])
    console.log()

    const onSearch = (event) => {
        setSearch(event.target.value)
    }
    return (
        <>
            <div className="">
                <div className='search' >
                        <input onChange={onSearch} className='search-input' type="text" placeholder='Search' />
                        <button className='search-button' type='submit'><BiSearch /></button>
                    <div style={{ margin: '60px' }}>
                        <MultiSelect
                            options={options}
                            value={selectedFilters}
                            onChange={setSelectedFilters}
                            labelledBy="Select"
                        />
                    </div>

                </div>
            </div>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Office</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPage?.map((person, personIndex) => {
                            return (
                                <tr>
                                    <td>{person.Name}</td>
                                    <td>{person.Position}</td>
                                    <td>{person.Office}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <PageList />
            </div>
        </>
    )
}

export default index