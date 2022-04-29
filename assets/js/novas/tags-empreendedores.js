const enviaDadosBlog = (e) => {
  // e.preventDefault();
  // console.log(`${e.currentTarget.dataset.categoria}`);
  dataLayer.push({
    'event': 'Interaction',
    'EventCategory': 'm12-persona-empreendedor',
    'EventAction': 'blog-clique-botao',
    'EventLabel': `${e.currentTarget.dataset.categoria}`
  });
}

// BOTÕES BANNER 
const cardsBlog = document.querySelectorAll('.owl-blog .card');
cardsBlog.forEach(item => item.addEventListener('click', enviaDadosBlog));
// BOTÕES BANNER 