"use client"

const invoiceData = {
  invoiceNumber: 'INV-123456',
  invoiceDate: '2022-01-15',
  // dueDate: '2022-02-15',
  customer: {
    name: 'John Doe',
 
  },
  items: [
    {  description: 'Product A', quantity: 2, unitPrice: 50 },
    {  description: 'Product B', quantity: 1, unitPrice: 75 },
    // Add more items as needed
  ],
};

import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from '@mui/material';
import generatePdf from '@/utils/pdfGenerator';
import { redirect } from 'next/navigation';

const InvoicePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setData(user);
  }, []);

  const calculateTotal = () => {
    if (data && data.salesData) {
      // console.log(data.salesData)
      return data.salesData.reduce((total, item) => total + item.totalPrice, 0);
    }
    return 0;
  };

  const pdfRef = useRef();

  const handleGeneratePdf = () => {
    if (pdfRef.current) {
      generatePdf(pdfRef.current, 'sales_receipt.pdf');
      localStorage.clear();
      redirect("/sales")
    }
  };

  return (
    <>
      {data ? (
        <Container maxWidth="md" style={{ marginTop: '50px' }}>
          <div ref={pdfRef} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h4" gutterBottom>
              Sales Receipt #{data.invoiceNumber}
            </Typography>
            <Typography variant="subtitle1">Invoice Date: {data.invoiceDate}</Typography>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Bill To:
            </Typography>
            <Typography variant="subtitle1">{data.clientId}</Typography>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Unit Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.salesData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.product}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">XAF {(item.totalPrice / item.quantity).toFixed(0)}</TableCell>
                      <TableCell align="right">XAF {item.totalPrice.toFixed(0)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" style={{ marginTop: '20px' }}>
              Total: XAF {calculateTotal().toFixed(0)}
            </Typography>
          </div>
          <Button onClick={handleGeneratePdf} variant="contained" color="primary" style={{ marginTop: '20px' }}>
            Print Receipt
          </Button>
        </Container>
      ) : (
        <Typography variant="h6" style={{ marginTop: '50px' }}>
          Loading...
        </Typography>
      )}
    </>
  );
};

export default InvoicePage;
