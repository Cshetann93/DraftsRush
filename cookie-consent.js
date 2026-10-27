/* DraftsRush consent controls. Configure a Google-certified CMP in AdSense for EEA/UK/Switzerland requirements. */
(function () {
  'use strict';
  var KEY = 'draftsrush-consent-v1';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function addConsentStyles() {
    if (document.getElementById('dr-consent-styles')) return;
    var style = document.createElement('style');
    style.id = 'dr-consent-styles';
    style.textContent = `
      #dr-consent-banner{position:fixed!important;left:20px!important;right:20px!important;bottom:20px!important;top:auto!important;z-index:99999!important;width:auto!important;max-width:560px!important;margin:0 auto!important;padding:28px!important;box-sizing:border-box!important;background:#fff!important;color:#17191f!important;border:1px solid #e5e7eb!important;border-radius:20px!important;box-shadow:0 18px 60px rgba(17,19,23,.20),0 3px 12px rgba(17,19,23,.06)!important;font:14px/1.6 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;text-align:left!important}
      #dr-consent-banner .dr-consent-eyebrow{margin:0 0 10px!important;color:#6b7280!important;font-size:11px!important;font-weight:750!important;letter-spacing:.12em!important;text-transform:uppercase!important}
      #dr-consent-banner .dr-consent-copy{margin:0 0 14px!important;color:#525866!important;font-size:14px!important;line-height:1.7!important}
      #dr-consent-banner .dr-consent-policy{display:inline-block!important;margin:0 0 22px!important;color:#17191f!important;font-size:13px!important;font-weight:700!important;text-decoration:underline!important;text-underline-offset:3px!important}
      #dr-consent-banner .dr-consent-actions{display:flex!important;flex-wrap:wrap!important;gap:10px!important;align-items:center!important}
      #dr-consent-banner .dr-consent-button{min-height:46px!important;padding:12px 19px!important;border:1px solid #d1d5db!important;border-radius:999px!important;background:#fff!important;color:#17191f!important;font:650 13px/1.2 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;cursor:pointer!important;transition:background .18s ease,border-color .18s ease,transform .18s ease!important}
      #dr-consent-banner .dr-consent-button:hover{background:#f4f5f7!important;border-color:#9ca3af!important;transform:translateY(-1px)!important}
      #dr-consent-banner .dr-consent-button-primary{background:#f8d000!important;border-color:#f8d000!important}
      #dr-consent-banner .dr-consent-button-primary:hover{background:#eac400!important;border-color:#eac400!important}
      #dr-consent-banner button:focus-visible,#dr-consent-banner a:focus-visible,#dr-consent-manage:focus-visible{outline:3px solid #315efb!important;outline-offset:3px!important}
      @media(max-width:600px){#dr-consent-banner{left:12px!important;right:12px!important;bottom:12px!important;padding:22px!important;border-radius:17px!important}#dr-consent-banner .dr-consent-actions{display:grid!important;grid-template-columns:1fr!important}#dr-consent-banner .dr-consent-button{width:100%!important;min-height:48px!important}}
      @media(prefers-reduced-motion:reduce){#dr-consent-banner .dr-consent-button{transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function updateConsent(choice) {
    var granted = choice === 'accepted';
    window.gtag('consent', 'update', {
      ad_storage: granted ? 'granted' : 'denied',
      ad_user_data: granted ? 'granted' : 'denied',
      ad_personalization: granted ? 'granted' : 'denied',
      analytics_storage: granted ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted'
    });
    try { localStorage.setItem(KEY, choice); } catch (e) {}
    var banner = document.getElementById('dr-consent-banner');
    if (banner) banner.remove();
    showManageLink();
  }

  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  function showManageLink() {
    if (document.getElementById('dr-consent-manage')) return;
    var link = document.createElement('button');
    link.id = 'dr-consent-manage';
    link.type = 'button';
    link.textContent = 'Privacy & cookie settings';
    link.setAttribute('aria-label', 'Reopen privacy and cookie settings');
    link.style.cssText = 'position:fixed;left:16px;bottom:16px;z-index:9998;display:inline-flex;align-items:center;gap:8px;background:#f8d000;color:#111317;border:1px solid rgba(17,19,23,.18);border-radius:999px;padding:11px 16px;font:600 13px/1.2 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 8px 24px rgba(17,19,23,.12);cursor:pointer;transition:transform .2s ease,box-shadow .2s ease';
    link.addEventListener('click', function () { try { localStorage.removeItem(KEY); } catch (e) {} renderBanner(true); });
    document.body.appendChild(link);
  }

  function renderBanner(force) {
    if (!force) {
      try {
        var saved = localStorage.getItem(KEY);
        if (saved === 'accepted' || saved === 'rejected') {
          updateConsent(saved);
          return;
        }
      } catch (e) {}
    }
    if (document.getElementById('dr-consent-banner')) return;
    addConsentStyles();
    var banner = document.createElement('section');
    banner.id = 'dr-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Privacy and cookie choices');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-modal', 'true');

    var eyebrow = document.createElement('p');
    eyebrow.className = 'dr-consent-eyebrow';
    eyebrow.textContent = 'Your privacy matters';

    var copy = document.createElement('p');
    copy.className = 'dr-consent-copy';
    copy.textContent = 'DraftsRush uses essential storage to run this site. If you agree, we’ll also use analytics and advertising cookies to improve the experience and measure performance. You can change your choice at any time.';

    var policy = document.createElement('a');
    policy.className = 'dr-consent-policy';
    policy.href = '/privacy';
    policy.textContent = 'Read our Privacy Policy';

    var actions = document.createElement('div');
    actions.className = 'dr-consent-actions';
    function button(label, action, primary) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'dr-consent-button' + (primary ? ' dr-consent-button-primary' : '');
      b.textContent = label;
      b.addEventListener('click', action);
      actions.appendChild(b);
    }
    button('Reject optional', function () { updateConsent('rejected'); }, false);
    button('Accept all', function () { updateConsent('accepted'); }, true);
    banner.appendChild(eyebrow);
    banner.appendChild(copy);
    banner.appendChild(policy);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  function init() {
    addConsentStyles();
    renderBanner(false);
    showManageLink();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
