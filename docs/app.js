/*
  app.js
  Interactive Digital Book - FIGG
  Premium Glassmorphic SPA Logic
*/

// Global App State
const state = {
  chapters: [],
  currentChapter: null,
  fontSize: 'md', // sm, md, lg
  theme: 'light', // light, dark
  bookmarks: [],
  readingProgress: {}, // chapterId -> percentage
  searchQuery: '',
  audioPlayer: null,
  videoPlayer: null
};

// DOM Elements
const elements = {
  loadingOverlay: document.getElementById('loading-overlay'),
  navList: document.getElementById('nav-list'),
  sidebar: document.getElementById('sidebar'),
  menuToggleBtn: document.getElementById('menu-toggle-btn'),
  closeSidebarBtn: document.getElementById('close-sidebar-btn'),
  sidebarOverlay: document.getElementById('sidebar-overlay'),
  
  // Topbar search & controls
  searchInput: document.getElementById('search-input'),
  searchClearBtn: document.getElementById('search-clear-btn'),
  searchResultsPanel: document.getElementById('search-results-panel'),
  searchResultsList: document.getElementById('search-results-list'),
  searchResultsTitle: document.getElementById('search-results-title'),
  
  bookmarksToggleBtn: document.getElementById('bookmarks-toggle-btn'),
  bookmarksCount: document.getElementById('bookmarks-count'),
  bookmarksPanel: document.getElementById('bookmarks-panel'),
  bookmarksList: document.getElementById('bookmarks-list'),
  clearAllBookmarks: document.getElementById('clear-all-bookmarks'),
  
  fontsizeToggleBtn: document.getElementById('fontsize-toggle-btn'),
  fontsizeMenu: document.getElementById('fontsize-menu'),
  themeToggleBtn: document.getElementById('theme-toggle-btn'),
  
  // Reader elements
  readerWrapper: document.getElementById('reader-wrapper'),
  readerArticle: document.getElementById('reader-article'),
  readerBody: document.getElementById('reader-body'),
  readingProgressBar: document.getElementById('reading-progress-bar'),
  bookmarkActionBtn: document.getElementById('bookmark-action-btn'),
  bookmarkBtnText: document.getElementById('bookmark-btn-text'),
  
  // Media slots
  mediaSection: document.getElementById('media-section'),
  mediaPlayersGrid: document.getElementById('media-players-grid'),
  
  // Pagination
  prevChapterBtn: document.getElementById('prev-chapter-btn'),
  prevChapterTitle: document.getElementById('prev-chapter-title'),
  nextChapterBtn: document.getElementById('next-chapter-btn'),
  nextChapterTitle: document.getElementById('next-chapter-title'),
  
  // Lightbox
  lightbox: document.getElementById('infographic-lightbox'),
  lightboxImg: document.getElementById('lightbox-img'),
  lightboxClose: document.getElementById('lightbox-close'),
  zoomInBtn: document.getElementById('zoom-in-btn'),
  zoomOutBtn: document.getElementById('zoom-out-btn'),
  zoomResetBtn: document.getElementById('zoom-reset-btn')
};

// Initialize Application
window.addEventListener('DOMContentLoaded', async () => {
  initTheme();
  initFontSize();
  loadBookmarks();
  loadReadingProgress();
  
  try {
    await fetchChapters();
    setupNavigation();
    setupEventListeners();
    
    // Hide Loader
    fadeOut(elements.loadingOverlay);
    
    // Deep Link Navigation
    handleInitialRoute();
  } catch (error) {
    console.error("Error loading interactive book data:", error);
    elements.loadingOverlay.querySelector('.loading-text').textContent = "שגיאה בטעינת הנתונים. אנא נסה שוב.";
  }
});

// --- Theme Management ---
function initTheme() {
  const savedTheme = localStorage.getItem('figg-theme') || 'light';
  setTheme(savedTheme);
}

function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('figg-theme', theme);
  
  const sunIcon = elements.themeToggleBtn.querySelector('.theme-icon-sun');
  const moonIcon = elements.themeToggleBtn.querySelector('.theme-icon-moon');
  
  if (theme === 'dark') {
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

// --- Font Size Management ---
function initFontSize() {
  const savedSize = localStorage.getItem('figg-fontsize') || 'md';
  setFontSize(savedSize);
}

function setFontSize(size) {
  state.fontSize = size;
  
  // Update UI active class
  document.querySelectorAll('.fontsize-option').forEach(opt => {
    if (opt.getAttribute('data-size') === size) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });
  
  // Set reader class
  elements.readerArticle.className = `reader-article font-${size}`;
  localStorage.setItem('figg-fontsize', size);
}

// --- Data Fetching & Rendering ---
async function fetchChapters() {
  if (typeof chaptersData !== 'undefined') {
    state.chapters = chaptersData;
    return;
  }
  const response = await fetch('data/chapters.json');
  if (!response.ok) {
    throw new Error('Failed to fetch chapters.json');
  }
  state.chapters = await response.json();
}

function setupNavigation() {
  elements.navList.innerHTML = '';
  
  state.chapters.forEach(ch => {
    const li = document.createElement('li');
    li.className = 'nav-item';
    li.id = `nav-item-${ch.id}`;
    
    // Determine the icon or badge for special pages
    const icon = ch.is_home ? '🏠' : (ch.is_glossary ? '📚' : (ch.id === 'key_articles' ? '📖' : ''));
    
    let cleanTitle = ch.title;
    if (ch.is_home) {
      cleanTitle = 'דף הבית';
    } else if (ch.id === 'key_articles') {
      cleanTitle = 'נספח מקורות והרחבה';
    } else if (ch.id === 'glossary') {
      cleanTitle = 'מושגי יסוד';
    }
    
    li.innerHTML = `
      <a class="nav-link" data-id="${ch.id}">
        <span class="nav-link-title">
          ${icon ? `<span class="nav-link-num" style="margin-left: 8px; font-size: 1.1rem; display: inline-block;">${icon}</span>` : ''}
          <span>${cleanTitle}</span>
        </span>
      </a>
    `;
    
    li.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      navigateToChapter(ch.id);
    });
    
    elements.navList.appendChild(li);
  });
}

function handleInitialRoute() {
  const hash = window.location.hash.substring(1);
  const chapterExists = state.chapters.find(c => c.id === hash);
  
  if (chapterExists) {
    loadChapter(hash);
  } else {
    // Default to the new homepage dashboard
    loadChapter('home');
  }
}

function navigateToChapter(chapterId) {
  window.location.hash = chapterId;
  // If hash is same, hashchange won't fire, load manually
  if (state.currentChapter && state.currentChapter.id === chapterId) {
    loadChapter(chapterId);
  }
}

