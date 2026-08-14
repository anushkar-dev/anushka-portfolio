document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('nav-links');
    const header = document.getElementById('header');
    const topBtn = document.getElementById('top-btn');
    const typing = document.getElementById('typing');

    menuBtn.addEventListener('click', () => {
        const open = nav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', String(open));
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
    }));

    const words = ['Aspiring Software Engineer', 'CSE Student', 'Project Builder', 'Problem Solver'];
    let wordIndex = 0, charIndex = 0, deleting = false;
    function typeLoop(){
        const word = words[wordIndex];
        typing.textContent = word.slice(0, charIndex);
        if(!deleting){
            charIndex++;
            if(charIndex > word.length){ deleting = true; return setTimeout(typeLoop, 1200); }
        }else{
            charIndex--;
            if(charIndex < 0){ charIndex = 0; deleting = false; wordIndex = (wordIndex + 1) % words.length; }
        }
        setTimeout(typeLoop, deleting ? 45 : 75);
    }
    typeLoop();

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
    }, {threshold:.12});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    const sections = [...document.querySelectorAll('main section[id]')];
    const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    function onScroll(){
        header.classList.toggle('scrolled', window.scrollY > 20);
        topBtn.classList.toggle('show', window.scrollY > 500);
        let current = 'home';
        sections.forEach(section => { if(window.scrollY >= section.offsetTop - 180) current = section.id; });
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
    }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
    topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

    // Expected certificate/achievement files are pre-wired. Missing files stay visibly disabled until added.
    document.querySelectorAll('a[href$=".pdf"], img[src$=".jpg"]').forEach(el => {
        if(el.tagName === 'IMG'){
            el.addEventListener('error', () => {
                el.parentElement.classList.add('missing-image');
                el.removeAttribute('src');
                el.alt = 'Add the matching activity photo here';
            });
        }else{
            el.addEventListener('click', event => {
                // Do not block the browser; paths are intentionally ready for the user's files.
            });
        }
    });
});
