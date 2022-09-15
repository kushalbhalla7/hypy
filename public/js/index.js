const amountEle = document.getElementById('amount');
const payBtn = document.getElementById('pay');

// copy to pay checkout
function pay() {

    const amount = amountEle.value;

    return fetch('http://localhost:3000/api/checkout', {
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

payBtn.addEventListener('click', async () => {
    const resData = await pay();
    console.log(resData);
    // window.location = resData.redirect.url;
    window.location = `http://localhost:3000/card?id=${resData.id}`;
});