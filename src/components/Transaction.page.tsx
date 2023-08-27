import React from 'react'
import { getTransactionService } from '../services/transaction.service';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';

const Transaction = () => {
  const onSuccess=()=>{
    toast.success('Transaction data fetched!');

  }
  const onError = ()=>{
    toast.error('Error data fetched!');
  }
  const {
    isLoading,
    data,
    isError,
    error,
    refetch
  }: { isLoading: boolean; data: any; isError: boolean; error: any,refetch:any } = useQuery(
    "get-transactions",
    getTransactionService,
    {
      cacheTime:5000,
      staleTime:60*1000,
      enabled:false,
      onSuccess,
      onError
      // refetchInterval:2000
    }
  );

  return (
    <div>
      <h1>Transactions</h1>
      <button onClick={refetch}>Fetch data</button>
      <div>
         {
          data?.data?.transactions.map((self:any,index:number)=>(
            <div key={index}>
              {self.cost} || {self.userId}
            </div>
          ))
         }
      </div>
    </div>
  )
}

export default Transaction