
function signIn(){

    login = document.getElementById('login').value;;
    password = document.getElementById('password').value;

    if(login == '1' && password == '1' ){
        window.location.href = '/cooking/front/cooking.html';
    } else {
        alert('Неверный логин или пароль');
    }
    
}


// Добавление обработчиков событий 
document.addEventListener('DOMContentLoaded', () => {
    console.log('Загрузка страницы');
    document.getElementById('signIn').addEventListener('click', () => signIn());

});