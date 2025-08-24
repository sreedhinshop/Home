<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Modern Engaging — Demo</title>
  <meta name="description" content="Stylish, modern one-page site with hero, features, product cards and animated demo area." />

  <!-- Tailwind CDN for quick prototyping -->
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Custom theme tweaks */
    :root{
      --accent:#7c5cff;
      --muted:#98a0b3;
      --glass: rgba(255,255,255,0.06);
    }
    body{background: linear-gradient(180deg,#0f1220 0%, #0b0d13 100%); color:#e6e9f2}

    /* Floating hero image */
    .float-slow{ animation: float 6s ease-in-out infinite; }
    @keyframes float{ 0%{ transform: translateY(0) } 50%{ transform: translateY(-12px) } 100%{ transform: translateY(0) } }

    /* Fancy card hover */
    .card-hover{ transition: transform .35s ease, box-shadow .35s ease; }
    .card-hover:hover{ transform: translateY(-12px) scale(1.02); box-shadow: 0 30px 80px rgba(13,10,30,.6); }

    /* Subtle glass background */
    .glass { background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.015)); border: 1px solid rgba(255,255,255,0.04); backdrop-filter: blur(6px); }

    /* Animated cat placeholder (replace with your image) */
    .cat-wrap{ width:320px; height:220px; display:grid; place-items:center; }
    .cat-img{ width:260px; transition:transform .3s ease; }
    .tail { transform-origin: 85% 60%; animation: tail-wag 0.9s ease-in-out infinite; }
    @keyframes tail-wag{ 0%{ transform: rotate(0deg) } 50%{ transform: rotate(18deg) } 100%{ transform: rotate(0deg) } }
    .eyes { transform-origin:center; animation: blink 4s infinite; }
    @keyframes blink{ 0%,20%,60%,100%{ transform: scaleY(1) } 10%,70%{ transform: scaleY(0.05) } }
    .mouth { transform-origin:center; animation: meow 2.2s infinite; }
    @keyframes meow{ 0%,60%,100%{ transform: scaleY(1) } 30%{ transform: scaleY(0.6) } }

    /* Responsive tweaks */
    @media (max-width: 768px){ .cat-wrap{ width:240px; height:180px } }
  </style>