function loadChapter(chapterId, scrollToHeadingId = null) {
  // Save current progress before switching
  saveCurrentProgress();
  
  const chapter = state.chapters.find(c => c.id === chapterId);
  if (!chapter) return;
  
  state.currentChapter = chapter;
  
  // Safety relocation: move mediaSection container back to body to prevent its destruction during innerHTML overwrite
  if (elements.mediaSection && elements.mediaSection.parentNode) {
    document.body.appendChild(elements.mediaSection);
    elements.mediaSection.style.display = 'none';
  }
  
  // Highlight sidebar active item
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.id === `nav-item-${chapterId}`) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
  
  // Render main body
  if (chapter.is_home) {
    renderHomePage();
  } else if (chapter.is_glossary) {
    renderGlossary();
  } else if (chapter.details_html && chapter.details_html.trim() !== '') {
    // Modular view: synopsis & objectives visible, deep dives collapsed separately
    let html = `<h1>${chapter.title}</h1>`;
    
    // Collapsible objectives details/summary
    if (chapter.objectives_html) {
      html += `
        <details class="objectives-details" style="background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 16px; padding: 16px 20px; margin-bottom: 24px; backdrop-filter: blur(10px);">
          <summary style="font-weight: 700; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: space-between; outline: none; list-style: none; user-select: none;">
            <span style="display: flex; align-items: center; gap: 10px; color: var(--primary-color);">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              מטרות הלמידה של הפרק
            </span>
            <svg class="chevron-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.2s ease;">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </summary>
          <div style="margin-top: 14px; line-height: 1.6; color: var(--text-muted);">
            ${chapter.objectives_html}
          </div>
        </details>
      `;
    }
    
    if (chapter.summary_html) {
      html += `
        <div class="summary-section-box" style="background: rgba(59, 130, 246, 0.07); border: 1px solid var(--border-color); border-radius: 16px; padding: 24px; margin: 28px 0; backdrop-filter: blur(10px);">
          <h3 style="margin-top: 0; color: var(--primary-color); display: flex; align-items: center; gap: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
              <line x1="4" y1="22" x2="4" y2="15"></line>
            </svg>
            תקציר
          </h3>
          ${chapter.summary_html}
        </div>
      `;
    }
    
    // Toggle buttons row (incorporating show media button)
    html += `
      <div class="modular-toggle-group" style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin: 32px 0;">
        <button class="modular-toggle-btn" id="modular-media-btn">
          <span>הצג סקירות מדיה</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <button class="modular-toggle-btn" id="modular-details-btn">
          <span>קרא את הפרק המלא</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        
        ${chapter.concept_box_html ? `
        <button class="modular-toggle-btn" id="modular-concepts-btn">
          <span>הצג מונחי הפרק</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        ` : ''}
        
        ${chapter.references_html ? `
        <button class="modular-toggle-btn" id="modular-references-btn">
          <span>הצג מקורות</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        ` : ''}
      </div>
    `;
    
    // Collapsible technical content sections
    html += `
      <!-- 0. Collapsible Media Container -->
      <div class="chapter-details-collapsible" id="chapter-media-container">
        <div id="media-placeholder-location"></div>
      </div>

      <!-- 1. Collapsible Core Details (with Intro embedded inside to keep summary clean) -->
      <div class="chapter-details-collapsible" id="chapter-details-container">
        ${chapter.intro_html ? `<div class="chapter-intro-embedded" style="margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px dashed var(--border-color);">${chapter.intro_html}</div>` : ''}
        ${chapter.details_html}
      </div>
      
      <!-- 2. Collapsible Concept Box -->
      ${chapter.concept_box_html ? `
      <div class="chapter-details-collapsible" id="chapter-concepts-container">
        <h2 class="sub-chapter-title" style="color: var(--primary-color); margin-top: 0; margin-bottom: 24px; border-bottom: 2px solid var(--border-color); padding-bottom: 8px; font-size: 1.5rem; font-weight: 700;">מושגי יסוד</h2>
        ${chapter.concept_box_html}
      </div>
      ` : ''}
      
      <!-- 3. Collapsible References -->
      ${chapter.references_html ? `
      <div class="chapter-details-collapsible" id="chapter-references-container">
        <h2 class="sub-chapter-title" style="color: var(--primary-color); margin-top: 0; margin-bottom: 24px; border-bottom: 2px solid var(--border-color); padding-bottom: 8px; font-size: 1.5rem; font-weight: 700;">מקורות</h2>
        ${chapter.references_html}
        
        <!-- Button pointing to the appendix for Further Reading -->
        ${chapter.original_chapter_number ? `
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px dashed var(--border-color);">
          <button class="nav-btn primary" onclick="navigateToFurtherReading(${chapter.original_chapter_number})" style="display: flex; align-items: center; gap: 8px; font-weight: 600; padding: 10px 16px; border-radius: 8px; border: none; background: var(--primary-color); color: white; cursor: pointer; font-family: inherit; font-size: 0.95rem; transition: background 0.2s;">
            <svg style="width: 18px; height: 18px;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
            מעבר לנספח מקורות להרחבה של פרק ${chapter.original_chapter_number}
          </button>
        </div>
        ` : ''}
      </div>
      ` : ''}
    `;
    
    elements.readerBody.innerHTML = html;
    
    // Perform safety relocation of media Section inside the collapsible wrapper
    const placeholder = document.getElementById('media-placeholder-location');
    if (placeholder && elements.mediaSection) {
      placeholder.appendChild(elements.mediaSection);
    }
    
    // Bind collapsible toggles
    const mediaBtn = document.getElementById('modular-media-btn');
    const mediaContainer = document.getElementById('chapter-media-container');

    const detailsBtn = document.getElementById('modular-details-btn');
    const detailsContainer = document.getElementById('chapter-details-container');
    
    const conceptsBtn = document.getElementById('modular-concepts-btn');
    const conceptsContainer = document.getElementById('chapter-concepts-container');
    
    const referencesBtn = document.getElementById('modular-references-btn');
    const referencesContainer = document.getElementById('chapter-references-container');
    
    if (mediaBtn && mediaContainer) {
      mediaBtn.addEventListener('click', () => {
        toggleCollapsibleSection(mediaBtn, mediaContainer, 'הצג סקירות מדיה', 'כווץ סקירות מדיה');
      });
    }

    if (detailsBtn && detailsContainer) {
      detailsBtn.addEventListener('click', () => {
        toggleCollapsibleSection(detailsBtn, detailsContainer, 'קרא את הפרק המלא', 'כווץ פרק מפורט');
      });
    }
    
    if (conceptsBtn && conceptsContainer) {
      conceptsBtn.addEventListener('click', () => {
        toggleCollapsibleSection(conceptsBtn, conceptsContainer, 'הצג מונחי הפרק', 'כווץ מילון מונחים');
      });
    }
    
    if (referencesBtn && referencesContainer) {
      referencesBtn.addEventListener('click', () => {
        toggleCollapsibleSection(referencesBtn, referencesContainer, 'הצג מקורות', 'כווץ מקורות');
      });
    }
    
    // Auto-expand targeted section during navigation/search
    if (scrollToHeadingId) {
      setTimeout(() => {
        const targetEl = document.getElementById(scrollToHeadingId);
        if (targetEl) {
          const parentCollapsible = targetEl.closest('.chapter-details-collapsible');
          if (parentCollapsible) {
            if (parentCollapsible.id === 'chapter-details-container' && detailsBtn) {
              toggleCollapsibleSection(detailsBtn, detailsContainer, '', '', true);
            } else if (parentCollapsible.id === 'chapter-concepts-container' && conceptsBtn) {
              toggleCollapsibleSection(conceptsBtn, conceptsContainer, '', '', true);
            } else if (parentCollapsible.id === 'chapter-references-container' && referencesBtn) {
              toggleCollapsibleSection(referencesBtn, referencesContainer, '', '', true);
            } else if (parentCollapsible.id === 'chapter-media-container' && mediaBtn) {
              toggleCollapsibleSection(mediaBtn, mediaContainer, '', '', true);
            }
          }
        }
      }, 50);
    }
  } else {
    // Syllabus or Key Articles: render full compiled HTML directly
    elements.readerBody.innerHTML = chapter.content_html || chapter.content;
  }
  
  // Set bookmark action button state
  updateBookmarkButtonUI();
  
  // Load media content players if available
  renderMediaPlayers(chapter);
  
  // Render bottom navigation
  setupChapterPagination(chapter);
  
  // Close mobile sidebar and hide overlay if open
  elements.sidebar.classList.remove('active');
  if (elements.sidebarOverlay) {
    elements.sidebarOverlay.classList.remove('active');
  }
  
  // Bind citations
  setupCitations();
  
  // Restore scroll position or scroll to heading
  setTimeout(() => {
    if (scrollToHeadingId) {
      const headingEl = document.getElementById(scrollToHeadingId);
      if (headingEl) {
        headingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        headingEl.classList.add('citation-highlight');
        setTimeout(() => headingEl.classList.remove('citation-highlight'), 3000);
        return;
      }
    }
    
    // Scroll to saved position or top
    const savedScrollPct = state.readingProgress[chapterId] || 0;
    if (savedScrollPct > 0 && savedScrollPct < 98) {
      const scrollHeight = elements.readerWrapper.scrollHeight - elements.readerWrapper.clientHeight;
      elements.readerWrapper.scrollTop = (savedScrollPct / 100) * scrollHeight;
    } else {
      elements.readerWrapper.scrollTop = 0;
    }
    
    // Update progress bar
    updateProgressBar();
  }, 100);
}

