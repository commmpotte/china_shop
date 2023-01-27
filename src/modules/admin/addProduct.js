import {
    postData,
    getData,
    deleteData
} from "../api"

export const addProduct = () => {
    const nameInp = document.getElementById('product-name')
    const titleInp = document.getElementById('product-title')
    const priceInp = document.getElementById('product-price')
    const previewInp = document.getElementById('product-image')
    const saveBtn = document.getElementById('product-add-btn')
    const select = document.getElementById("product-category")
    const container = document.getElementById("product-table")

    const productData = {
        title: '',
        price: 0,
        name: '',
        preview: '',
        category: 0
    }

    const render = (data) => {
        container.innerHTML = ''
        data.forEach((item, index) => {
            container.insertAdjacentHTML('beforeend', `
            <tr>
            <th scope="row">${index+1}</th>
            <td>${item.title}</td>
            <td>${item.name}</td>
            <td>${item.price}₽</td>
            <td class="text-end">
                <button type="button" class="btn btn-outline-danger btn-sm" data-product="${item.id}">
                    удалить
                </button>
            </td>
        </tr>
            `)
        });
    }

    const checkValues = () => {
        if (nameInp.value === '' || previewInp.value === '' || titleInp.value === '' || Number(priceInp.value) === 0 || select.value === 'default') {
            saveBtn.disabled = true
        } else {
            saveBtn.disabled = false
        }
    }

    const updTable = () => {
        getData('/products')
            .then((data) => {
                render(data);
            })
    }

    select.addEventListener('change', () => {
        productData.category
        const url = select.value !== 'default' ? `/products?category=${select.value}` : `/products`
        getData(url)
            .then((data) => {
                render(data);
            })

        checkValues()
    })

    nameInp.addEventListener('input', () => {
        productData.name = nameInp.value
        checkValues()
    })
    priceInp.addEventListener('input', () => {
        productData.price = Number(priceInp.value)
        checkValues()
    })
    titleInp.addEventListener('input', () => {
        productData.title = titleInp.value
        checkValues()
    })

    previewInp.addEventListener('input', () => {
        const file = previewInp.files[0]

        if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg") {
            const reader = new FileReader()

            reader.onload = () => {
                productData.preview = reader.result
            }

            reader.onerror = () => {
                productData.preview = ''
                previewInp.value = ''
            }

            reader.readAsDataURL(file)
        } else {
            previewInp.value = ''
        }

        checkValues()
    })


    saveBtn.addEventListener('click', () => {

        postData('/products', productData).then(() => {
            nameInp.value = ''
            priceInp.value = ''
            titleInp.value = ''
            previewInp.value = ''
            updTable()
        })
    })

    container.addEventListener('click', (event) => {
        // C помощью tagName ищем кнопку и с помощью dataset выводим id при клике
        if (event.target.tagName === 'BUTTON') {
            const id = event.target.dataset.product
            deleteData(`/products/${id}`).then((data) => {
                updTable()
            })
        }
    })

    updTable()
    checkValues()
}

// Amazfit GTS 4 mini (черный)
// Red Line Ultimate для Xiaomi Redmi 9C (оранжевый)
// Xiaomi Redmi A1+ 2/32GB (голубой)