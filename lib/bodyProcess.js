const bodyProcess = {
  JSON: {
    headers: {
      "Content-Type": "application/json",
    },
    formatting(params) {
      return JSON.stringify(params);
    },
  },
  FormData: {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    formatting(params) {
      let formData = new FormData();
      Object.keys(params).forEach((key) => {
        formData.append(key, params[key]);
      });
      return formData;
    },
  },
};

export default bodyProcess;
