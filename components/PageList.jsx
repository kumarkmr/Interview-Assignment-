import Link from 'next/link';
import { useRouter } from 'next/router'
import React from 'react'
import data from '../assets/data.json'

const PageList = () => {
    const router = useRouter();
    const { page } = router.query;
    return (
        <>
            <div className='page-numbers'>
                <Link href="/1" className={`${page == '1' ? 'active' : ''}`}>1</Link>
                <Link href="/2" className={`${page == '2' ? 'active' : ''}`}>2</Link>
                <Link href="/3" className={`${page == '3' ? 'active' : ''}`}>3</Link>
            </div>
        </>
    )
}

export default PageList