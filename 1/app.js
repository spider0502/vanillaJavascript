const form = document.getElementById('form')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const password2 = document.getElementById('password2')

//input error class
const showError = function (input, message) {
    const formControl = input.parentElement
    formControl.classList.remove('success')
    formControl.classList.add('error')
    const small = formControl.querySelector('small')
    small.textContent = message
}

//input success class
const showSuccess = function (input) {
    const formControl = input.parentElement
    formControl.classList.remove('error')
    formControl.classList.add('success')
}

//email validation
const checkEmail = function (input) {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    if (regex.test(input.value)) {
        showSuccess(input)
    } else {
        showError(input, 'Email is not valid')
    }
}

//Check required fields
const checkRequired = function (inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

//check input length
const checkLength = function (input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input)
    }
}

//confirm password check
const checkPasswordMatch = function (pw1, pw2) {
    if (pw1.value !== pw2.value) {
        showError(pw2, 'Password not match')
    }
}

const getFieldName = function (input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

form.addEventListener('submit', function (e) {
    e.preventDefault()

    checkRequired([username, email, password, password2])
    checkLength(username, 3, 15)
    checkLength(password, 6, 25)
    checkEmail(email)
    checkPasswordMatch(password, password2)
})