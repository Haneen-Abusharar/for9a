

export const arrayToUrl = (data) => {
    var out = [];
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            out.push(key + '=' + encodeURIComponent(data[key]));
        }
    }

    return out.join('&');
}