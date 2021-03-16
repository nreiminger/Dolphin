export const url_prefix = "http://localhost:4200";

export const checkStatus = res => {
    if (res.ok) {
      return res;
    } else {
      return res.text()
      .then(msg => { throw new Error(msg); });
    }
};
