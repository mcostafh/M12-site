"use strict";var dropsDesk,menuMobile,funcDrop,animaScroll,animaNumeros,handleMutation,observerTarget,observer,primeiroNome,inputNameExpMenu,inputEmailExpMenu,inputPhoneExpMenu,inputCnpjExpMenu,valorCnpj,nomeTrialMenuText,emailTrialMenuText,phoneTrialMenuText,listaTreinos,urlJson,tela=window.innerWidth;tela<=1024?(document.querySelector("nav.navbar-expand-lg")&&(document.querySelector("nav.navbar-expand-lg").remove(),(dropsDesk=document.querySelectorAll(".dropwdown-menu-desktop")).forEach(function(e){return e.remove()})),(menuMobile=function(){var e=document.querySelector(".menu-hamburguer"),n=document.querySelector(".filtros.mobile"),t=document.querySelectorAll(".filtros .dropdown-toggle"),o=document.querySelectorAll(".sub-menu"),r=document.querySelectorAll(".fecha-sub");e.onclick=function(){e.classList.toggle("ativo"),n.classList.toggle("ativo")},t.forEach(function(e,n){e.addEventListener("click",function(){return o[n].classList.toggle("menu-ativo")}),r[n].addEventListener("click",function(){return o[n].classList.remove("menu-ativo")})});function a(){e.classList.remove("ativo"),n.classList.remove("ativo")}t=[];t.push(document.querySelector("header.banner")),t.push(document.querySelector(".main-content")),t.forEach(function(e){return e.addEventListener("click",a)})})()):document.querySelector("section.nav-mobile")&&(document.querySelector("section.nav-mobile").remove(),document.querySelector("footer .footer-mob").remove(),(funcDrop=function(){function t(){o.forEach(function(e){return e.classList.remove("ativo")}),e.forEach(function(e){return e.classList.remove("ativo")})}var e=document.querySelectorAll(".navbar .dropdown"),n=document.querySelectorAll(".navbar .nav-item"),o=document.querySelectorAll(".dropwdown-menu-desktop");n.forEach(function(e){return e.addEventListener("mouseover",t)}),o.forEach(function(e){return e.addEventListener("mouseleave",t)}),e.forEach(function(e,n){e.addEventListener("mouseover",function(){o[n].classList.contains("ativo")?t():(t(),o[n].className+=" ativo",e.className+=" ativo")})})})()),tela<=770&&document.querySelector("footer .footer-desk")&&document.querySelector("footer .footer-desk").remove(),document.querySelector(".somos-mais")&&(animaScroll=function(){var e=document.querySelectorAll(".somos-mais"),n=.6*window.innerHeight;e.forEach(function(e){e.getBoundingClientRect().top-n<0&&e.classList.add("visivel")})},animaNumeros=function(){document.querySelectorAll(".num-contador").forEach(function(e){var n=+e.innerText,t=0,o=setInterval(function(){t++,e.innerText=t,n<t&&(e.innerText=n,clearInterval(o))},30)})},handleMutation=function(e){e[0].target.classList.contains("visivel")&&(observer.disconnect(),animaNumeros())},observerTarget=document.querySelector(".somos-mais"),(observer=new MutationObserver(handleMutation)).observe(observerTarget,{attributes:!0}),window.addEventListener("scroll",animaScroll),animaScroll()),$(".owl-blog").owlCarousel({loop:!1,margin:10,nav:!0,dots:!1,responsive:{0:{items:1,center:!0},1e3:{items:2}}}),document.addEventListener("touchstart",function(e){console.log(e.defaultPrevented),e.preventDefault(),console.log(e.defaultPrevented)},!!Modernizr.passiveeventlisteners&&{passive:!0}),setTimeout(function(){var e=document.querySelectorAll('.hbspt-form [name="email"]'),n=document.querySelectorAll('.hbspt-form [name="telefone"]');document.querySelectorAll('.hbspt-form [name="firstname"]').forEach(function(e){e.addEventListener("input",function(){localStorage.setItem("firstname",e.value)})}),e.forEach(function(e){e.addEventListener("input",function(){localStorage.setItem("tbEmail",e.value)})}),n.forEach(function(e){e.addEventListener("input",function(){localStorage.setItem("tbPhone",e.value)})})},1e3),document.querySelector(".banner.interno span.firstname")&&(document.querySelector(".banner.interno span.firstname").innerText=localStorage.getItem("firstname"),document.querySelector(".banner.interno span.email").innerText=localStorage.getItem("tbEmail"),document.querySelector(".banner.interno span.phone").innerText=localStorage.getItem("tbPhone"),primeiroNome=(primeiroNome=localStorage.getItem("firstname")).split(" "),document.querySelector(".banner.interno span.primeiro-nome").innerText=primeiroNome[0]),document.querySelector("#modal-menu-experimente")&&(inputNameExpMenu=document.querySelector('#modal-menu-experimente [name="nickname"]'),inputEmailExpMenu=document.querySelector('#modal-menu-experimente [name="user_email"]'),inputPhoneExpMenu=document.querySelector('#modal-menu-experimente [name="phone"]'),inputCnpjExpMenu=document.querySelector('#modal-menu-experimente [name="company_document"]'),valorCnpj="",$("#wp-submit").attr("disabled","disabled"),$("#wp-submit").css("backgroundColor","#dedede"),$("#wp-submit").css("border","1px solid #bebebe"),$("#wp-submit").css("cursor","default"),inputCnpjExpMenu.addEventListener("input",function(){13<(valorCnpj=inputCnpjExpMenu.value).length&&($("#wp-submit").removeAttr("disabled"),$("#wp-submit").css("backgroundColor","#d8fe00"),$("#wp-submit").css("border","1px solid #d8fe00"),$("#wp-submit").css("cursor","pointer"),$("#feedback").css("display","none"))}),(nomeTrialMenuText=document.querySelector("#modal-menu-experimente span.trial-menu-name")).innerText=localStorage.getItem("tbNomeTrialMenu"),(emailTrialMenuText=document.querySelector("#modal-menu-experimente span.trial-menu-email")).innerText=localStorage.getItem("tbEmailTrialMenu"),(phoneTrialMenuText=document.querySelector("#modal-menu-experimente span.trial-menu-phone")).innerText=localStorage.getItem("tbPhoneTrialMenu"),inputNameExpMenu.addEventListener("input",function(){localStorage.setItem("tbNomeTrialMenu",inputNameExpMenu.value),nomeTrialMenuText.innerText=localStorage.getItem("tbNomeTrialMenu")}),inputEmailExpMenu.addEventListener("input",function(){localStorage.setItem("tbEmailTrialMenu",inputEmailExpMenu.value),emailTrialMenuText.innerText=localStorage.getItem("tbEmailTrialMenu")}),inputPhoneExpMenu.addEventListener("input",function(){localStorage.setItem("tbPhoneTrialMenu",inputPhoneExpMenu.value),phoneTrialMenuText.innerText=localStorage.getItem("tbPhoneTrialMenu")})),document.querySelector(".lista-treinos")&&(listaTreinos=document.querySelector(".lista-treinos"),fetch(urlJson="https://app.m12.com.br/partners/m12/rooms/").then(function(e){return e.json()}).then(function(e){e.forEach(function(e){var n=new Date(e.start_at),t=["Domingo","Segunda-Feira","Terça-Feira","Quarta-Feira","Quinta-Feira","Sexta-Feira","Sábado"],o=e.start_at,r=(o=o.split("T"))[0].split("-"),o=(o=o[1].split("-"))[0].split(":");console.log(Array.isArray(e.tags)),Array.isArray(e.tags)?listaTreinos.innerHTML+='\n          <div class="card-treino '+e.tags[0]+'">\n            <div className="content">\n              <h3>'+e.room_name+' <span class="'+e.tags[0]+'">'+e.tags[0]+'</span></h3>\n              <h4 class="mb-0 mt-1">Data <strong class="me-2">'+r[2]+"/"+r[1]+"/"+r[0]+" "+t[n.getDay()]+'</strong>  | <span class="ms-2"></span> Horário <strong>'+o[0]+":"+o[1]+'</strong></h4>\n            </div>\n            <form action="https://app.m12.com.br/my-apps/" target="_top" method="post">\n              <input type="hidden" name="cm_action" value="subscribe" />\n              <input type="hidden" name="cm_room_id" value="'+e.room_id+'" />\n              <button type="submit" class="hidden-print w-button">PARTICIPAR</button>\n            </form>\n          </div>\n        ':listaTreinos.innerHTML+='\n        <div class="card-treino">\n          <div className="content">\n            <h3>'+e.room_name+' </h3>\n            <h4 class="mb-0 mt-1">Data <strong class="me-2">'+r[2]+"/"+r[1]+"/"+r[0]+" "+t[n.getDay()]+'</strong>  | <span class="ms-2"></span> Horário <strong>'+o[0]+":"+o[1]+'</strong></h4>\n          </div>\n          <form action="https://app.m12.com.br/my-apps/" target="_top" method="post">\n            <input type="hidden" name="cm_action" value="subscribe" />\n            <input type="hidden" name="cm_room_id" value="'+e.room_id+'" />\n            <button type="submit" class="hidden-print w-button">PARTICIPAR</button>\n          </form>\n        </div>\n      '})}));