function renderHomePage() {
  let html = `
    <div class="home-container">
      <div class="home-header" style="text-align: center; margin-bottom: 32px;">
        <div class="home-logos" style="display: flex; justify-content: center; gap: 24px; margin-bottom: 20px; align-items: center;">
          <img src="media/difs_logo.png" alt="לוגו מזפ" style="height: 65px; width: 65px; border-radius: 50%; aspect-ratio: 1/1; object-fit: cover; border: 1px solid var(--card-border); background: white; padding: 2px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));">
          <img src="media/rd_logo.png" alt="לוגו מו''פ" style="height: 65px; width: 65px; border-radius: 50%; aspect-ratio: 1/1; object-fit: cover; border: 1px solid var(--card-border); background: white; padding: 2px; filter: drop-shadow(0 4px 6px rgba(0,0,0,0.15));">
        </div>
        <h1 style="border-bottom: none; padding-bottom: 0; margin-bottom: 8px;">גנאלוגיה גנטית פורנזית חקירתית (FIGG)</h1>
        <p class="home-subtitle" style="font-size: 1.25rem; color: var(--text-secondary); margin: 0;">ספר לימוד וסקירה אינטראקטיבית למומחים ואנשי מקצוע</p>
      </div>
      
      <div class="home-intro-card" style="margin-bottom: 24px;">
        <p>ברוכים הבאים לספר הדיגיטלי האינטראקטיבי בנושא <strong>FIGG (Forensic Investigative Genetic Genealogy)</strong>.</p>
        <p>ספר מקיף זה נועד להעניק הבנה מעמיקה ומתקדמת של היישומים החקירתיים, המעבדתיים, הסטטיסטיים והאתיים של גנאלוגיה גנטית בפתרון מקרי פשע חמורים וזיהוי שרידי אדם. הספר מותאם במיוחד למומחים בתחום הגנטיקה הפורנזית והחקירות, ומציג את התכנים במבנה אינטראקטיבי מתקדם הכולל מפתח מונחים מורחב והפניות ישירות למקורות מדעיים.</p>
        
        <div class="home-credits" style="margin-top: 20px; padding-top: 14px; border-top: 1px dashed var(--border-color); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; font-size: 0.9rem; color: var(--text-secondary);">
          <span>פיתוח ותוכן: <strong>רפ"ק נפתלי עינות</strong>, קמ"ד מו"פ מז"פ</span>
          <span style="font-size: 0.85rem; color: var(--text-muted);">מדור מחקר ופיתוח, החטיבה לזיהוי פלילי (מז"פ)</span>
        </div>
      </div>

      <div class="home-warning-box" style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 16px; padding: 16px 20px; margin-bottom: 28px; color: var(--text-color); display: flex; gap: 12px; align-items: flex-start; text-align: right;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px;">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <div style="font-size: 0.92rem; line-height: 1.6; color: var(--text-color);">
          <strong>שים לב:</strong> תכנים אלו נכתבו בעזרת כלי בינה מלאכותית <strong>Undermind AI</strong>, ועברו הגהה של גורמים מקצועיים. עם זאת, יש להפעיל שיקול דעת מקצועי.
        </div>
      </div>
      
      <h2 class="home-grid-title">פרקי הספר</h2>
      <div class="home-chapters-grid">
        ${state.chapters
          .filter(c => c.original_chapter_number >= 1 && c.original_chapter_number <= 15)
          .sort((a, b) => a.original_chapter_number - b.original_chapter_number)
          .map(c => {
            const progress = state.readingProgress[c.id] || 0;
            const isCompleted = progress >= 95;
            const progressPct = Math.round(progress);
            
            let badgeHtml = '';
            if (isCompleted) {
              badgeHtml = `<span class="progress-badge completed">נקרא</span>`;
            } else if (progressPct > 0) {
              badgeHtml = `<span class="progress-badge in-progress">בתהליך</span>`;
            } else {
              badgeHtml = `<span class="progress-badge not-started">טרם נקרא</span>`;
            }
            
            const cleanTitle = c.title.replace(/^פרק \d+\s*[:-]?\s*/, '');
            
            return `
              <div class="home-chapter-card" data-id="${c.id}" style="cursor: pointer;">
                <div class="home-card-header">
                  <span class="home-card-number">פרק ${c.original_chapter_number}</span>
                  ${badgeHtml}
                </div>
                <h3 class="home-card-title">${cleanTitle}</h3>
                <div class="home-card-footer">
                  <span class="home-card-action">
                    פתח פרק
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"></line>
                      <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                  </span>
                </div>
              </div>
            `;
          }).join('')}
      </div>
    </div>
  `;
  elements.readerBody.innerHTML = html;
  
  // Bind click listeners for home page cards dynamically
  document.querySelectorAll('.home-chapter-card').forEach(card => {
    card.addEventListener('click', () => {
      const chapterId = card.getAttribute('data-id');
      navigateToChapter(chapterId);
    });
  });
}

