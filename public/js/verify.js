
const resourcePath = new URLSearchParams(window.location.search).get('resourcePath');

const resBtn = document.getElementById('res');

function pay() {
    return fetch('http://localhost:3000/server-to-sevrer/async/confirm', {
        method: 'post',
        body: JSON.stringify({
            resourcePath
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
    .then(res => res.text())
    .then(JSON.parse)
    .catch(err => console.log(err));
}

resBtn.addEventListener('click', async() => {
    const resData = await pay();
    console.log("response data", resData);
})
