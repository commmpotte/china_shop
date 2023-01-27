import {
    openModal,
    closeModal
} from "./modals"
import {
    getData
} from "./api"

export const authFunc = () => {
    const modal = document.getElementById('auth-modal')
    const authBtn = document.getElementById('open-auth-btn')
    const closeBtns = modal.querySelectorAll('.close-btn')
    const loginBtn = modal.querySelector('.login-btn')
    const logoutBtn = document.getElementById('logout-btn')    
    const openCartBtn = document.getElementById('open-cart-btn')

    const login = () => {
        authBtn.classList.add('d-none')
        openCartBtn.classList.remove('d-none')
        logoutBtn.classList.remove('d-none')
        // openCartBtn.style.display = 'block'
        // logoutBtn.style.display = 'block'
        closeModal(modal)
    }

    const logout = () => {
        authBtn.classList.remove('d-none')
        openCartBtn.classList.add('d-none')
        logoutBtn.classList.add('d-none')
    }

    const checkAuth = () => {
        // if (JSON.parse(localStorage.getItem('auth'))) {
        //     login()
        // }

        const user = JSON.parse(localStorage.getItem('auth'))

        if(user) {
            getData('/profile').then((data) => {
                console.log(data)
                if ((data.login && data.login === user.login) &&
                    (data.password && data.password === user.password)) {
                    login()
                } else {
                    alert('Вы ввели неверные данные')
                }
            })

        }

    }

    authBtn.addEventListener('click', () => {
        openModal(modal)
    })

    closeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            closeModal(modal)
        })
    })

    loginBtn.addEventListener('click', () => {
        const loginInput = modal.querySelector('#login-control')
        const passwordInput = modal.querySelector('#password-control')

        const user = {
            login: loginInput.value,
            password: passwordInput.value
        }

        if (loginInput.value === '' || passwordInput.value === '') {
            alert('Заполните все поля для успешной авторизации')
        }

        getData('/profile').then((data) => {
            console.log(data)
            if ((data.login && data.login === user.login) &&
                (data.password && data.password === user.password)) {
                console.log('Успех')
                localStorage.setItem('auth', JSON.stringify(data))
                login()
            } else {
                alert('Вы ввели неверные данные')
            }
        })

        // Обращаемся к localStorage с методом setItem передаем два обязательных аргумента
        // 1-ключ 'auth', 2 - объект в строке
        // localStorage.setItem('auth', JSON.stringify(user))

    })

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('auth')
        logout()
    })

    checkAuth()
}