function toggleCollapsibleSection(btn, container, defaultText, activeText, forceShow = false) {
  const isShowing = container.classList.contains('show');
  if (isShowing && !forceShow) {
    container.classList.remove('show');
    btn.classList.remove('active');
    if (defaultText) btn.querySelector('span').textContent = defaultText;
  } else {
    container.classList.add('show');
    btn.classList.add('active');
    if (activeText) btn.querySelector('span').textContent = activeText;
  }
}

function renderGlossary() {
  const glossary = state.currentChapter;
  let html = `
    <h1>${glossary.title}</h1>
    ${glossary.intro_html}
    <div class="glossary-search-container" style="margin: 24px 0;">
      <input type="text" class="glossary-search-input" id="glossary-term-search" placeholder="חפש מונח במילון..." autocomplete="off">
    </div>
    <div class="glossary-grid" id="glossary-grid">
      ${renderGlossaryCards(glossary.concept_boxes)}
    </div>
  `;
  elements.readerBody.innerHTML = html;
  
  const searchInput = document.getElementById('glossary-term-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const filtered = glossary.concept_boxes.filter(c => 
        c.concept.toLowerCase().includes(query) || 
        (c.english_term && c.english_term.toLowerCase().includes(query)) ||
        c.definition.toLowerCase().includes(query)
      );
      document.getElementById('glossary-grid').innerHTML = renderGlossaryCards(filtered);
    });
  }
  
  // Bind interactive card expansion toggle
  const grid = document.getElementById('glossary-grid');
  if (grid) {
    grid.addEventListener('click', (e) => {
      const row = e.target.closest('.glossary-row');
      if (row) {
        if (e.target.closest('.glossary-chapter-badge')) return;
        row.classList.toggle('expanded');
      }
    });
  }
}

