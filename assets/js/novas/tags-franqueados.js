const enviaDadosBlog = (e) => {
  // e.preventDefault();
  // console.log(`${e.currentTarget.dataset.categoria}`);
  dataLayer.push({
    'event': 'Interaction',
    'EventCategory': 'm12-persona-franqueado',
    'EventAction': 'blog-clique-botao',
    'EventLabel': `${e.currentTarget.dataset.categoria}`
  });
}

// setTimeout(function pegaBtnBanner() {
//   btnBanner = document.querySelector('.banner-franqueado .hs-button')
  
//   btnBanner.addEventListener('click', () => {
//     dataLayer.push({
//       'event': 'Interaction',
//       'EventCategory': 'm12-persona-franqueado',
//       'EventAction': 'banner-clique-botao',
//       'EventLabel': 'saiba-mais-sobre-franquia',
//       'TipoLead': 'prospect-franqueado'
//     });
//   })
// }, 1000);

const cardsBlog = document.querySelectorAll('.owl-blog .card');
cardsBlog.forEach(item => item.addEventListener('click', enviaDadosBlog));
