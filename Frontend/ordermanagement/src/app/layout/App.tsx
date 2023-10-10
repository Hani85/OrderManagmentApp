import React from 'react';
import './styles.css';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout';
import HomePage from '../../features/home/HomePage';
import CustomersDashboard from  '../../../src/features/customers/customersDashboard/CustomersDashboard';
import OrdersDashboard from '../../../src/features/orders/ordersDashboard/OrdersDashboard';
import Customerpage from '../../features/customers/CustomerPage';
import Orderpage from '../../features/orders/OrderPage';

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {}
  }),
  uri: process.env.REACT_APP_API_SCHEMA_URL
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path='customers' element={<CustomersDashboard />}></Route>
          <Route path='customers/:customerId' element={<Customerpage/>} />
          <Route path='orders' element={<OrdersDashboard />}></Route>
          <Route path='orders/:orderId' element={<Orderpage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