function renderGlossaryCards(concepts) {
  if (!concepts || concepts.length === 0) {
    return '<p style="text-align: center; color: var(--text-muted); padding: 32px;">לא נמצאו מונחים מתאימים במילון המושגים.</p>';
  }
  return concepts.map(c => {
    const hasEnglishTerm = c.english_term && c.english_term.trim().toLowerCase() !== c.concept.trim().toLowerCase();
    const engText = hasEnglishTerm 
      ? `<span class="glossary-concept-english" dir="ltr">(${c.english_term})</span>` 
      : '';
    const chId = `chapter_${c.chapter_num}`;
    
    // Clean up title duplication (e.g. if c.chapter_title is "פרק 2: ...")
    let sourceText = c.chapter_title;
    if (!sourceText.startsWith('פרק') && !sourceText.startsWith('פרק ')) {
      sourceText = `פרק ${c.chapter_num}: ${c.chapter_title}`;
    }
    
    return `
      <div class="glossary-row">
        <div class="glossary-row-header">
          <div class="glossary-concept-group">
            <span class="glossary-concept-name">${c.concept}</span>
            ${engText}
          </div>
          <span class="glossary-row-chevron">▼</span>
        </div>
        <div class="glossary-row-body">
          <div class="glossary-row-definition">${c.definition_html}</div>
          <div class="glossary-row-footer">
            <a href="#${chId}" class="glossary-chapter-badge">מקור: ${sourceText}</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupChapterPagination(chapter) {
  const isSpecialPage = chapter.is_home || chapter.is_glossary || chapter.id === 'key_articles';
  
  if (isSpecialPage) {
    elements.prevChapterBtn.style.display = 'none';
    elements.nextChapterBtn.style.display = 'none';
    return;
  }
  
  const currentIndex = state.chapters.findIndex(c => c.id === chapter.id);
  
  // Prev Chapter
  if (currentIndex > 0) {
    const prev = state.chapters[currentIndex - 1];
    elements.prevChapterBtn.style.display = 'flex';
    elements.prevChapterTitle.textContent = prev.title;
    elements.prevChapterBtn.onclick = () => navigateToChapter(prev.id);
  } else {
    elements.prevChapterBtn.style.display = 'none';
  }
  
  // Next Chapter
  if (currentIndex < state.chapters.length - 1) {
    const next = state.chapters[currentIndex + 1];
    elements.nextChapterBtn.style.display = 'flex';
    elements.nextChapterTitle.textContent = next.title;
    elements.nextChapterBtn.onclick = () => navigateToChapter(next.id);
  } else {
    elements.nextChapterBtn.style.display = 'none';
  }
}

// --- Dynamic Media Players Generation ---
function renderMediaPlayers(chapter) {
  // Clear any existing player instances to prevent leakage
  destroyPlayers();
  
  const isRegularChapter = (chapter.original_chapter_number >= 1 && chapter.original_chapter_number <= 15);
  
  if (!isRegularChapter) {
    elements.mediaSection.style.display = 'none';
    elements.mediaPlayersGrid.innerHTML = '';
    return;
  }
  
  elements.mediaSection.style.display = 'block';
  elements.mediaPlayersGrid.innerHTML = '';
  
  if (!chapter.media || chapter.media.length === 0) {
    // Option B: Render coming soon placeholders for NotebookLM media
    const videoPlaceholder = document.createElement('div');
    videoPlaceholder.className = 'media-placeholder-card';
    videoPlaceholder.innerHTML = `
      <div class="media-placeholder-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <polygon points="10 11 10 17 16 14 10 11"></polygon>
        </svg>
      </div>
      <span class="media-placeholder-title">סקירת וידאו – בקרוב</span>
      <span class="media-placeholder-desc">סקירת הוידאו לפרק זה מיוצרת באמצעות NotebookLM ותעלה בהמשך.</span>
      <span class="media-placeholder-badge">NotebookLM Video</span>
    `;
    
    const audioPlaceholder = document.createElement('div');
    audioPlaceholder.className = 'media-placeholder-card';
    audioPlaceholder.innerHTML = `
      <div class="media-placeholder-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      </div>
      <span class="media-placeholder-title">סקירה קולית – בקרוב</span>
      <span class="media-placeholder-desc">הסקירה הקולית לפרק זה מיוצרת באמצעות NotebookLM ותעלה בהמשך.</span>
      <span class="media-placeholder-badge">NotebookLM Audio</span>
    `;
    
    elements.mediaPlayersGrid.appendChild(videoPlaceholder);
    elements.mediaPlayersGrid.appendChild(audioPlaceholder);
    return;
  }
  
  chapter.media.forEach(m => {
    const card = document.createElement('div');
    
    if (m.type === 'audio') {
      card.className = 'custom-audio-player';
      card.innerHTML = `
        <div class="audio-track-info">
          <div class="audio-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>
          <div class="audio-meta-text">
            <span class="audio-title">${m.title}</span>
            <span class="audio-subtitle">סקירה קולית מואצת - לחקירה וזיהוי</span>
          </div>
        </div>
        <div class="audio-controls">
          <audio src="${m.src}" id="html5-audio" preload="metadata"></audio>
          <button class="play-pause-btn" id="audio-play-btn" aria-label="נגן">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" id="audio-play-icon">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
          
          <div class="timeline-container">
            <span class="time-label" id="audio-curr-time">00:00</span>
            <input type="range" class="slider-input" id="audio-timeline" min="0" max="100" value="0">
            <span class="time-label" id="audio-duration">00:00</span>
          </div>
          
          <div class="volume-container">
            <button class="volume-btn" id="audio-volume-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="audio-volume-icon">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
            <input type="range" class="slider-input" id="audio-volume-slider" min="0" max="100" value="80" style="width: 60px;">
          </div>
        </div>
      `;
      elements.mediaPlayersGrid.appendChild(card);
      initAudioControls(card.querySelector('#html5-audio'), card);
      
    } else if (m.type === 'video') {
      card.className = 'custom-video-player paused';
      card.innerHTML = `
        <video src="${m.src}" id="html5-video" preload="metadata"></video>
        <div class="video-overlay-controls">
          <input type="range" class="slider-input video-slider" id="video-timeline" min="0" max="100" value="0" style="margin-bottom: 6px;">
          
          <div class="video-control-row">
            <div class="video-control-row-left">
              <button class="video-btn" id="video-play-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" id="video-play-icon">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
              
              <div class="timeline-container" style="gap: 4px;">
                <span class="time-label" id="video-time-display" style="color: white;">00:00 / 00:00</span>
              </div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 12px;">
              <!-- Playback speed -->
              <select class="video-speed-selector" id="video-speed">
                <option value="1">1.0x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2.0x</option>
              </select>
              
              <div class="volume-container">
                <button class="video-btn" id="video-volume-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="video-volume-icon">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                </button>
                <input type="range" class="slider-input video-slider" id="video-volume-slider" min="0" max="100" value="80" style="width: 50px;">
              </div>
              
              <button class="video-btn" id="video-fullscreen-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `;
      elements.mediaPlayersGrid.appendChild(card);
      initVideoControls(card.querySelector('#html5-video'), card);
      
    } else if (m.type === 'infographic') {
      card.className = 'custom-infographic-card';
      card.innerHTML = `
        <div class="audio-track-info" style="margin-bottom: 8px;">
          <div class="audio-icon-box" style="background: rgba(236, 72, 153, 0.15); color: var(--accent-color);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
          <div class="audio-meta-text">
            <span class="audio-title">${m.title}</span>
            <span class="audio-subtitle">תרשים השוואתי אינטראקטיבי להעמקה</span>
          </div>
        </div>
        
        <div class="infographic-image-frame" id="infographic-image-frame">
          <img src="${m.src}" alt="${m.title}">
          <div class="infographic-overlay-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            הגדל תרשים
          </div>
        </div>
        
        <p class="infographic-desc">
          תרשים השוואתי המציג את תהליכי FIGG לעומת עבודת DNA מסורתית. התרשים ממחיש את המעבר משימוש ב-STR (סמני זהות ישירה) ל-SNP (סמני קשרים משפחתיים רחוקים), דרך מסדי הנתונים הגנאלוגיים.
        </p>
      `;
      elements.mediaPlayersGrid.appendChild(card);
      
      // Lightbox trigger
      card.querySelector('#infographic-image-frame').addEventListener('click', () => {
        openLightbox(m.src, m.title);
      });
    }
  });
}

// --- Audio Player Logic ---
function initAudioControls(audio, container) {
  state.audioPlayer = audio;
  const playBtn = container.querySelector('#audio-play-btn');
  const playIcon = container.querySelector('#audio-play-icon');
  const timeline = container.querySelector('#audio-timeline');
  const currTimeLabel = container.querySelector('#audio-curr-time');
  const durationLabel = container.querySelector('#audio-duration');
  const volumeBtn = container.querySelector('#audio-volume-btn');
  const volumeIcon = container.querySelector('#audio-volume-icon');
  const volumeSlider = container.querySelector('#audio-volume-slider');
  
  // Format Time
  function formatTime(secs) {
    if (isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  
  audio.addEventListener('loadedmetadata', () => {
    durationLabel.textContent = formatTime(audio.duration);
  });
  
  audio.addEventListener('timeupdate', () => {
    currTimeLabel.textContent = formatTime(audio.currentTime);
    if (!timeline.dataset.dragging) {
      timeline.value = (audio.currentTime / audio.duration) * 100 || 0;
    }
  });
  
  // Play / Pause
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
    } else {
      audio.pause();
      playIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
    }
  });
  
  // Seek timeline
  timeline.addEventListener('mousedown', () => timeline.dataset.dragging = "true");
  timeline.addEventListener('mouseup', () => delete timeline.dataset.dragging);
  timeline.addEventListener('input', () => {
    audio.currentTime = (timeline.value / 100) * audio.duration;
  });
  
  // Volume adjust
  volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
    audio.muted = (audio.volume === 0);
    updateVolumeIcon();
  });
  
  volumeBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    updateVolumeIcon();
  });
  
  function updateVolumeIcon() {
    if (audio.muted || audio.volume === 0) {
      volumeIcon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;
    } else {
      volumeIcon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
    }
  }
}

