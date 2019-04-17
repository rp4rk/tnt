export const isSecureUrl = url => url && url.match(/^https:\/\//g);
export const isValidApiKey = key => key && String(key).length === 40;