</head>
<body class="antialiased">
  <header class="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
    <a class="text-xl font-extrabold tracking-tight flex items-center gap-3" href="#">
      <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-500 flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18" /></svg></div>
      <span class="text-2xl">Annamalai<span class="text-indigo-300">•</span> Studio</span>
    </a>
    <nav class="hidden md:flex gap-6 items-center text-sm text-slate-300">
      <a href="#features" class="hover:text-white">Features</a>
      <a href="#products" class="hover:text-white">Products</a>
      <a href="#demo" class="hover:text-white">Demo</a>
      <a href="#contact" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-md text-white shadow-lg">Get Started</a>
    </nav>
    <button class="md:hidden p-2 rounded-md bg-white/5">Menu</button>
  </header>

  <main class="max-w-6xl mx-auto px-6">
    <!-- HERO -->
    <section class="grid md:grid-cols-2 gap-10 items-center py-12">
      <div>
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">Modern, stylish animated assets for your website</h1>
        <p class="mt-4 text-slate-300 max-w-xl">Create delightful micro-interactions and animated hero art that bring personality to sites — lightweight, easy to integrate HTML/CSS packs ready for instant download.</p>
        <div class="mt-6 flex gap-4">
          <a href="#products" class="px-5 py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-500 shadow hover:opacity-95">Browse Packs</a>
          <a href="#demo" class="px-5 py-3 rounded-md border border-white/6 glass">Live Demo</a>
        </div>

        <div class="mt-8 grid grid-cols-3 gap-3 max-w-sm">
          <div class="glass p-3 rounded-xl text-center">
            <div class="text-2xl font-bold">120+</div>
            <div class="text-xs text-slate-400">Happy buyers</div>
          </div>
          <div class="glass p-3 rounded-xl text-center">
            <div class="text-2xl font-bold">30+</div>
            <div class="text-xs text-slate-400">Animated packs</div>
          </div>
          <div class="glass p-3 rounded-xl text-center">
            <div class="text-2xl font-bold">4.9★</div>
            <div class="text-xs text-slate-400">Avg. rating</div>
          </div>
        </div>
      </div>

      <div class="relative">
        <div class="glass rounded-3xl p-6 shadow-lg">
          <div class="flex items-center gap-4">
            <div class="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            <div class="text-xs text-slate-300">Live preview</div>
          </div>

          <div class="mt-6 flex items-center justify-center">
            <!-- Placeholder hero art: replace src with your image or inline SVG -->
            <div class="float-slow">
              <img src="https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=abc" alt="hero" class="rounded-xl shadow-2xl w-96 h-64 object-cover">
            </div>
          </div>
        </div>

        <!-- small testimonial card */ -->
        <div class="absolute -bottom-6 left-8 glass p-4 rounded-xl w-64 card-hover">
          <div class="text-sm text-slate-300">"Bought a hero pack — integration took 2 minutes. Beautiful!"</div>
          <div class="mt-3 text-xs text-slate-400">— Priya, Designer</div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section id="features" class="py-12">
      <div class="grid md:grid-cols-3 gap-6">
        <div class="glass rounded-2xl p-6 card-hover">
          <h3 class="font-semibold">Lightweight & Fast</h3>
          <p class="text-slate-300 text-sm mt-2">Animations use only CSS transforms and opacity for smooth GPU-accelerated motion.</p>
        </div>
        <div class="glass rounded-2xl p-6 card-hover">
          <h3 class="font-semibold">Easy Integration</h3>
          <p class="text-slate-300 text-sm mt-2">Drop-in HTML/CSS files. No build step required. Works in all modern browsers.</p>
        </div>
        <div class="glass rounded-2xl p-6 card-hover">
          <h3 class="font-semibold">Customizable</h3>
          <p class="text-slate-300 text-sm mt-2">Change duration, delays, or colors with a few lines of CSS to match your brand.</p>
        </div>
      </div>
    </section>

    <!-- PRODUCTS -->
    <section id="products" class="py-12">
      <h2 class="text-2xl font-bold">Featured Packs</h2>
      <div class="mt-6 grid md:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <article class="glass rounded-2xl p-6 card-hover">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-semibold">Hero Motion Pack</h4>
              <p class="text-slate-400 text-sm">Animated hero banners & parallax assets</p>
            </div>
            <div class="text-indigo-300 font-bold">$12</div>
          </div>
          <div class="mt-4">
            <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=def" class="rounded-lg w-full h-40 object-cover shadow-sm" alt="pack">
          </div>
          <div class="mt-4 flex gap-2">
            <button class="px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 rounded text-white">Preview</button>
            <button class="px-3 py-2 border border-white/8 rounded">Buy</button>
          </div>
        </article>

        <!-- Card 2 -->
        <article class="glass rounded-2xl p-6 card-hover">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-semibold">Micro-Interaction Kit</h4>
              <p class="text-slate-400 text-sm">Buttons, loaders, and UI feedback animations</p>
            </div>
            <div class="text-indigo-300 font-bold">$8</div>
          </div>
          <div class="mt-4">
            <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=ghi" class="rounded-lg w-full h-40 object-cover shadow-sm" alt="pack">
          </div>
          <div class="mt-4 flex gap-2">
            <button class="px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 rounded text-white">Preview</button>
            <button class="px-3 py-2 border border-white/8 rounded">Buy</button>
          </div>
        </article>

        <!-- Card 3 -->
        <article class="glass rounded-2xl p-6 card-hover">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-semibold">Animated Mascots</h4>
              <p class="text-slate-400 text-sm">Character packs with looped animations</p>
            </div>
            <div class="text-indigo-300 font-bold">$15</div>
          </div>
          <div class="mt-4">
            <img src="https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=jkl" class="rounded-lg w-full h-40 object-cover shadow-sm" alt="pack">
          </div>
          <div class="mt-4 flex gap-2">
            <button class="px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 rounded text-white">Preview</button>
            <button class="px-3 py-2 border border-white/8 rounded">Buy</button>
          </div>
        </article>
      </div>
    </section>

    <!-- DEMO: Animated Cat -->
    <section id="demo" class="py-12">
      <h2 class="text-2xl font-bold">Animated Demo — Replace with your cat image</h2>
      <p class="text-slate-400 mt-2">Drop your layered images (or an SVG with separate parts). Below shows how to hook a single image and animate parts via simple classes.</p>

      <div class="mt-6 grid md:grid-cols-2 gap-6 items-center">
        <div class="glass rounded-2xl p-6">
          <h3 class="font-semibold">How to use</h3>
          <ol class="text-slate-300 mt-3 space-y-2 text-sm">
            <li>Open the ZIP and copy `index.html` + `style.css` into your project.</li>
            <li>Replace the placeholder images with your `body.png`, `tail.png`, `eyes.png`, `mouth.png` (positioned over one another).</li>
            <li>Adjust animation speeds in CSS variables at the top of the file.</li>
            <li>Export a short video preview for Etsy (5–12s) and upload to the listing.</li>
          </ol>
        </div>

        <div class="glass rounded-2xl p-6 flex justify-center">
          <!-- layered demo: single image with pseudo parts (for demo only) -->
          <div class="cat-wrap">
            <!-- Replace the image src with your own. For multiple layers, use separate <img> tags positioned absolutely. -->
            <img src="/assets/your-cat-body.png" alt="cat body" class="cat-img rounded-lg shadow-lg">
            <!-- Optional overlay parts (tail, eyes, mouth) should have classes tail, eyes, mouth -->
            <!-- Example if you have separate PNGs: -->
            <!-- <img src="/assets/your-cat-tail.png" class="absolute tail" style="left:110px; top:40px; width:120px"> -->
            <!-- <img src="/assets/your-cat-eyes.png" class="absolute eyes" style="left:92px; top:58px; width:80px"> -->
          </div>
        </div>
      </div>
    </section>

    <!-- CONTACT -->
    <section id="contact" class="py-12">
      <div class="glass rounded-2xl p-6">
        <h3 class="font-semibold">Work with us</h3>
        <p class="text-slate-300 text-sm mt-2">Want custom animations or an Etsy-ready pack? Drop your details below and we’ll send a quote.</p>
        <form class="mt-4 grid md:grid-cols-3 gap-3">
          <input class="p-3 bg-transparent border border-white/6 rounded" placeholder="Your name">
          <input class="p-3 bg-transparent border border-white/6 rounded" placeholder="Email">
          <input class="p-3 bg-transparent border border-white/6 rounded md:col-span-3" placeholder="Message">
          <button class="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-500 rounded text-white md:col-span-3">Send</button>
        </form>
      </div>
    </section>

  </main>

  <footer class="max-w-6xl mx-auto px-6 py-8 text-slate-400 text-sm">
    <div class="flex items-center justify-between">
      <div>© Annamalai Studio • 2025</div>
      <div>Made with ❤️ • <a href="#" class="text-indigo-300">Terms</a> • <a href="#" class="text-indigo-300">License</a></div>
    </div>
  </footer>

  <script>
    // Small helper: demo "Preview" buttons open a modal preview (basic)
    document.querySelectorAll('button').forEach(btn=>{
      if(btn.textContent.trim()==='Preview') btn.addEventListener('click', ()=>{ alert('Preview: open a local preview or customize the demo section.'); })
    })
  </script>
</body>
</html>
