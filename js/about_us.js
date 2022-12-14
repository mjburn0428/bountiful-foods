//Hamburger Button
document.getElementById('navBtn').addEventListener('click', () => {
    document.getElementById('primaryNav').classList.toggle('open');
    document.getElementById('navBtn').classList.toggle('open');
  })
  
  //Last Modified Date
  document.getElementById('lastModified').innerText = document.lastModified;
  
  //Copyright year
  const date = new Date();