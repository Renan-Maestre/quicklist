const form = document.getElementById("form");
const textInput = document.getElementById("text");
const ul = document.querySelector('ul[role="List"]');

form.onsubmit = (event) => {
     event.preventDefault(); // Previne o comportamento padrão do formulário
    
    const itemText = textInput.value.trim();
    
    // Verifica se o input não está vazio
    if (itemText !== "") {
        // Cria o novo elemento li
        const newLi = document.createElement("li");
        
        // Defines the inner HTML of the new li
        newLi.innerHTML = `
            <input type="checkbox" name="" id="">
            <p>${itemText}</p>
            <a href="#" class="delete-btn"><img src="/assets/bin.svg"></a>
        `;
        
        // Adds the new li to the ul
        ul.appendChild(newLi);
        
        // Limpa o input
        textInput.value = "";
    }
}

// Função para exibir o popup de item removido
function showDeletePopup() {
    // Remove popup anterior se existir
    const existingPopup = document.querySelector('.delete-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    
    // Cria o elemento do popup
    const popup = document.createElement('div');
    popup.className = 'delete-popup';
    popup.innerHTML = `
        <span>O item foi removido da lista</span>
        <button class="close-popup">×</button>
    `;
    
    // Adiciona o popup ao body
    document.body.appendChild(popup);
    
    // Event listener para fechar o popup
    popup.querySelector('.close-popup').addEventListener('click', () => {
        popup.remove();
    });
    
    // Remove o popup automaticamente após 3 segundos
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 3000);
}

// Event listener para capturar cliques nos botões de delete
ul.addEventListener('click', (event) => {
    // Verifica se o clique foi em um botão de delete ou na imagem dentro dele
    if (event.target.closest('.delete-btn')) {
        event.preventDefault(); // Previne o comportamento padrão do link
        
        // Encontra o li pai e remove ele
        const li = event.target.closest('li');
        li.remove();
        
        // Exibe o popup de confirmação
        showDeletePopup();
    }
});