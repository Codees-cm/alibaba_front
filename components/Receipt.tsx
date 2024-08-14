import React from 'react';
import '@/public/style.css';

const Receipt = ({ salesData, paymentMethod, name, phoneNumber, location, totalAmount, amountReceived, balance }) => {
    const currentDate = new Date().toLocaleString();
    const receiptCode = 'LABC' + Math.floor(Math.random() * 1000000).toString();

    return (
        <div className="text-center mt-3">
            <section className="receipt container-ticket">
                <div className="ticket">
                    <div className="head-ticket">
                        {/* Logo */}
                        <div className="logo">
                            <img src="logo_url_here" alt="Labcraft Logo" className="logo-image" />
                        </div>
                        {/* Company Info */}
                        <p className="bold">Labcraft Sarl</p>
                        <p className="bold">labscraft@gmail.com</p>
                        <p className="bold">P.O. BOX. 90420-80100 MSA</p>
                        <div className="dotted-line"></div>
                        <p>Date: {currentDate}</p>
                        <p>Receipt code: {receiptCode}</p>
                    </div>
                    <div className="body-ticket">
                        {/* Product List Header */}
                        <div className="col4 header-row">
                            <p><b>Product</b></p>
                            <p><b>Qty</b></p>
                            <p><b>Unit Price</b></p>
                            <p><b>Total Price</b></p>
                        </div>
                        <div className="hr-sm"></div>

                        {/* Product List */}
                        {salesData.map((product, index) => (
                            <div key={index} className="col4 product-row">
                                <p>{product.product}</p>
                                <p>{product.quantity_sold}</p>
                                <p>{product.sale_price}</p>
                                <p>{(product.sale_price * product.quantity_sold).toFixed(2)}</p>
                            </div>
                        ))}

                        {/* Total */}
                        <div className="col4 total-row">
                            <p><b>Total</b></p>
                            <p></p>
                            <p></p>
                            <p className="prix"><b>{totalAmount}</b></p>
                        </div>

                        {/* Payment Info */}
                        <div className="col2">
                            <p>Payment Method</p>
                            <p className="prix"><b>{paymentMethod}</b></p>
                        </div>
                        <div className="col2">
                            <p>Amount Received</p>
                            <p className="prix"><b>{amountReceived}</b></p>
                        </div>
                        <div className="col2">
                            <p>Balance</p>
                            <p className="prix"><b>{balance}</b></p>
                        </div>
                    </div>

                    {/* Customer Info */}
                    {name || phoneNumber || location ? (
                        <div>
                            <div className="hr-lg"></div>
                            <div className="carte">
                                <p className="title-carte">Customer Information</p>
                                {name && <p>Name: {name}</p>}
                                {phoneNumber && <p>Phone: {phoneNumber}</p>}
                                {location && <p>Location: {location}</p>}
                            </div>
                        </div>
                    ) : null}

                    {/* Thank You Message */}
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
