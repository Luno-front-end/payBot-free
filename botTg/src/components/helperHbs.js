const getStatus = (status) => {
  if (status === "approved") {
    return "Оплачено";
  } else if (status === null) {
    return "Не оплачено";
  } else if (status === "deleted") {
    return "Відписався";
  }
};

const getColorStatus = (status) => {
  if (status === "approved") {
    return "user-list-ok";
  } else if (status === null) {
    return "user-list-null";
  } else if (status === "deleted") {
    return "user-list-dell";
  }
};

module.exports = { getStatus, getColorStatus };
