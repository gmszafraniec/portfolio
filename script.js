document.addEventListener('DOMContentLoaded', () => {
    // Pobieranie elementów i zapisywanie jako zmienne
    const menuItems = document.querySelectorAll('.menu .line');
    const contentBoxes = document.querySelectorAll('.content .box');
    const title = document.querySelector('.title');

    // Funkcja do usuwania id active i visible
    function removeActiveAndVisible() {
        menuItems.forEach(item => item.removeAttribute('id'));
        contentBoxes.forEach(box => box.removeAttribute('id'));
        title.removeAttribute('id');
    }

    // Nasłuchuj kliknięcia na element menu
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Usuń id active i visible ze wszystkich
            removeActiveAndVisible();
            
            // Dodaj id active klikniętemu elementowi menu
            item.setAttribute('id', 'active');
            
            // Znajdź odpowiadający element contentu i dodaj mu id visible
            const dataId = item.getAttribute('data-id');
            const correspondingContent = document.querySelector(`.content .box[data-id="${dataId}"]`);
            correspondingContent.setAttribute('id', 'visible');
            
            // Jeśli kliknięty element menu ma klasę aboutme i id active, dodaj id rotate do elementu title
            if (item.classList.contains('aboutme')) {
                title.setAttribute('id', 'rotate');
            }
        });
    });

    // Nasłuchuj kliknięcia na dowolny element body
    document.body.addEventListener('click', (event) => {
        // Sprawdź, czy kliknięty element nie jest elementem menu ani content
        if (!event.target.closest('.line') && !event.target.closest('.box')) {
            // Usuń id active i visible ze wszystkich
            removeActiveAndVisible();
        }
    });
});
