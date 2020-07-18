import { Calculator } from './calculator.ts';
import { Router, Response } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

const convertToArray =  (param: string) => {
    let result;
    try{
        result = JSON.parse('[' + param + ']');
    }catch (e){
        throw new Error(`The string:  ${param} cannot be converted into an array of numbers`)
    }
    return result
}

const add = async ({ params, response }: { params: { numbers: string}; response: Response }) => {
    try{
        const result = Calculator.add(convertToArray(params.numbers));  
        response.body = result
        response.status = 200; 
    }catch (e){ 
        response.body = e.message;
        response.status = 500; 
    }
  }
  const subtract = async ({ params, response }: { params: { numbers: string }; response: Response }) => {
    try{
        const result = Calculator.subtract(convertToArray(params.numbers));  
        response.body = result
        response.status = 200; 
    }catch (e){ 
        response.body = e.message;
        response.status = 500; 
    }
  }
  const multiply = async ({ params, response }: { params: { numbers: string }; response: Response }) => {
    try{
        const result = Calculator.multiply(convertToArray(params.numbers));  
        response.body = result
        response.status = 200; 
    }catch (e){ 
        response.body = e.message;
        response.status = 500; 
    }
  }
  const divide = async ({ params, response }: { params: { numbers: string }; response: Response }) => {
    try{
        const result = Calculator.divide(convertToArray(params.numbers));  
        response.body = result
        response.status = 200; 
    }catch (e){ 
        response.body = e.message;
        response.status = 500; 
    }
  }

  const ping = async ({response }: { response: Response }) => {
    response.body = {msg: "ping", date: new Date()};
    response.status = 200; 
  }

router.get('/sum/:numbers', add)
      .get('/difference/:numbers', subtract)
      .get('/product/:numbers', multiply)
      .get('/quotient/:numbers', divide)
      .get('/ping', ping)

export default router