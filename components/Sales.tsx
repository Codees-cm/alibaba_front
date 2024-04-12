"use client"
import React, { useState  } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  Button,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
FormControlLabel,
  Switch,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useQuery } from '@tanstack/react-query'; 
import axios from "axios"
import { useRouter } from 'next/navigation';

const SalesPage = () => {
  // const router = useRouter(); 
  const { data: sessionData } = useSession();
  const user_id = sessionData?.user?.id;
  const [product, setProduct] = useState('');
  const [productlist, setProductlist] = useState('');
  const [clientlist, setClientlist] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [pricePerUnit,setPricePerUnit] = useState(0); // Adjust the price per unit as needed
  const [clientId, setClientId] = useState("");
  const [salesData, setSalesData] = useState([]);
  const [maxQuantity, setMaxQuantity] = useState(0)
  const [manualClientEntry, setManualClientEntry] = useState(false); // Add state for manual entry toggle
  const [clientOrder, setClientOrder] = useState(false); // Add state for manual entry toggle
  const router = useRouter();

 
const {data ,isLoading , isError , isStale} = useQuery({
  queryKey: ['userProduct','userCustomer'],
  queryFn:async () => {
    const {data:productData} = await axios.post('api/products/get-products',{ "userId": user_id })
    const {data:customersData} = await axios.post('api/customers/get-customers',{ "userId": user_id })
  //  await axios.delete
  
    setProductlist(productData)
    setClientlist(customersData)
    // return data as Customers[]
  },
  staleTime: 300000, // 5 minutes (adjust as needed)
  cacheTime: 600000,
})

  const handleAddSale = async () => {
    // Validate input
    console.log(product ,quantity)
    if (!product || !quantity || isNaN(quantity) || parseInt(quantity) <= 0 || parseInt(quantity) > maxQuantity) {
      alert('Please enter valid product and quantity.');
      return;
    }

    // Calculate total price
    const totalPrice = parseInt(quantity) * pricePerUnit;

    // Add sale to the list
    const newSale = {
      product,
      quantity: parseInt(quantity),
      totalPrice,
      clientId: manualClientEntry ? clientId : null, // Use clientId only if manual entry is not selected
    
    };

    setSalesData([...salesData, newSale]);
  
console.log(salesData)
    // Clear input fields
    setProduct('');
    setQuantity(0);
    setClientId("");
    setPricePerUnit(0)
    setMaxQuantity(0)
    setManualClientEntry(false);
  };

  const handleRemoveSale = (index) => {
    const updatedSalesData = [...salesData];
    updatedSalesData.splice(index, 1);
    setSalesData(updatedSalesData);
  };


  // console.log(pricePerUnit)
  const handleSubmitSales = async () => {
    // Simulate sending sales data to the database
    // console.log('Submitting sales data:', salesData);
    // console.log('Client Id', clientId);
// 
    if (!clientId) {
      alert('Please enter client details');
      return;
    }
   
    const res =  await axios.post('api/sales', {
      salesData,user_id ,clientId,clientOrder
    }).then((res) => {
      if(res?.status == 201){
        toast.success("sale save")
      }else{
        toast.error("error")
        return 0
      }
  })



     // Clear the sales history
        setSalesData([]);
        setProduct("")
        setClientId("")
        setPricePerUnit(0)
        setMaxQuantity(0)
   
        if (clientOrder) {
            return router.push('/orders')
          } else {
              // Redirect to another page with the sales data
            localStorage.setItem('user', JSON.stringify({"salesData":salesData,"clientId":clientId}));
            console.log(salesData)
            return router.push('/sales/invoices')
          }
   
  };

  


  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Record Sales
      </Typography>

      <Grid container spacing={3}>
    
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
        
            <Typography variant="h6">Add Sale</Typography>

           
           {productlist && productlist.length > 0 && (
              <>
                  <Autocomplete
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setProduct(newValue.name);
                        setPricePerUnit(newValue.price);
                        setMaxQuantity(newValue.quantity);
                      } else {
                        setProduct('');
                        setPricePerUnit(0);
                        setMaxQuantity(0);
                      }
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free-solo-with-text-demo"
                    options={productlist.filter(product => product.quantity > 0)}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) =>
                      (  <li {...props}>{option.name}</li> )       
                      }
                    sx={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => <TextField {...params} label="Product List" />}
                  />
                <TextField
                  label="Quantity"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Typography variant="subtitle1" style={{ margin: '10px 0' }}>
                  Total Price: XAF{parseInt(quantity) * pricePerUnit}
                </Typography>

                <Button variant="contained" color="primary" onClick={handleAddSale}>
                  Add Sale
                </Button>

                <Typography variant="h6">Enter Client</Typography>

                <FormControlLabel
              control={
                <Switch
                  checked={manualClientEntry}
                  onChange={() => { 
                    setManualClientEntry(!manualClientEntry)
                    setClientId("")
                  }}
                />
              }
              label="Manual Client Entry"
            />
                {!manualClientEntry ? (
<></>
                ) : (
                  <TextField
                    label="Client Name (Manual Entry)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={clientId}
                    onChange={(e) => setClientId(e.target.value)}
                  />
                )}
                {clientlist && clientlist.length > 0 && !manualClientEntry && (
                  <Autocomplete
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setClientId(newValue.name);
                      } else {
                        setClientId("");
                      }
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    id="free"
                    options={clientlist}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option)=>      
                          <li {...props}>{option.name}</li>
                  }
                    sx={{ width: 300 }}
                    freeSolo
                    renderInput={(params) => <TextField {...params} label="Client List" />}
                  />
                )}
            
              </>
            )}

          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h6">Sales History</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesData.map((sale, index) => (
                    <TableRow key={index}>
                      <TableCell>{sale.product}</TableCell>
                      <TableCell>{sale.quantity}</TableCell>
                      <TableCell>XAF{sale.totalPrice}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleRemoveSale(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {salesData.length > 0 && (
             
<>
<FormControlLabel
              control={
                <Switch
                  checked={clientOrder}
                  onChange={() => { 
                    setClientOrder(!clientOrder)
                    // setClientId("")
                  }}
                />
              }
              label="Is it an order?"
            />
<Button
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
                onClick={handleSubmitSales}
              >
                   Submit Sales
              </Button>
</>
            )}
          </Paper>
        </Grid>
      </Grid>
      <ToastContainer/>
    </Container>
  );
};

export default SalesPage;
