// A link that ends in ?open lets anyone look at the whole site without signing in, for a talk, a conference or a visitor:
// every lesson is open, no self-rating is asked first, nothing is sent to the cloud, and the work stays in this browser.
// Nothing in the cloud opens with it: the students' records still need the teacher's account. The pass lasts for the
// browser tab (session storage), so the address can lose ?open while moving around the site.

const KEY = 'chem_guest_pass';

const inUrl = (() => {
  try {
    return new URLSearchParams(window.location.search).has('open');
  } catch {
    return false;
  }
})();

if (inUrl) {
  try {
    window.sessionStorage.setItem(KEY, '1');
  } catch {
    // Storage can be blocked; the pass then lasts until the page is reloaded without ?open
  }
}

export const hasGuestPass = (): boolean => {
  if (inUrl) return true;
  try {
    return window.sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};
