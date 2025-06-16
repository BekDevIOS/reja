////////////////////// MITASK E ////////////////////////////
function getReverse(a){
    let newArr = [];
    for(ele of a.split('')){
        newArr.unshift(ele);
    }
    return newArr.join('');
};

const result = getReverse('Utkirbek');
console.log('result: ', result);










////////////////////// MITASK D ////////////////////////////
// const moment = require('moment');

// class Shop {
//     #olma;
//     #banana;
//     #kivi;

//     constructor(olma, banana, kivi){
//         this.#olma = olma,
//         this.#banana = banana,
//         this.#kivi = kivi
//     };

//     qoldiq(){
//         console.log(`Hozir ${moment().format('HH:MM')} da ${this.#olma}ta olma, ${this.#banana}ta banan va ${this.#kivi}ta kivi mavjud!`); 
//     }

//     sotish(a){
//         this.#olma -= a;
//     }

//     qabul(b){
//         this.#banana += b;
//     }
// };

// const shop = new Shop(7, 9, 4);

// shop.qoldiq();
// shop.sotish(3);
// shop.qabul(6);
// shop.qoldiq();

















////////////////////// MITASK C ////////////////////////////

// function checkContent(a, b){
//     let result = false;
//     for(ele of a.split('')){
//            result = b.split('').some((val) => {
//                return val == ele;
//             });
//     };
//     for(ele of b.split('')){
//            result = a.split('').some((val) => {
//                return val == ele;
//             });
//     }
//     return result;
// }

// const check1 = checkContent("Jaa", "ajy")
// console.log('check1: ', check1);

// const check2 = checkContent("Jay", "ajy")
// console.log('check2: ', check2);











////////////////////// MITASK B ////////////////////////////
// // after searching net sources
// function isNumber2(text){
//     let count = 0;
//     for(ele of text.split("")){
//         if(!isNaN(ele)){
//             count++
//         }
//     }
//     return count;
// };

// const result2 = isNumber2('sdfjjkah23jkh234jk24');
// console.log('result2: ', result2);


// // my first solution 
// function isNumber(text){
//     let count = 0;
//     for(ele of text.split("")){
//         for(let i = 0; i <= 9; i++){
//             if(ele == i) count++;
//         }
//     }
//     return count;
// };

// const result = isNumber('jss3d34gdhkhs23hj32jh23');
// console.log('result1: ', result);











////////////////////// MITASK A ////////////////////////////

// function coutLetter(a,  text){
//     let sum = 0;
//     for(ele of text.split("")){
//         if(a == ele){
//             sum++;
//         }
//     }
//     return sum;
// };

// const result = coutLetter(4, 'gjsl34kjs44lfgdjk49083jk754lgjdfljds44hfgk932');
// console.log("Result of MITASK A: ", result);



// console.log("Jack Ma maslahatlari");
// const list = [
//   "yaxshi talaba boling", // 0–20
//   "togri boshliq tanlang va koproq hato qiling", // 20–30
//   "uzingizga ishlashingizni boshlang", // 30–40
//   "siz kuchli bolgan narsalarni qiling", // 40–50
//   "yoshlarga investitsiya qiling", // 50–60
//   "endi dam oling, foydasi yoq endi", // 60
// ];



// // event loop & callBack
// function maslahatBering(a, callBack) {
//     if(typeof a !== "number") callBack("Insert a number", null);
//     else if(a<=20) callBack(null, list[0]);
//     else if(a>20 & a<=30) callBack(null, list[1]);
//     else if(a>30 & a<=40) callBack(null, list[2]);
//     else if(a>40 & a<=50) callBack(null, list[3]);
//     else if(a>50 & a<=60) callBack(null, list[4]);
//     else {
//         setInterval(() => {
//             callBack(null, list[5]);
//         }, 1000);
//     }
// }

// console.log('Passed here 0')
// maslahatBering(35, (err, data) => {
//     if(err) console.log('ERROR:', err);
//     console.log('Result:', data);
// })
// console.log('Passed here 1')


// // ASYNC function
// async function maslahatBering(a) {
//     if(typeof a !== "number") throw new Error("Insert a number");
//     else if(a<=20) return list[0];
//     else if(a>20 & a<=30) return list[1];
//     else if(a>30 & a<=40) return list[2];
//     else if(a>40 & a<=50) return list[3];
//     else if(a>50 & a<=60) return list[4];
//     else {
//         return new Promise((resolve, reject) => {
//             setInterval(() => {
//                 resolve(list[5]);
//             }, 1000);
//         })
//     }
// }

// // call via then/catch
// console.log('Passed here 0')
// maslahatBering(25).then(data => {
//     console.log('Result: ', data);
// }).catch(err => {
//     console.log("ERROR: ", err)
// })
// console.log('Passed here 1')

// // call via asyn/await
// async function run() {
//     let javob = await maslahatBering(65);
//     console.log(javob)
//     // javob = await maslahatBering(30);
//     // console.log(javob)
//     // javob = await maslahatBering(40);
//     // console.log(javob)
// }
// run();

