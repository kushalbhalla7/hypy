const amountEle = document.getElementById('amount');
const payBtn = document.getElementById('pay');

// server to server to pay asyncrouse
function pay() {

    const amount = amountEle.value;

    return fetch('http://localhost:3000/server-to-server/async/checkout', {
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
    // redirecting to hyper pay testing verification page
    window.location = resData.redirect.url;
});