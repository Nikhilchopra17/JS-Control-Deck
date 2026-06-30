 const scene = document.getElementById('scene');
  const darkSky = document.getElementById('sky-dark');

  // add a handful of stars to the dark sky, simple random placement
  for (let i = 0; i < 25; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.top = Math.random() * 80 + '%';
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 2 + 's';
    darkSky.appendChild(star);
  }

  // add some grass blades, each one swaying a little differently
  const grassContainer = document.getElementById('grasses');
  for (let i = 0; i < 40; i++) {
    const blade = document.createElement('div');
    blade.className = 'blade';
    const height = 25 + Math.random() * 30;
    blade.style.left = Math.random() * 100 + '%';
    blade.style.height = height + 'px';
    blade.style.animationDelay = Math.random() * 2 + 's';
    blade.style.animationDuration = (1.6 + Math.random()) + 's';
    grassContainer.appendChild(blade);
  }

  const themes = {
    dark:   { bg: '#0a1520', tc: '#c5d8f0', label: 'Dark mode on' },
    warm:   { bg: '#fff8e1', tc: '#7a5000', label: 'Warm mode on' },
    nature: { bg: '#e0f7f4', tc: '#1b5e20', label: 'Nature mode on' },
  };

  function hideAll() {
    document.getElementById('sky-dark').style.opacity = 0;
    document.getElementById('sky-warm').style.opacity = 0;
    document.getElementById('sky-nature').style.opacity = 0;
    document.getElementById('moon').style.opacity = 0;
    document.getElementById('sun').style.opacity = 0;
    document.getElementById('flowers-layer').style.opacity = 0;
    document.getElementById('grasses').style.opacity = 0;
    document.getElementById('cloud1').style.opacity = 0;
    document.getElementById('cloud2').style.opacity = 0;
  }

  function applyTheme(name) {
    hideAll();
    const t = themes[name];

    scene.style.background = t.bg;
    document.getElementById('title').style.color = t.tc;
    document.getElementById('mainBtn').style.color = t.tc;
    document.getElementById('label').textContent = t.label;

    if (name === 'dark') {
      document.getElementById('sky-dark').style.opacity = 1;
      document.getElementById('moon').style.opacity = 1;
    } else if (name === 'warm') {
      document.getElementById('sky-warm').style.opacity = 1;
      document.getElementById('sun').style.opacity = 1;
      document.getElementById('flowers-layer').style.opacity = 1;
    } else if (name === 'nature') {
      document.getElementById('sky-nature').style.opacity = 1;
      document.getElementById('grasses').style.opacity = 1;
      document.getElementById('cloud1').style.opacity = 1;
      document.getElementById('cloud2').style.opacity = 1;
    }

    document.getElementById('opts').classList.remove('show');
    localStorage.setItem('theme', name);
  }

  function toggleOpts() {
    document.getElementById('opts').classList.toggle('show');
  }

  const saved = localStorage.getItem('theme');
  if (saved) applyTheme(saved);