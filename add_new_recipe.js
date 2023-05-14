document.forms[0].addEventListener('submit', (ev) => {
    ev.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        alert(this.responseText);
      }
    };
    xhr.open('POST', 'db_table.php');
    
    xhr.send(new FormData(ev.target));
  
});

if(location.hash!=='') {
  let hash = location.hash;
  let editOrShow = hash.startsWith('#edit');
  // console.log();
  let hashTitleString = hash.split('&')[1].split('=')[1];
  console.log(hashTitleString,editOrShow,hash);
  document.querySelector("button[type='submit']").innerHTML=editOrShow ? 'Save' : 'Read';
  document.querySelector('form>h2').innerHTML = editOrShow ? 'Update Recipe' : 'See Recipe';
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
      console.log(this.responseText);
      let responseObj = JSON.parse(xhr.responseText);
      for(let [name,value] of new FormData(document.forms[0])) {
        document.getElementsByName(name)[0].value=responseObj[name];
        if(!editOrShow) document.getElementsByName(name)[0].readOnly=true;
      }
    }
  }
  xhr.open('POST','get_data.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`functionName=getDataPara&title=${hashTitleString}`);
}
