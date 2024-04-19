let url = {
    default: "http://localhost:3212/",
    login: "http://localhost:3212/login",
    attemptLogin: "http://localhost:3212/auth/login",
    landingPage: "http://localhost:3212/admin/comments",
    comment: "http://localhost:3212/comment"
}

function cekLogin() {
    if (sessionStorage.getItem('token')) {
        window.location.replace(url.landingPage);
    }
}

function cekToken() {
    if (!sessionStorage.getItem('token')) {
        sessionStorage.clear()
        alert('Token Not Found Please Login')
        window.location.replace(url.login);
    }
}

function goToLogin() {
    sessionStorage.clear()
    window.location.replace(url.login);
}

let errList = ['Unauthorized!', 'Unauthorized! Token was expired!', 'No token provided!']

function cekErr(error) {
    if (errList.indexOf(error) !== -1) {
        return true
    }
    else {
        return false
    }
}
