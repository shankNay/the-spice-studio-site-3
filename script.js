const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle?.setAttribute('aria-expanded','false');}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const dateInputs=document.querySelectorAll('input[type="date"]');
const today=new Date();const localToday=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
dateInputs.forEach(i=>i.min=localToday);
const whatsappNumber='918904893793';
const formTitles={event:'EVENT QUOTE REQUEST',reservation:'TABLE RESERVATION REQUEST',contact:'GENERAL ENQUIRY'};
const fieldLabels={name:'Name',phone:'Mobile Number',email:'Email',event_type:'Event Type',guest_count:'Estimated Guest Count',preferred_date:'Preferred Date',guests:'Number of Guests',date:'Preferred Date',time:'Preferred Time',message:'Message'};
document.querySelectorAll('form[data-form]').forEach(form=>form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const data=Object.fromEntries(new FormData(form).entries());
  const kind=form.dataset.form;
  const lines=[`THE SPICE STUDIO — ${formTitles[kind]||'WEBSITE ENQUIRY'}`,''];
  Object.entries(data).forEach(([key,value])=>{if(value)lines.push(`${fieldLabels[key]||key}: ${value}`);});
  lines.push('','Sent from The Spice Studio website.');
  const url=`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
  const opened=window.open(url,'_blank','noopener,noreferrer');
  const status=form.querySelector('.form-status');
  if(opened){status.textContent='Your enquiry is ready in WhatsApp. Please press Send in WhatsApp to deliver it to our team.';}
  else{status.textContent='Your browser blocked the WhatsApp window. Please allow pop-ups and submit again, or use the WhatsApp Enquiry button.';}
}));
