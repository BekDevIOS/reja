////////////////////// MITASK A ////////////////////////////

function coutLetter(a,  text){
    let sum = 0;
    for(ele of text.split("")){
        if(a == ele){
            sum++;
        }
    }
    return sum;
};

const result = coutLetter(4, 'gjsl34kjs44lfgdjk49083jk754lgjdfljds44hfgk932');
console.log("Result of MITASK A: ", result);



console.log("Jack Ma maslahatlari");
const list = [
  "yaxshi talaba boling", // 0–20
  "togri boshliq tanlang va koproq hato qiling", // 20–30
  "uzingizga ishlashingizni boshlang", // 30–40
  "siz kuchli bolgan narsalarni qiling", // 40–50
  "yoshlarga investitsiya qiling", // 50–60
  "endi dam oling, foydasi yoq endi", // 60
];



// event loop & callBack
function maslahatBering(a, callBack) {
    if(typeof a !== "number") callBack("Insert a number", null);
    else if(a<=20) callBack(null, list[0]);
    else if(a>20 & a<=30) callBack(null, list[1]);
    else if(a>30 & a<=40) callBack(null, list[2]);
    else if(a>40 & a<=50) callBack(null, list[3]);
    else if(a>50 & a<=60) callBack(null, list[4]);
    else {
        setInterval(() => {
            callBack(null, list[5]);
        }, 1000);
    }
}

console.log('Passed here 0')
maslahatBering(35, (err, data) => {
    if(err) console.log('ERROR:', err);
    console.log('Result:', data);
})
console.log('Passed here 1')


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

