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
    var banner = document.createElement('section');
    banner.id = 'dr-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Privacy and cookie choices');
    banner.setAttribute('aria-live', 'polite');
    banner.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:680px;margin:0 auto;background:#fff;color:#17191f;border:1px solid rgba(17,19,23,.1);border-radius:22px;padding:clamp(20px,3vw,28px);box-shadow:0 24px 70px rgba(17,19,23,.2),0 4px 14px rgba(17,19,23,.06);font:14px/1.65 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-sizing:border-box';
    var copy = document.createElement('p');
    copy.style.cssText = 'margin:0 0 16px;color:#525866;font-size:14px;line-height:1.7';
    copy.textContent = 'DraftsRush uses necessary storage to operate this site. With your permission, analytics and advertising technologies may also be used. You can reject optional technologies or accept them. Read our Privacy Policy for details.';
    var policy = document.createElement('a');
    policy.href = '/privacy';
    policy.textContent = 'Privacy Policy';
    policy.style.cssText = 'display:inline-flex;align-items:center;color:#17191f;font-weight:650;text-decoration:underline;text-underline-offset:3px;margin-bottom:20px;font-size:13px';
    var actions = document.createElement('div');
    actions.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;align-items:center';
    function button(label, action, primary) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = 'min-height:44px;border:1px solid ' + (primary ? '#f8d000' : 'rgba(17,19,23,.16)') + ';border-radius:999px;padding:11px 18px;font:650 13px/1.2 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;cursor:pointer;background:' + (primary ? '#f8d000' : '#f7f8fa') + ';color:#17191f;transition:transform .18s ease,box-shadow .18s ease,background .18s ease';
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