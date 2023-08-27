import {serviceClient} from "./rest"

export const getProductsService = ()=>{
    return serviceClient.get("/api/client/products")
}