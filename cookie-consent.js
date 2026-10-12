/* DraftsRush consent controls. Configure a Google-certified CMP in AdSense for EEA/UK/Switzerland requirements. */
(function () {
  'use strict';
  var KEY = 'draftsrush-consent-v1';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

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
    link.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:9998;background:#f8d000;color:#111317;border:2px solid #111317;padding:8px 10px;font:600 12px Arial,sans-serif;box-shadow:3px 3px 0 #111317;cursor:pointer';
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
    var banner = document.createElement('section');
    banner.id = 'dr-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Privacy and cookie choices');
    banner.setAttribute('aria-live', 'polite');
    banner.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:760px;margin:0 auto;background:#f0f2f5;color:#111317;border:2px solid #111317;padding:16px;box-shadow:5px 5px 0 #111317;font:14px/1.5 Arial,sans-serif';
    var copy = document.createElement('p');
    copy.style.margin = '0 0 12px';
    copy.textContent = 'DraftsRush uses necessary storage to operate this site. With your permission, analytics and advertising technologies may also be used. You can reject optional technologies or accept them. Read our Privacy Policy for details.';
    var policy = document.createElement('a');
    policy.href = '/privacy';
    policy.textContent = 'Privacy Policy';
    policy.style.cssText = 'display:inline-block;color:#111317;font-weight:700;text-decoration:underline;margin-bottom:12px';
    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px';
    function button(label, action, primary) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = 'border:2px solid #111317;padding:9px 12px;font-weight:700;cursor:pointer;background:' + (primary ? '#f8d000' : '#fff') + ';color:#111317';
      b.addEventListener('click', action);
      actions.appendChild(b);
    }
    button('Reject optional', function () { updateConsent('rejected'); }, false);
    button('Accept all', function () { updateConsent('accepted'); }, true);
    banner.appendChild(copy);
    banner.appendChild(policy);
    banner.appendChild(actions);
    document.body.appendChild(banner);
  }

  function init() {
    renderBanner(false);
    showManageLink();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();