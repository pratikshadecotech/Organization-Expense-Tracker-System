/** @format */

import React from "react";
import { Progress } from "antd";
const Chart = ({ allTransection }) => {
    const totalTransection = allTransection.length;
    const totalIncomeTransection = allTransection.filter(
        (transection) => transection.type == "income"
    );
    const totalExpenseTransection = allTransection.filter(
        (transection) => transection.type == "expense"
    );
    const totalIncomePercent =
        (totalIncomeTransection.length / totalTransection) * 100;
    const totalExpensePercent =
        (totalExpenseTransection.length / totalTransection) * 100;

    const totalTurnover = allTransection.reduce((a, transection) => {
        return a + transection.amount;
    }, 0);
    const totalIncomeTurnover = allTransection
        .filter((transection) => {
            return transection.type == "income";
        })
        .reduce((a, transection) => {
            return a + transection.amount;
        }, 0);

    const totalExpenseTurnover = allTransection
        .filter((transection) => {
            return transection.type == "expense";
        })
        .reduce((a, transection) => {
            return a + transection.amount;
        }, 0);
    const totalExpenseTurnoverPercent =
        (totalExpenseTurnover / totalTurnover) * 100;
    const totalIncomeTurnoverPercent =
        (totalIncomeTurnover / totalTurnover) * 100;
    const categories = [
        "salary",
        "tip",
        "project",
        "food",
        "fee",
        "bill",
        "medicine",
    ];
    return (
        <>
            <div className="row m-4 mt-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            Total Transection : {totalTransection}
                        </div>
                        <div className="card-body">
                            <h5 className="text-success">
                                Total Income : {totalIncomeTransection.length}
                            </h5>
                            <h5 className="text-danger">
                                Total Expense : {totalExpenseTransection.length}
                            </h5>
                        </div>
                        <div>
                            <Progress
                                strokeColor={"green"}
                                type="circle"
                                percent={totalExpensePercent.toFixed(0)}
                                className="mx-2"
                            />
                            <Progress
                                strokeColor={"red"}
                                type="circle"
                                percent={totalIncomePercent.toFixed(0)}
                                className="mx-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">Total Turnover : {totalTurnover}</div>
                        <div className="card-body">
                            <h5 className="text-success">
                                Total Income Turnover: {totalIncomeTurnover}
                            </h5>
                            <h5 className="text-danger">
                                Total Expense Turnover: {totalExpenseTurnover}
                            </h5>
                        </div>
                        <div>
                            <Progress
                                strokeColor={"green"}
                                type="circle"
                                percent={totalIncomeTurnoverPercent.toFixed(0)}
                                className="mx-2"
                            />
                            <Progress
                                strokeColor={"red"}
                                type="circle"
                                percent={totalExpenseTurnoverPercent.toFixed(0)}
                                className="mx-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3 mx-3" >
                <div className="col-md-4">
                    <h2>category wise income</h2>
                    {categories.map((category) => {
                        const amount = allTransection
                            .filter((transection) => {
                                return (
                                    transection.type === "income" &&
                                    transection.category === category
                                );
                            })
                            .reduce((a, e) => {
                                return a + e.amount;
                            }, 0);
                        return (
                            amount > 0 && (
                                <div className="card">
                                    <div className="card-body">
                                        <div className="h5">{category}</div>
                                        <Progress
                                            percent={((amount / totalIncomeTurnover) * 100).toFixed(
                                                0
                                            )}
                                        />
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
                <div className="col-md-4">
                    <h2>category wise expense</h2>
                    {categories.map((category) => {
                        const amount = allTransection
                            .filter((transection) => {
                                return (
                                    transection.type === "expense" &&
                                    transection.category === category
                                );
                            })
                            .reduce((a, e) => {
                                return a + e.amount;
                            }, 0);
                        return (
                            amount > 0 && (
                                <div className="card ">
                                    <div className="card-body">
                                        <div className="h5">{category}</div>
                                        <Progress
                                            percent={((amount / totalExpenseTurnover) * 100).toFixed(
                                                0
                                            )}
                                        />
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Chart;
