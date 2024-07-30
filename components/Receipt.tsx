import React from 'react';
import '@/public/style.css';

const Receipt = ({ salesData, paymentMethod, name, phoneNumber, location, totalAmount, amountReceived, balance }) => {
    const currentDate = new Date().toLocaleString();
    const receiptCode = 'LABC' + Math.floor(Math.random() * 1000000).toString();
    console.log("update");

    return (
        <div className="text-center mt-3">
            <section className="receipt container-ticket">
                <div className="ticket">
                    <div className="head-ticket">
                        <p className="x-bold"></p>
                        <p className="bold">Labcraft&apos;s Street</p>
                        <p className="bold">Tel: +000 000 000000</p>
                        <br />
                        {/* <p className="bold">P.O BOX. 90420-80100 MSA</p> */}
                        <p>Date: {currentDate}</p>
                        <p>Receipt code: {receiptCode}</p>
                    </div>
                    <div className="body-ticket">
                        {salesData.map((product, index) => (
                            <div key={index}>
                                <div className="col2">
                                    <p>{product.product}</p>
                                    <p className="prix"><b>{product.sale_price}</b></p>
                                </div>
                                <div className="hr-sm"></div>
                                <div className="col2">
                                    <p>Quantity</p>
                                    <p className="prix"><b>{product.quantity_sold}</b></p>
                                </div>
                            </div>
                        ))}
                        <div className="col2">
                            <p>Total</p>
                            <p className="prix"><b>{totalAmount}</b></p>
                        </div>
                        <br />
                        <div className="col2">
                            <p>Payment Method</p>
                            <p className="prix"><b>{paymentMethod}</b></p>
                        </div>
                        <div className="col2">
                            <p>Amount received</p>
                            <p className="prix"><b>{amountReceived}</b></p>
                        </div>
                        <div className="col2">
                            <p>Balance</p>
                            <p className="prix"><b>{balance}</b></p>
                        </div>
                    </div>
                    <div className="hr-lg"></div>
                    <div className="carte">
                        <p className="title-carte">Customer: {name}</p>
                        <br />
                        <p>Phone: {phoneNumber}</p>
                        <br />
                        <p>Location: {location}</p>
                        <br />
                    </div>
                    <div className="hr-lg"></div>
                    <div className="footer-ticket">
                        <p className="title-footer">THANK YOU</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Receipt;