// --- Video Player Logic ---
function initVideoControls(video, container) {
  state.videoPlayer = video;
  const playBtn = container.querySelector('#video-play-btn');
  const playIcon = container.querySelector('#video-play-icon');
  const timeline = container.querySelector('#video-timeline');
  const timeDisplay = container.querySelector('#video-time-display');
  const volumeBtn = container.querySelector('#video-volume-btn');
  const volumeIcon = container.querySelector('#video-volume-icon');
  const volumeSlider = container.querySelector('#video-volume-slider');
  const speedSelector = container.querySelector('#video-speed');
  const fullscreenBtn = container.querySelector('#video-fullscreen-btn');
  
  function formatTime(secs) {
    if (isNaN(secs)) return "00:00";
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = Math.floor(secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
  
  function updateTimeDisplay() {
    timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
  }
  
  video.addEventListener('loadedmetadata', updateTimeDisplay);
  video.addEventListener('timeupdate', () => {
    updateTimeDisplay();
    if (!timeline.dataset.dragging) {
      timeline.value = (video.currentTime / video.duration) * 100 || 0;
    }
  });
  
  // Play / Pause toggling
  function togglePlay() {
    if (video.paused) {
      video.play();
      container.classList.remove('paused');
      playIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
    } else {
      video.pause();
      container.classList.add('paused');
      playIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
    }
  }
  
  playBtn.addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  
  // Timeline seek
  timeline.addEventListener('mousedown', () => timeline.dataset.dragging = "true");
  timeline.addEventListener('mouseup', () => delete timeline.dataset.dragging);
  timeline.addEventListener('input', () => {
    video.currentTime = (timeline.value / 100) * video.duration;
  });
  
  // Speed select
  speedSelector.addEventListener('change', () => {
    video.playbackRate = parseFloat(speedSelector.value);
  });
  
  // Volume adjustment
  volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value / 100;
    video.muted = (video.volume === 0);
    updateVolumeIcon();
  });
  
  volumeBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    updateVolumeIcon();
  });
  
  function updateVolumeIcon() {
    if (video.muted || video.volume === 0) {
      volumeIcon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>`;
    } else {
      volumeIcon.innerHTML = `<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>`;
    }
  }
  
  // Fullscreen
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(err => {
        console.error("Error enabling fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  });
}

function destroyPlayers() {
  if (state.audioPlayer) {
    state.audioPlayer.pause();
    state.audioPlayer = null;
  }
  if (state.videoPlayer) {
    state.videoPlayer.pause();
    state.videoPlayer = null;
  }
}

// --- Lightbox Modal Logic ---
let lightboxZoom = 1;
function openLightbox(src, title) {
  elements.lightboxImg.src = src;
  elements.lightboxImg.style.transform = `scale(1)`;
  lightboxZoom = 1;
  elements.lightbox.classList.add('active');
}

function closeLightbox() {
  elements.lightbox.classList.remove('active');
  elements.lightboxImg.src = '';
}

// --- Reading Progress Tracker ---
function loadReadingProgress() {
  const saved = localStorage.getItem('figg-progress');
  if (saved) {
    state.readingProgress = JSON.parse(saved);
  }
}

function saveCurrentProgress() {
  if (!state.currentChapter) return;
  
  const wrapper = elements.readerWrapper;
  const scrollHeight = wrapper.scrollHeight - wrapper.clientHeight;
  if (scrollHeight <= 0) return;
  
  // Calculate percentage
  let pct = (wrapper.scrollTop / scrollHeight) * 100;
  if (pct > 97) pct = 100; // Snap to finished
  if (pct < 2) pct = 0;
  
  state.readingProgress[state.currentChapter.id] = pct;
  localStorage.setItem('figg-progress', JSON.stringify(state.readingProgress));
  
  // Update sidebar progress badge
  const activeNavItem = document.getElementById(`nav-item-${state.currentChapter.id}`);
  if (activeNavItem) {
    const badge = activeNavItem.querySelector('.nav-progress-badge');
    if (badge) {
      if (pct > 0) {
        badge.textContent = `${Math.round(pct)}%`;
        badge.style.display = 'inline-block';
      } else {
        badge.style.display = 'none';
      }
    }
  }
}

function updateProgressBar() {
  if (!state.currentChapter) return;
  const wrapper = elements.readerWrapper;
  const scrollHeight = wrapper.scrollHeight - wrapper.clientHeight;
  
  if (scrollHeight > 0) {
    const pct = (wrapper.scrollTop / scrollHeight) * 100;
    elements.readingProgressBar.style.width = `${pct}%`;
  } else {
    elements.readingProgressBar.style.width = '0%';
  }
}

// --- LocalStorage Bookmarks System ---
function loadBookmarks() {
  const saved = localStorage.getItem('figg-bookmarks');
  if (saved) {
    state.bookmarks = JSON.parse(saved);
  }
  updateBookmarksUI();
}

function toggleBookmark() {
  if (!state.currentChapter) return;
  const chId = state.currentChapter.id;
  const isBookmarkedIndex = state.bookmarks.findIndex(b => b.id === chId);
  
  if (isBookmarkedIndex > -1) {
    // Remove
    state.bookmarks.splice(isBookmarkedIndex, 1);
  } else {
    // Add
    // Create text snippet from content
    const plainText = getPlainText(state.currentChapter.content_html || state.currentChapter.content);
    const snippet = plainText.substring(0, 100) + '...';
    
    state.bookmarks.push({
      id: chId,
      title: state.currentChapter.title,
      snippet: snippet,
      timestamp: new Date().toLocaleString('he-IL')
    });
  }
  
  localStorage.setItem('figg-bookmarks', JSON.stringify(state.bookmarks));
  updateBookmarksUI();
  updateBookmarkButtonUI();
}

function updateBookmarkButtonUI() {
  if (!state.currentChapter) return;
  const isBookmarked = state.bookmarks.some(b => b.id === state.currentChapter.id);
  
  if (isBookmarked) {
    elements.bookmarkActionBtn.classList.add('bookmarked');
    elements.bookmarkBtnText.textContent = "סימנייה שמורה";
  } else {
    elements.bookmarkActionBtn.classList.remove('bookmarked');
    elements.bookmarkBtnText.textContent = "שמור סימנייה";
  }
}

function updateBookmarksUI() {
  const count = state.bookmarks.length;
  elements.bookmarksCount.textContent = count;
  elements.bookmarksCount.style.display = count > 0 ? 'inline-block' : 'none';
  
  elements.bookmarksList.innerHTML = '';
  
  if (count === 0) {
    elements.bookmarksList.innerHTML = `<div class="bookmarks-empty">אין סימניות שמורות</div>`;
    return;
  }
  
  state.bookmarks.forEach(b => {
    const item = document.createElement('div');
    item.className = 'bookmark-item';
    item.innerHTML = `
      <div class="bookmark-info">
        <span class="bookmark-title">${b.title}</span>
        <span class="bookmark-snippet">${b.snippet}</span>
        <span style="font-size: 0.65rem; color: var(--text-muted);">${b.timestamp}</span>
      </div>
      <button class="bookmark-delete-btn" data-id="${b.id}" title="מחק">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    `;
    
    // Clicking bookmark navigates
    item.addEventListener('click', (e) => {
      if (e.target.closest('.bookmark-delete-btn')) return;
      navigateToChapter(b.id);
      elements.bookmarksPanel.style.display = 'none';
    });
    
    // Delete action
    item.querySelector('.bookmark-delete-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteBookmark(b.id);
    });
    
    elements.bookmarksList.appendChild(item);
  });
}

function deleteBookmark(id) {
  state.bookmarks = state.bookmarks.filter(b => b.id !== id);
  localStorage.setItem('figg-bookmarks', JSON.stringify(state.bookmarks));
  updateBookmarksUI();
  updateBookmarkButtonUI();
}

// --- Client-Side Search Engine ---
function runSearch(query) {
  state.searchQuery = query;
  
  if (query.length < 2) {
    elements.searchResultsPanel.style.display = 'none';
    elements.searchClearBtn.style.display = 'none';
    return;
  }
  
  elements.searchClearBtn.style.display = 'block';
  elements.searchResultsList.innerHTML = '';
  
  const results = [];
  const escapedQuery = escapeRegExp(query);
  const regex = new RegExp(escapedQuery, 'gi');
  
  state.chapters.forEach(ch => {
    // Check Title
    let titleMatches = (ch.title.toLowerCase().indexOf(query.toLowerCase()) > -1);
    
    // Extract plain text from parsed HTML
    const plainText = getPlainText(ch.content_html || ch.content);
    
    // Find all matching snippets
    let match;
    let chResultsCount = 0;
    
    while ((match = regex.exec(plainText)) !== null) {
      if (chResultsCount >= 5) break; // Limit snippets per chapter
      
      const startIdx = Math.max(0, match.index - 50);
      const endIdx = Math.min(plainText.length, match.index + query.length + 50);
      let snippet = plainText.substring(startIdx, endIdx);
      
      // Prefix/suffix truncation signs
      if (startIdx > 0) snippet = '...' + snippet;
      if (endIdx < plainText.length) snippet = snippet + '...';
      
      // Highlight matching word
      const highlightedSnippet = snippet.replace(
        new RegExp(escapedQuery, 'gi'),
        m => `<mark>${m}</mark>`
      );
      
      results.push({
        id: ch.id,
        title: ch.title,
        snippet: highlightedSnippet,
        index: match.index
      });
      
      chResultsCount++;
    }
    
    // If title matched but no body matches were saved, add a general result
    if (titleMatches && chResultsCount === 0) {
      results.push({
        id: ch.id,
        title: ch.title,
        snippet: 'התאמה בכותרת הפרק.',
        index: 0
      });
    }
  });
  
  // Render results
  elements.searchResultsPanel.style.display = 'flex';
  
  if (results.length === 0) {
    elements.searchResultsTitle.textContent = "אין תוצאות";
    elements.searchResultsList.innerHTML = `<div class="search-results-empty">לא נמצאו התאמות עבור "${query}"</div>`;
    return;
  }
  
  elements.searchResultsTitle.textContent = `תוצאות חיפוש (${results.length})`;
  
  results.forEach(res => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.innerHTML = `
      <span class="search-result-chapter">${res.title}</span>
      <span class="search-result-snippet">${res.snippet}</span>
    `;
    
    item.addEventListener('click', () => {
      // Load chapter
      loadChapter(res.id);
      
      // Close panel
      elements.searchResultsPanel.style.display = 'none';
      elements.searchInput.value = '';
      elements.searchClearBtn.style.display = 'none';
      
      // Flash word if possible
      setTimeout(() => highlightWordAndScroll(query), 300);
    });
    
    elements.searchResultsList.appendChild(item);
  });
}

function highlightWordAndScroll(query) {
  const body = elements.readerBody;
  const escapedQuery = escapeRegExp(query);
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  
  // Simple HTML replacer that preserves elements but wraps matching words in a temporary class
  // To keep it safe and avoid corrupting HTML tags, we scan text nodes
  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null, false);
  let textNode;
  const nodesToReplace = [];
  
  while (textNode = walker.nextNode()) {
    if (textNode.nodeValue.toLowerCase().indexOf(query.toLowerCase()) > -1) {
      // Don't replace text inside <a> tags or tags that are styled if they are parents
      nodesToReplace.push(textNode);
    }
  }
  
  if (nodesToReplace.length > 0) {
    const targetNode = nodesToReplace[0]; // Highlight first matching node
    const parentNode = targetNode.parentNode;
    
    const wrapper = document.createElement('span');
    wrapper.className = 'search-match-highlight';
    
    // Replace text node content
    const text = targetNode.nodeValue;
    const parts = text.split(regex);
    
    parts.forEach(part => {
      if (part.toLowerCase() === query.toLowerCase()) {
        const mark = document.createElement('mark');
        mark.className = 'search-match-highlight';
        mark.textContent = part;
        wrapper.appendChild(mark);
      } else {
        wrapper.appendChild(document.createTextNode(part));
      }
    });
    
    parentNode.replaceChild(wrapper, targetNode);
    
    // Scroll
    wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remove wrapper classes after 3 seconds
    setTimeout(() => {
      // Revert wrapper back to normal nodes
      const parent = wrapper.parentNode;
      if (parent) {
        const textContent = wrapper.textContent;
        const newTextNode = document.createTextNode(textContent);
        parent.replaceChild(newTextNode, wrapper);
      }
    }, 4000);
  }
}

// --- Citations Handlers ---
function setupCitations() {
  const citations = elements.readerBody.querySelectorAll('.citation-badge');
  citations.forEach(cit => {
    cit.addEventListener('click', (e) => {
      e.preventDefault();
      const refId = cit.getAttribute('data-ref');
      
      // Auto-expand references collapsible container if collapsed
      const refBtn = document.getElementById('modular-references-btn');
      const refContainer = document.getElementById('chapter-references-container');
      if (refBtn && refContainer && !refContainer.classList.contains('show')) {
        toggleCollapsibleSection(refBtn, refContainer, 'הצג מקורות', 'כווץ מקורות', true);
      }
      
      setTimeout(() => {
        const searchScope = refContainer || elements.readerBody;
        const paragraphs = searchScope.querySelectorAll('p, li, td');
        let found = false;
        
        paragraphs.forEach(p => {
          if (found) return;
          const text = p.textContent.trim();
          if (text.startsWith(`[${refId}]`) || text.startsWith(`\\[${refId}\\]`) || text.startsWith(`${refId}`) || text.startsWith(`פרק ${refId}`) || text.startsWith(`${refId}.`)) {
            p.scrollIntoView({ behavior: 'smooth', block: 'center' });
            p.classList.add('citation-highlight');
            setTimeout(() => p.classList.remove('citation-highlight'), 3000);
            found = true;
          }
        });
        
        if (!found) {
          const refHeader = document.getElementById('references') || refContainer;
          if (refHeader) {
            refHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 150);
    });
  });
}

// --- Event Listeners setup ---
function setupEventListeners() {
  // Mobile menu toggle
  elements.menuToggleBtn.addEventListener('click', () => {
    elements.sidebar.classList.add('active');
    if (elements.sidebarOverlay) elements.sidebarOverlay.classList.add('active');
  });
  
  elements.closeSidebarBtn.addEventListener('click', () => {
    elements.sidebar.classList.remove('active');
    if (elements.sidebarOverlay) elements.sidebarOverlay.classList.remove('active');
  });
  
  if (elements.sidebarOverlay) {
    elements.sidebarOverlay.addEventListener('click', () => {
      elements.sidebar.classList.remove('active');
      elements.sidebarOverlay.classList.remove('active');
    });
  }
  
  // Brand Logo clicks return to home page
  const brandBtn = document.getElementById('sidebar-brand-btn');
  if (brandBtn) {
    brandBtn.addEventListener('click', () => {
      navigateToChapter('home');
    });
  }
  
  // Close menu clicking content on mobile
  elements.readerWrapper.addEventListener('click', () => {
    elements.sidebar.classList.remove('active');
    if (elements.sidebarOverlay) elements.sidebarOverlay.classList.remove('active');
    elements.bookmarksPanel.style.display = 'none';
    elements.fontsizeMenu.style.display = 'none';
    elements.searchResultsPanel.style.display = 'none';
  });
  
  // Theme Toggle click
  elements.themeToggleBtn.addEventListener('click', () => {
    const nextTheme = state.theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  });
  
  // Font Size selector click
  elements.fontsizeToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = elements.fontsizeMenu.style.display === 'flex';
    elements.fontsizeMenu.style.display = isVisible ? 'none' : 'flex';
  });
  
  elements.fontsizeMenu.querySelectorAll('.fontsize-option').forEach(btn => {
    btn.addEventListener('click', () => {
      setFontSize(btn.getAttribute('data-size'));
      elements.fontsizeMenu.style.display = 'none';
    });
  });
  
  // Bookmarks popup toggles
  elements.bookmarksToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = elements.bookmarksPanel.style.display === 'flex';
    elements.bookmarksPanel.style.display = isVisible ? 'none' : 'flex';
    elements.searchResultsPanel.style.display = 'none'; // Close other
  });
  
  elements.clearAllBookmarks.addEventListener('click', () => {
    if (confirm("האם ברצונך למחוק את כל הסימניות?")) {
      state.bookmarks = [];
      localStorage.setItem('figg-bookmarks', JSON.stringify(state.bookmarks));
      updateBookmarksUI();
      updateBookmarkButtonUI();
    }
  });
  
  elements.bookmarkActionBtn.addEventListener('click', () => {
    toggleBookmark();
  });
  
  // Search keyup
  elements.searchInput.addEventListener('input', (e) => {
    runSearch(e.target.value.trim());
  });
  
  elements.searchClearBtn.addEventListener('click', () => {
    elements.searchInput.value = '';
    runSearch('');
  });
  
  // Close popups on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.fontsize-dropdown')) {
      elements.fontsizeMenu.style.display = 'none';
    }
    if (!e.target.closest('#bookmarks-toggle-btn') && !e.target.closest('#bookmarks-panel')) {
      elements.bookmarksPanel.style.display = 'none';
    }
    if (!e.target.closest('.search-container') && !e.target.closest('#search-results-panel')) {
      elements.searchResultsPanel.style.display = 'none';
    }
  });
  
  // Scroll event in Reader
  elements.readerWrapper.addEventListener('scroll', () => {
    updateProgressBar();
  });
  
  // Window hash change (handles deep-link transitions)
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      loadChapter(hash);
    }
  });
  
  // Lightbox close click
  elements.lightboxClose.addEventListener('click', closeLightbox);
  elements.lightbox.addEventListener('click', (e) => {
    if (e.target === elements.lightbox) closeLightbox();
  });
  
  // Lightbox zooming tools
  elements.zoomInBtn.addEventListener('click', () => {
    lightboxZoom += 0.15;
    elements.lightboxImg.style.transform = `scale(${lightboxZoom})`;
  });
  
  elements.zoomOutBtn.addEventListener('click', () => {
    lightboxZoom = Math.max(0.5, lightboxZoom - 0.15);
    elements.lightboxImg.style.transform = `scale(${lightboxZoom})`;
  });
  
  elements.zoomResetBtn.addEventListener('click', () => {
    lightboxZoom = 1;
    elements.lightboxImg.style.transform = `scale(1)`;
  });
}

// --- Utilities ---
function fadeOut(el) {
  el.style.opacity = 1;
  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function getPlainText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// --- Appendix Navigation Helpers ---
window.navigateToFurtherReading = function(chapterNum) {
  navigateToChapter('key_articles');
  setTimeout(() => {
    const targetElement = document.getElementById(`appendix-chapter-${chapterNum}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      targetElement.classList.add('chapter-highlight-flash');
      setTimeout(() => targetElement.classList.remove('chapter-highlight-flash'), 2500);
    }
  }, 220);
};

window.scrollToAppendixSection = function(chapterId) {
  const targetElement = document.getElementById(`appendix-chapter-${chapterId}`);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    targetElement.classList.add('chapter-highlight-flash');
    setTimeout(() => targetElement.classList.remove('chapter-highlight-flash'), 2500);
  }
};
