const header = [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera];
const dataos = [
  { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
  { name: 'Windows', value: 'Win', version: 'NT' },
  { name: 'iPhone', value: 'iPhone', version: 'OS' },
  { name: 'iPad', value: 'iPad', version: 'OS' },
  { name: 'Kindle', value: 'Silk', version: 'Silk' },
  { name: 'Android', value: 'Android', version: 'Android' },
  { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
  { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
  { name: 'Macintosh', value: 'Mac', version: 'OS X' },
  { name: 'Linux', value: 'Linux', version: 'rv' },
  { name: 'Palm', value: 'Palm', version: 'PalmOS' }
];
const databrowser = [
  { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
  { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
  { name: 'Safari', value: 'Safari', version: 'Version' },
  { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
  { name: 'Opera', value: 'Opera', version: 'Opera' },
  { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
  { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
];

const matchItem = (string, data) => {
  const dataLen = data.length;
  let regex, regexv, match, matches, matchesLen, version = '0';

  for (let i = 0; i < dataLen; i++) {
    regex = new RegExp(data[i].value, 'i');
    match = regex.test(string);

    if (match) {
      regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
      matches = string.match(regexv);

      if(matches) { if(matches[1]) { matches = matches[1] } }

      if (matches) {
        version = '';
        matches = matches.split(/[._]+/);
        matchesLen = matches.length;

        for (let j = 0; j < matchesLen; j++) {
          version += matches[j] + `${j === 0 ? '.' : ''}`;
        }
      }
      return { name: data[i].name, version: parseFloat(version) };
    }
  }

  return { name: 'unknown', version: 0 };
};

export const getOS = () => {
  const agent = header.join(' ');

  return {
    os: matchItem(agent, dataos),
    browser: matchItem(agent, databrowser)
  }
};

export async function timeout(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    let context = this;
    let args = arguments;
	    
    let later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    let callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};

export const getRandom = (max, min) => parseInt(Math.random() * (max - min) + min);
