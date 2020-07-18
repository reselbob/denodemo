export class Calculator {
    static add(numbers: Array<number>): number{
        return numbers.reduce((a, b) => a + b, 0);
    }

    static subtract(numbers: Array<number>): number{
        let j = 0;
        for( let i = 0; i < numbers.length; i++){
            if(i ===0){
                j = numbers[0];
            }else{
                j = j - numbers[i];
            }
        }
        return j;
        //return numbers.reduce((a, b) => a - b, 0);
    }

    static multiply(numbers: Array<number>): number{
        return numbers.reduce((a, b) => a * b);
    }

    static divide(numbers: Array<number>): number{
        return numbers.reduce((a, b) => a / b);
    }
}