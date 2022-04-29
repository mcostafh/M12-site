const enviaDadosBlog = (e) => {
  dataLayer.push({
    'event': 'Interaction',
    'EventCategory': 'm12-persona-contador',
    'EventAction': 'blog-clique-botao',
    'EventLabel': `${e.currentTarget.dataset.categoria}`
  });
}

const cardsBlog = document.querySelectorAll('.owl-blog .card');
cardsBlog.forEach(item => item.addEventListener('click', enviaDadosBlog));