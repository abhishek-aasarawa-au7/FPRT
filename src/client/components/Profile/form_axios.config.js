const createConfig = () => {
  const authToken = localStorage.getItem("token");

  if (!!authToken) {
    return {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    };
  } else {
    return {
      headers: { "Content-Type": "multipart/form-data" },
    };
  }
};

export default createConfig;
