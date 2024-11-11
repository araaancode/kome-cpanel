import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification, setPageTitle } from "../features/common/headerSlice"
import TitleCard from "../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../utils/dummyData"
import axios from "axios"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import { RiUser3Line } from "@remixicon/react"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import SearchBar from "../components/Input/SearchBar"
const MomentJalali = require("moment-jalaali")


const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {

    const [filterParam, setFilterParam] = useState("")
    const [searchText, setSearchText] = useState("")
    const locationFilters = ["تبریز", "اصفهان", "قم", "مشهد", "زاهدان"]

    const showFiltersAndApply = (params) => {
        applyFilter(params)
        setFilterParam(params)
    }

    const removeAppliedFilter = () => {
        removeFilter()
        setFilterParam("")
        setSearchText("")
    }

    useEffect(() => {
        if (searchText == "") {
            removeAppliedFilter()
        } else {
            applySearch(searchText)
        }
    }, [searchText])

    return (
        <div className="inline-block float-right flex">

        </div>
    )
}


function Orders() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "لیست سفارش ها" }))
    }, [])

    const [trans, setTrans] = useState(RECENT_TRANSACTIONS)

    const [orders, setOrders] = useState([])

    const removeFilter = () => {
        setTrans(RECENT_TRANSACTIONS)
    }

    const applyFilter = (params) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.location == params })
        setTrans(filteredTransactions)
    }

    // Search according to name
    const applySearch = (value) => {
        let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase()) })
        setTrans(filteredTransactions)
    }


    useEffect(() => {
        let token = localStorage.getItem("userToken")

        axios.get(`/api/cooks/me`,  {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            },
        }).then((res)=>{
            console.log(res);
           
        }).catch((err)=>{
            console.log(err);
        })

    }, [])


    return (
        <>

            <TitleCard title="لیست سفارش ها" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter} />}>

                {/* Team Member list in table format loaded constant */}
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>شناسه سفارش</th>
                                <th>نام مشتری</th>
                                <th>نام غذا</th>
                                <th>تعداد</th>
                                <th>وضعیت سفارش</th>
                                <th>تاریخ سفارش</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                trans.map((l, k) => {
                                    return (
                                        <tr key={k}>
                                            <td>
                                                <div className="flex items-center space-x-3">
                                                    <RiUser3Line />
                                                    <div>
                                                        <div className="font-bold mr-2">{l.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{l.id}</td>
                                            <td>{l.email}</td>
                                            <td>{l.location}</td>
                                            <td>{l.amount}</td>
                                            <td>{new Date().toLocaleString("fa")}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </TitleCard>
        </>
    )
}


export default Orders