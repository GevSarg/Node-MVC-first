const list = document.getElementById('list')

list.addEventListener('click', (e) => {
    const {tagName, dataset} = e.target
    if(tagName === "BUTTON"){
       
        fetch(`http://localhost:3000/users/${dataset.id}`, {
            method : "DELETE"
        }).then((res) => res.json())
        .then(res => window.location.reload())
        .catch((err) => console.log(err)
        )
    }
})
