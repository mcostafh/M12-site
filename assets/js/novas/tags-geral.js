// TAGUEAMENTO MODAL EXPERIMENTE MENU 
  if(document.querySelector('#modal-menu-experimente .green-cta')){
    const ctaTrial = document.querySelector('#modal-menu-experimente .green-cta');
    
    const enviaDadosTrial = (e) => {
      dataLayer.push({
        'event': 'Interaction',
        'EventCategory': 'm12-lead',
        'EventAction': 'prospect-trial-clique-botao',
        'EventLabel': 'enviar-formulario',
        'TipoLead':'prospect-trial-form'
      });
    }
    
    ctaTrial.addEventListener('click', enviaDadosTrial);
  }
// TAGUEAMENTO MODAL EXPERIMENTE MENU  

// TAGUEAMENTO MODAL EXPERIMENTE 
  // if(document.querySelector('#modal-experimente .green-cta')){
  //   const ctaTrialExperimente = document.querySelector('#modal-experimente #wp-submit');
    
  //   const enviaDadosTrialExperimente = (e) => {
  //     dataLayer.push({
  //       'event': 'Interaction', 
  //       'EventCategory': 
  //       'm12-lead-sucesso', 
  //       'EventAction': 'lead-fit-envio-sucesso',
  //       'TipoLead':'lead-fit'
  //     });
  //   }
    
  //   ctaTrialExperimente.addEventListener('click', enviaDadosTrialExperimente);
  // }
// TAGUEAMENTO MODAL EXPERIMENTE  

const disparoTagComercial = (e) => {
  // console.log(`${e.currentTarget.dataset.category}`);
  // console.log(`${e.currentTarget.dataset.eventaction}`);
  // console.log(`${e.currentTarget.dataset.eventlabel}`);
  // console.log(`${e.currentTarget.dataset.lead}`);
  dataLayer.push({
    'event': 'Interaction', 
    'EventCategory': `${e.currentTarget.dataset.category}`, 
    'EventAction': `${e.currentTarget.dataset.eventaction}`, 
    'EventLabel': `${e.currentTarget.dataset.eventlabel}`,
    'TipoLead': `${e.currentTarget.dataset.lead}`
  });    
}

const disparoTagInteracao = (e) => {
  dataLayer.push({
    'event': 'Interaction', 
    'EventCategory': `${e.currentTarget.dataset.category}`, 
    'EventAction': `${e.currentTarget.dataset.eventaction}`, 
    'EventLabel': `${e.currentTarget.dataset.eventlabel}`,
  });
}

const ctaInteracao = document.querySelectorAll('.btn-interacao-tag');
ctaInteracao.forEach(item => item.addEventListener('click', disparoTagInteracao));

const ctaComercial = document.querySelectorAll('.btn-comercial-tag');
ctaComercial.forEach(item => item.addEventListener('click', disparoTagComercial));

// TAGUEAMENTO FORMS COMERCIAL 
  setTimeout(function inputHbComercial(){
    function enviaDadosHubComercial(e){
      // alert('aqui');
      dataLayer.push({
        'event': 'Interaction',
        'EventCategory': 'm12-lead',
        'EventAction': 'prospect-comercial-clique-botao',
        'EventLabel': 'enviar-formulario',
        'TipoLead': 'prospect-comercial-form' 
      });
    }

    btnHubComercial = document.querySelectorAll('#modal-comercial .hs-button');
    btnHubComercialMenu = document.querySelectorAll('#modal-menu-comercial .hs-button');

    btnHubComercial.forEach(item => item.addEventListener('click', enviaDadosHubComercial));
    btnHubComercialMenu.forEach(item => item.addEventListener('click', enviaDadosHubComercial));
  }, 1000)
// TAGUEAMENTO FORMS COMERCIAL 

