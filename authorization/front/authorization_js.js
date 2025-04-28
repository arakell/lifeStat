
function signIn(){

    storedPassword = '0bea2b1f68fecde452eb363247841f5a846f7a7f7fe89cf712fe9792526e7928';
    login = document.getElementById('login').value;;
    password = document.getElementById('password').value;
    hashedPassword = sha256(password);
    hashedPassword = sha256(hashedPassword)

    if(login === '1' && hashedPassword === storedPassword ){
        window.location.href = '../../cooking/front/cooking.html';
    } else {
        alert('Неверный логин или пароль');
    }
    
}


// Добавление обработчиков событий 
document.addEventListener('DOMContentLoaded', () => {
    console.log('Загрузка страницы');
    document.getElementById('signIn').addEventListener('click', () => signIn());

});