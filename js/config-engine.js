/**
 * Config Engine — Tiered Occasion Experience
 * Loads js/config.json, deep-merges base + selected package,
 * and exposes a single global `AppConfig` API used by every page/feature.
 *
 * Switch packages by editing config.json → "package": "basic" | "pro" | "luxury"
 */
(function (global) {
  'use strict';

  const CONFIG_PATH = 'js/config.json';
  const VALID_PACKAGES = ['basic', 'pro', 'luxury'];

  // ---------------------------------------------------------------------------
  // Utilities
  // ---------------------------------------------------------------------------
  const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

  /**
   * Deep merge source into target. Arrays from source replace target arrays.
   */
  function deepMerge(target, source) {
    const out = { ...target };
    if (!isObject(source)) return out;
    for (const key of Object.keys(source)) {
      const sv = source[key];
      const tv = out[key];
      if (isObject(sv) && isObject(tv)) {
        out[key] = deepMerge(tv, sv);
      } else {
        out[key] = sv;
      }
    }
    return out;
  }

  function clamp(n, min, max) {
    return Math.max(min, Math.min(max, n));
  }

  function normalizePackage(name) {
    const clean = String(name || 'basic').toLowerCase().trim();
    return VALID_PACKAGES.includes(clean) ? clean : 'basic';
  }

  // ---------------------------------------------------------------------------
  // Validation
  // ---------------------------------------------------------------------------
  function validate(raw) {
    const errors = [];
    if (!raw || !isObject(raw)) errors.push('Config root must be an object.');
    if (!VALID_PACKAGES.includes(normalizePackage(raw.package))) {
      errors.push(`Invalid package "${raw.package}". Use one of: ${VALID_PACKAGES.join(', ')}`);
    }
    if (!isObject(raw.base)) errors.push('Missing "base" configuration object.');
    if (!isObject(raw.packages)) errors.push('Missing "packages" configuration object.');
    for (const pkg of VALID_PACKAGES) {
      if (!isObject(raw.packages?.[pkg])) errors.push(`Missing package override for "${pkg}".`);
    }
    return errors;
  }

  // ---------------------------------------------------------------------------
  // i18n helpers
  // ---------------------------------------------------------------------------
  function pickString(value, lang, fallbackLang = 'en') {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      return value[lang] ?? value[fallbackLang] ?? Object.values(value)[0] ?? '';
    }
    return String(value);
  }

  // ---------------------------------------------------------------------------
  // Public API
  // ---------------------------------------------------------------------------
  class ConfigEngine {
    constructor() {
      this.raw = null;
      this.config = null;
      this.ready = false;
      this._listeners = [];
    }

    async load(path = CONFIG_PATH) {
      try {
        const response = await fetch(path, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status} — ${response.statusText}`);
        this.raw = await response.json();
      } catch (err) {
        console.error('[ConfigEngine] Failed to load config:', err);
        this.raw = this.fallbackConfig();
      }

      const errors = validate(this.raw);
      if (errors.length) {
        console.error('[ConfigEngine] Validation errors:', errors);
        if (console.table) console.table(errors.map((e) => ({ error: e })));
      }

      this.build();
      this.applyGlobals();
      this.ready = true;
      this._notify('ready', this.config);
      return this.config;
    }

    /**
     * Minimal fallback config so the site never crashes if config.json is missing.
     */
    fallbackConfig() {
      return {
        package: 'basic',
        base: {
          site: { defaultLang: 'ar', supportedLangs: ['ar', 'en'] },
          access: { pin_enabled: false },
          features: {},
          ui: { complexity: 'minimal', animations: 'none' },
          media: {},
          pages: { index: true },
          performance: { quality: 'low' }
        },
        packages: { basic: {}, pro: {}, luxury: {} }
      };
    }

    build() {
      const pkgName = normalizePackage(this.raw.package);
      const pkgOverride = this.raw.packages?.[pkgName] || {};
      this.config = deepMerge(this.raw.base || {}, pkgOverride);
      this.config._package = pkgName;
      this.config._meta = this.raw.meta || {};
      // Surface frequently checked flags at top level for convenience
      this.config.features = this.config.features || {};
      this.config.pages = this.config.pages || {};
      this.config.ui = this.config.ui || {};
      this.config.access = this.config.access || {};
      this.config.performance = this.config.performance || {};
    }

    applyGlobals() {
      const cfg = this.config;
      const doc = document.documentElement;
      const body = document.body;
      const lang = cfg.site?.defaultLang || 'ar';
      const dir = lang === 'ar' ? 'rtl' : 'ltr';

      // Language / direction
      doc.lang = lang;
      doc.dir = dir;
      doc.setAttribute('data-lang', lang);
      doc.setAttribute('data-dir', dir);

      // Package & quality classes
      body.classList.add(`pkg-${cfg._package}`);
      body.classList.add(`quality-${cfg.performance.quality || 'auto'}`);
      body.classList.add(`complexity-${cfg.ui.complexity || 'minimal'}`);
      body.classList.add(`animations-${cfg.ui.animations || 'none'}`);

      // Feature flags as data attributes
      for (const [key, enabled] of Object.entries(cfg.features)) {
        body.setAttribute(`data-feature-${key}`, String(Boolean(enabled)));
      }

      // Page guard / nav visibility
      this.applyPageAccess();
      this.applyNavState();

      // Backwards-compatible shim: expose old `CONFIG` shape so existing
      // scripts that read `CONFIG.transitionDuration` keep working.
      global.CONFIG = global.CONFIG || {};
      Object.assign(global.CONFIG, {
        transitionDuration: cfg.ui.transition_duration_ms ?? 500,
        revealThreshold: 0.06,
        revealRootMargin: '0px 0px -40px 0px',
        prefetchNextPage: Boolean(cfg.media?.preload_next_page),
        package: cfg._package,
        quality: cfg.performance.quality || 'auto',
        pinEnabled: Boolean(cfg.access?.pin_enabled)
      });
    }

    /**
     * If the current page is disabled by the active package, redirect to index.
     * Safe to call on every page load.
     */
    applyPageAccess() {
      const pageId = document.body?.dataset?.page;
      if (!pageId) return;
      const enabled = Boolean(this.config.pages?.[pageId]);
      if (!enabled && pageId !== 'index') {
        console.warn(`[ConfigEngine] Page "${pageId}" is disabled for package "${this.config._package}". Redirecting to index.`);
        window.location.replace('index.html');
      }
    }

    /**
     * Disable navigation links whose target page is not enabled.
     */
    applyNavState() {
      const links = document.querySelectorAll('a[href$=".html"]');
      links.forEach((link) => {
        const href = link.getAttribute('href') || '';
        const page = href.replace('.html', '').replace(/#.*$/, '');
        if (!page || page === 'index') return;
        if (!this.isPageEnabled(page)) {
          link.classList.add('nav-disabled');
          link.setAttribute('aria-disabled', 'true');
          link.tabIndex = -1;
          link.addEventListener('click', (e) => {
            e.preventDefault();
          });
        }
      });
    }

    /**
     * Re-reads config and rebuilds at runtime (useful for dev tools / preview mode).
     */
    async reload() {
      this.ready = false;
      return this.load(CONFIG_PATH);
    }

    on(event, cb) {
      this._listeners.push({ event, cb });
      if (event === 'ready' && this.ready) cb(this.config);
    }

    _notify(event, payload) {
      this._listeners.filter((l) => l.event === event).forEach((l) => l.cb(payload));
    }

    // -------------------------------------------------------------------------
    // Convenience getters
    // -------------------------------------------------------------------------
    get package() {
      return this.config?._package || 'basic';
    }

    get lang() {
      return this.config?.site?.defaultLang || 'ar';
    }

    isFeatureEnabled(name) {
      return Boolean(this.config?.features?.[name]);
    }

    isPageEnabled(pageId) {
      return Boolean(this.config?.pages?.[pageId]);
    }

    isPinEnabled() {
      return Boolean(this.config?.access?.pin_enabled);
    }

    getPageLabel(pageId, lang = this.lang) {
      return pickString(this.config?.i18n?.nav?.[pageId], lang);
    }

    t(keyPath, lang = this.lang) {
      const keys = keyPath.split('.');
      let node = this.config;
      for (const k of keys) {
        if (!isObject(node)) return '';
        node = node[k];
      }
      return pickString(node, lang);
    }

    /**
     * Clamp content arrays to package media limits.
     */
    clampContent(items, type) {
      const limitMap = {
        gallery: this.config?.media?.max_gallery_images,
        letters: this.config?.media?.max_letters,
        songs: this.config?.media?.max_songs
      };
      const limit = limitMap[type];
      if (!Array.isArray(items)) return [];
      if (typeof limit === 'number' && limit >= 0) return items.slice(0, limit);
      return items;
    }

    /**
     * Render a list into a container using a template callback, respecting limits.
     */
    renderList(containerSelector, items, type, renderFn) {
      if (!this.isFeatureEnabled(type)) return 0;
      const container = typeof containerSelector === 'string'
        ? document.querySelector(containerSelector)
        : containerSelector;
      if (!container) return 0;
      const limited = this.clampContent(items, type);
      container.innerHTML = '';
      limited.forEach((item, index) => {
        const el = renderFn(item, index, this.lang);
        if (el) container.appendChild(el);
      });
      return limited.length;
    }
  }

  // ---------------------------------------------------------------------------
  // Initialize immediately
  // ---------------------------------------------------------------------------
  const engine = new ConfigEngine();
  global.AppConfig = engine;

  // Auto-load on DOMContentLoaded if not already loaded.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => engine.load());
  } else {
    engine.load();
  }
})(window);