// TAGUEAMENTO FORMS CONTADORES 
  if(document.querySelectorAll('#modal-contador')){
    setTimeout(function inputHbContadores(){
      function enviaDadosHubContadores(e){
        dataLayer.push({
          'event': 'Interaction',
          'EventCategory': 'm12-lead',
          'EventAction': 'prospect-contador-clique-botao',
          'EventLabel': 'enviar-formulario',
          'TipoLead': 'prospect-contador-form'
        });
      }

      btnHubContadores = document.querySelectorAll('#modal-contador .hs-button');
      btnHubContadores.forEach(item => item.addEventListener('click', enviaDadosHubContadores));
    }, 1000)
  }
// TAGUEAMENTO FORMS CONTADORES 

// TAGUEAMENTO FORMS FRANQUEADOS 
if(document.querySelectorAll('.form-banner')){
  setTimeout(function inputHbFranqueado(){
    function enviaDadosHubFranqueado(e){
      dataLayer.push({
        'event': 'Interaction',
        'EventCategory': 'm12-lead', 
        'EventAction': 'prospect-franqueado-clique-botao', 
        'EventLabel': 'enviar-formulario',
        'TipoLead':'prospect-franqueado-form'
      });      
    }

    btnHubFranqueados = document.querySelectorAll('.form-banner .hs-button');
    btnHubFranqueados.forEach(item => item.addEventListener('click', enviaDadosHubFranqueado));
  }, 1000)
}
// TAGUEAMENTO FORMS FRANQUEADOS 

// TAGUEAMENTO FORMS FIT
  if(document.querySelectorAll('#exampleModal-m12Fit')) {
    setTimeout(function inputHbFit(){
      function enviaDadosHubFit(e){
        dataLayer.push({
          'event': 'Interaction', 
          'EventCategory': 'm12-lead', 
          'EventAction': 'prospect-fit-clique-botao', 
          'EventLabel': 'enviar-formulario',
          'TipoLead': 'prospect-fit-form'
        });
      }

      btnHubFit = document.querySelectorAll('#exampleModal-m12Fit #btnSubmitm12Fit');
      btnHubFit.forEach(item => item.addEventListener('click', enviaDadosHubFit));
    }, 1000)
  }
// TAGUEAMENTO FORMS FIT

// EVENTO AO APARECER MODAL 
  const enviaDadosModal = (e) => {
    dataLayer.push({
      'event': 'Interaction',
      'EventCategory': 'm12-lead',
      'EventAction': 'prospect-comercial-apresentou-form',
      'TipoLead': 'prospect-comercial-form'
    });
    // alert('aqui');
  }

  const handleMutationModal = (mutation) => {
    if (mutation[0].target.classList.contains('show')) {
      observarModal.disconnect();
      enviaDadosModal();
    }
  }

  const observarTargetModal = document.querySelectorAll('[data-modal="comercial"]');
  const observarModal = new MutationObserver(handleMutationModal);
  observarTargetModal.forEach(item => {
    observarModal.observe(item, { attributes: true });
  })
// EVENTO AO APARECER MODAL 


// EVENTO ACCORDION FAQ
  if(document.querySelectorAll('.sec-faq.sec-faq-tags .accordion-button')) {
    const disparaTagsFaq = (e) => {
      // e.preventDefault();
      console.log(`${e.dataset.category}`);
      console.log(`${e.dataset.eventaction}`);
      console.log(`${e.dataset.eventlabel}`);
      dataLayer.push({
        'event': 'Interaction', 
        'EventCategory': `${e.dataset.category}`, 
        'EventAction': `${e.dataset.eventaction}`, 
        'EventLabel': `${e.dataset.eventlabel}`,
      });
    }


    const btnsAccordion = document.querySelectorAll('.sec-faq .accordion-button');
    btnsAccordion.forEach((item) => {
      item.addEventListener('click', () => {
        if(!item.classList.contains('collapsed'))
          disparaTagsFaq(item);

      })
    })
  }
// EVENTO ACCORDION FAQ