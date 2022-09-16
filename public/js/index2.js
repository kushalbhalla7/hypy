const amountEle = document.getElementById('amount');
const payBtn = document.getElementById('pay');

// server to server pay syncronouse
function pay() {

    const amount = amountEle.value;

    return fetch('http://localhost:3000/server-to-server/sync/checkout', {
        method: 'POST',
        body: JSON.stringify({
            amount
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(res => res.text())
    .then(JSON.parse);
}

// when button gets clicked
payBtn.addEventListener('click', async () => {
    const resData = await pay();
    console.log("payment data", resData);
    const pa = document.createElement('p');
    pa.innerText = "Syncronous server to server payment is completed check in data folder and look in checkout json file (Note: no response object needed here)"
    document.body.appendChild(pa);
});


// // server to server pay syncronouse
// function pay() {

//     const amount = amountEle.value;

//     return fetch('http://localhost:3000/api2/checkout', {
//         method: 'POST',
//         body: JSON.stringify({
//             amount
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         }
//     })
//     .then(res => res.text())
//     .then(JSON.parse);
// }

// // server to server to pay asyncrouse
// function pay() {

//     const amount = amountEle.value;

//     return fetch('http://localhost:3000/api2/checkout2', {
//         method: 'POST',
//         body: JSON.stringify({
//             amount
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         }
//     })
//     .then(res => res.text())
//     .then(JSON.parse);
// }
