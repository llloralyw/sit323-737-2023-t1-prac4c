const jwt = require('jsonwebtoken')
const token = jwt.sign({ "pass": '666' }, 'secret')
console.log(token)

const axios = require('axios')
const options = {
    headers: {
        'Authorization': `Bearer ${token}`
    },
    maxRedirects: 0,
    validateStatus: function (status) {
        return status >= 200 && status < 303;
    },
};

axios.get('http://localhost:3000/login', options).then((res) => {
     console.log(res.data)
})
