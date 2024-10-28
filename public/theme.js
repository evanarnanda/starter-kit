const theme = localStorage.getItem('data-theme');
const buttonTheme = document.getElementById('button-theme')

if (theme) {
  changeTheme(theme)
  buttonTheme.setAttribute('checked', true)
}

function changeTheme(value) {
  document.querySelector('html').setAttribute('data-theme', value)
}

buttonTheme.addEventListener('click', (e) => {
  if(e.target.checked) {
    changeTheme(e.target.value)
    localStorage.setItem('data-theme', e.target.value)
  }
  else {
    changeTheme('light')
    localStorage.setItem('data-theme', 'light')
  }
}) 