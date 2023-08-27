import {serviceClient} from "./rest"

export const getTransactionService = ()=>{
    return serviceClient.get("/api/client/transactions")
}