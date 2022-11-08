

export function loadItems() {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve(['item1','item2', 'item3'])
        }, 1000)
    })
}