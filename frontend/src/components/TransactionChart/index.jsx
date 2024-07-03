import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserContext } from "../../context/User";
import { AccountContext } from "../../context/Account";
import axios from "axios";
import baseUrl from "../../config/BaseUrl";
import styles from './TransactionChart.module.css';
import styles2 from '../DeviceHome/DeviceHome.module.css'
import { getMonthName } from "../../config/dateFormat";
import { CiInboxIn, CiInboxOut } from "react-icons/ci";

export default function BarChart({ setMonthOrYear, monthOrYear }) {
    const { token } = useContext(UserContext);
    const { choosenAccount } = useContext(AccountContext)
    const [monthAmount] = useState([0, 0])
    const [yearAmount] = useState([0, 0])
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "income",
                backgroundColor: `#008773`,
                data: [],
            }, {
                label: "expanse",
                backgroundColor: `#f4cc76`,
                data: [],
            }
        ],
    });

    const fetchIncomes = async (idAccount, token) => {
        try {
            const res = await axios.get(`${baseUrl}/incomes?idAccount=${idAccount}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const incomes = res.data.incomes;

            if (incomes.length > 0) {
                const lastMonthItem = incomes[incomes.length - 1];
                if (lastMonthItem.month === currentMonth) {
                    monthAmount[0] = lastMonthItem.amount;
                }

                let lastYearArray = res.data.incomes
                let count = 0
                for (let i = lastYearArray.length - 1; i >= 0 && count < 2; i--) {
                    yearAmount[0] += lastYearArray[i].amount;
                    if (lastYearArray[i].month === currentMonth) {
                        count++;
                    }
                }
            }

            const monthes = res.data.incomes.map(element => {
                return element.month
            })

            const amountArray = res.data.incomes.map(element => {
                return element.amount
            })

            const chartData = { month: [monthes], amount: [amountArray] }
            return chartData;
        } catch (err) {
            console.log(err);
            return 0;
        }
    };

    const fetchExpenses = async (idAccount, token) => {
        try {
            const res = await axios.get(`${baseUrl}/expanses?idAccount=${idAccount}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const expanses = res.data.expanses;

            if (expanses.length > 0) {
                const lastMonthItem = res.data.expanses[res.data.expanses.length - 1]
                if (lastMonthItem.month === currentMonth) {
                    monthAmount[1] = lastMonthItem.amount;
                }
                let lastYearArray = res.data.expanses
                let count = 0
                for (let i = lastYearArray.length - 1; i >= 0 && count < 2; i--) {
                    yearAmount[1] += lastYearArray[i].amount;
                    if (lastYearArray[i].month === currentMonth) {
                        count++;
                    }
                }
            }

            const monthes = res.data.expanses.map(element => {
                return element.month
            })

            const amountArray = res.data.expanses.map(element => {
                return element.amount
            })

            const chartData = { month: [monthes], amount: [amountArray] }
            return chartData;
        } catch (err) {
            console.log(err);
            return 0;
        }
    };
    const fetchData = async () => {
        try {
            if (!choosenAccount || !choosenAccount._id) {
                return;
            }
            const idAccount = choosenAccount._id;

            const incomeAmount = await fetchIncomes(idAccount, token);
            const expenseAmount = await fetchExpenses(idAccount, token);

            const Expanses = expenseAmount.amount
            const Incomes = incomeAmount.amount

            const monthArray = expenseAmount.month[0].map(element => {
                return getMonthName(element)
            })
            setChartData({
                labels: monthArray,
                datasets: [
                    {
                        label: "income",
                        backgroundColor: `#008773`,
                        data: Incomes[0]
                    }, {
                        label: "expanse",
                        backgroundColor: `#f4cc76`,
                        data: Expanses[0],
                    }
                ],
            });
        } catch (err) {
            console.log(err);
            setChartData({
                ...chartData,
                datasets: [
                    {
                        ...chartData.datasets[0],
                        data: [incomeAmount, 0],
                    },
                ],
            });
        }
    };

    useEffect(() => {
        fetchData();

    }, [token, choosenAccount]);

    return (
        <>
            <div className={styles.container}>
                <Bar data={chartData} />
            </div>
            <div className={`${styles2.smallContainer} ${styles2.summaryTransaction}`}>
                <div className={styles2.summary}>
                    <CiInboxIn className={styles2.cilnbox} />
                    <div>
                        <h5 className={styles2.h5}>Income</h5>
                        <h2 className={styles2.howMuchIn}>{monthOrYear ? monthAmount[0] : yearAmount[0]}</h2>
                    </div>
                </div>
                <div className={styles2.summary}>
                    <CiInboxOut className={`${styles2.cilnbox} ${styles2.cilnboxOut}`} />
                    <div>
                        <h5 className={styles2.h5}>Expanses</h5>
                        <h2 className={styles2.howMuchEx}>{monthOrYear ? monthAmount[1] : yearAmount[1]}</h2>
                    </div>
                </div>
                <div className={styles.toggleTime}>
                    <p onClick={() => setMonthOrYear(true)} className={`${styles.lastMonth} ${monthOrYear ? styles.lastMonthActive : ''}`}>Last Month</p>
                    <p onClick={() => setMonthOrYear(false)} className={`${styles.lastYear} ${!monthOrYear ? styles.lastYearActive : ''}`}>Last Year</p>
                </div>
            </div>
        </>
    )
}

