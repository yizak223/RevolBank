import React, { useContext, useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserContext } from "../../context/User";
import { AccountContext } from "../../context/Account";
import axios from "axios";
import baseUrl from "../../config/BaseUrl";
import styles from './TransactionChart.module.css';
import styles2 from '../DeviceHome/DeviceHome.module.css';
import { getMonthName } from "../../config/dateFormat";
import { CiInboxIn, CiInboxOut } from "react-icons/ci";

export default function BarChart({ setMonthOrYear, monthOrYear }) {
    const { token } = useContext(UserContext);
    const { choosenAccount } = useContext(AccountContext);

    const [monthAmount, setMonthAmount] = useState([0, 0]);
    const [yearAmount, setYearAmount] = useState([0, 0]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Income",
                backgroundColor: "#008773",
                data: [],
            },
            {
                label: "Expense",
                backgroundColor: "#f4cc76",
                data: [],
            }
        ],
    });

    const fetchData = useCallback(async () => {
        if (!choosenAccount || !choosenAccount._id) return;

        const idAccount = choosenAccount._id;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;

        const processTransactions = (data, isIncome) => {
            let monthTotal = 0;
            let yearTotal = 0;
            const monthNames = [];
            const amounts = [];

            data.forEach(item => {
                if (item.month === currentMonth) {
                    monthTotal += item.amount;
                }
                yearTotal += item.amount;
                monthNames.push(getMonthName(item.month));
                amounts.push(item.amount);
            });

            if (isIncome) {
                setMonthAmount(prev => [monthTotal, prev[1]]);
                setYearAmount(prev => [yearTotal, prev[1]]);
            } else {
                setMonthAmount(prev => [prev[0], monthTotal]);
                setYearAmount(prev => [prev[0], yearTotal]);
            }

            return { monthNames, amounts };
        };

        try {
            const incomeResponse = await axios.get(`${baseUrl}/incomes?idAccount=${idAccount}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const expenseResponse = await axios.get(`${baseUrl}/expanses?idAccount=${idAccount}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const incomeData = processTransactions(incomeResponse.data.incomes, true);
            const expenseData = processTransactions(expenseResponse.data.expanses, false);

            setChartData({
                labels: incomeData.monthNames,
                datasets: [
                    {
                        label: "Income",
                        backgroundColor: "#008773",
                        data: incomeData.amounts,
                    },
                    {
                        label: "Expense",
                        backgroundColor: "#f4cc76",
                        data: expenseData.amounts,
                    },
                ],
            });
        } catch (err) {
            console.error("There was a problem with the fetch operation:", err);
        }
    }, [choosenAccount, token]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <div className={styles.container}>
                <Bar data={chartData} />
            </div>
            <div className={`${styles2.smallContainer} ${styles2.summaryTransaction}`}>
                <div className={`${styles2.summary} ${styles.containerincome}`}>
                    <CiInboxIn className={styles2.cilnbox} />
                    <div>
                        <h5 className={styles2.h5} >Income</h5>
                        <h2 className={styles2.howMuchIn}>{monthOrYear ? monthAmount[0] : yearAmount[0]}</h2>
                        <div className={styles.toolIncome}>Your loans and transfers</div>
                    </div>
                </div>
                <div className={`${styles2.summary} ${styles.containerExpenses}`}>
                    <CiInboxOut className={`${styles2.cilnbox} ${styles2.cilnboxOut}`} />
                    <div>
                        <h5 className={styles2.h5}>Expenses</h5>
                        <h2 className={styles2.howMuchEx}>{monthOrYear ? monthAmount[1] : yearAmount[1]}</h2>
                        <div className={styles.toolExpanses}>Your outgoing transfers</div>
                    </div>
                </div>
                <div className={styles.toggleTime}>
                    <p onClick={() => setMonthOrYear(true)} className={`${styles.lastMonth} ${monthOrYear ? styles.lastMonthActive : ''}`}>Last Month</p>
                    <p onClick={() => setMonthOrYear(false)} className={`${styles.lastYear} ${!monthOrYear ? styles.lastYearActive : ''}`}>Last Year</p>
                </div>
            </div>
        </>
    );
}
