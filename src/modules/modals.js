export const openModal = (modal) => {
    // Как вариант добавлять нужные классы можно в таком формате
    // const layout = document.createElement('div')
    // layout.classList.add('modal-backdrop')
    // layout.classList.add('fade')
    // // Встраиваем прямо в body созданный layout
    // document.body.append(layout)

    document.body.insertAdjacentHTML('beforeend',
        `<div class="modal-backdrop fade"></div>`)

    modal.classList.add('d-block')
    setTimeout(() => {
        const layout = document.querySelector('.modal-backdrop')
        modal.classList.add('show')
        layout.classList.add('show')
    }, 500)
}

export const closeModal = (modal) => {
    const layout = document.querySelector('.modal-backdrop')
    layout && layout.classList.remove('show')

    modal.classList.remove('show')
    setTimeout(() => {
        modal.classList.remove('d-block')
        layout && layout.remove()
    }, 500)
}