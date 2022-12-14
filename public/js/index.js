const amountEle = document.getElementById('amount');
const payBtn = document.getElementById('pay');


// calling backend api with amount value
function pay() {
    const amount = amountEle.value;
    return fetch('http://localhost:3000/copy-and-pay/checkout', {
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
    // redirect to front end page for enter card details
    window.location = `http://localhost:3000/card?id=${resData.id}`; 
});