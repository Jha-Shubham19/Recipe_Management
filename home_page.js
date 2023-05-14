const search = document.querySelector('input[type="text"]');
search.addEventListener('keyup',(ev)=> {
    displayCards(ev.target.value)
})
function displayCards(text='') {
    let xhr = new XMLHttpRequest();
    console.log(xhr);
    xhr.onreadystatechange = function() {
        if(xhr.readyState==4 && xhr.status==200) {
            console.log(this.responseText);
            // return;
            responseObj = JSON.parse(this.responseText);
            let divCont = document.getElementsByClassName('container')[0];
            divCont.innerHTML = '';
            
            for (let rows of responseObj) {
                let addon = `<div class="card">
                                <h2>${rows['title']}</h2>
                                <p>${rows['descript']}</p>
                                <div class='${rows['category']}'></div>
                                <ul>
                                    ${rows['ingredients'].split(',').map(val=>`<li>${val}</li>`).join('')}
                                </ul>
                                <div class="tooltip">
                                    <i class="fa fa-ellipsis-h"></i>
                                    <ul>
                                    <li>Edit</li>
                                    <li data-delete>Delete</li>
                                    </ul>
                                </div>
                            </div>`;
                divCont.innerHTML+= addon;
            }
            addTooltip();
        }
    }

    xhr.open('POST','get_data.php',false);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`functionName=getData&text=${text}`);
}
displayCards();

//delete section

function addTooltip() {

    let liss = document.querySelectorAll('.tooltip>ul');
    for (let li of liss) {
        console.log(li);
        li.lastElementChild.addEventListener('click',(ev)=> {
            ev.stopPropagation();
            console.log("its here");
            // console.log(ev.target.closest('.card').querySelector('h2:first-of-type').innerHTML);return;
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if(xhr.readyState==4 && xhr.status==200) {
                    console.log(this.responseText);
                }
                location.reload();
            }
            xhr.open('POST','get_data.php',false);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(`functionName=delete&title=${ev.target.closest('.card').querySelector('h2:first-of-type').innerHTML}`);
        })
    
        li.firstElementChild.addEventListener('click',(ev)=>{
            ev.stopPropagation();
            console.log(ev.target);
            let link = location.href;
            console.log(link);
            location.href = link.substring(0,link.lastIndexOf('/'))+`/add_new_recipe.html#edit=true&title=${ev.target.closest('.card').querySelector('h2:first-of-type').innerHTML}`;
        })
    }

    for(let card of document.querySelectorAll('div.card')) {
        
        card.addEventListener('click',(ev)=>{
            console.log(ev.target);
            let link = location.href;
            console.log(link);
            location.href = link.substring(0,link.lastIndexOf('/'))+`/add_new_recipe.html#show=true&title=${ev.target.closest('.card').querySelector('h2:first-of-type').innerHTML}`;
        })
    }
}