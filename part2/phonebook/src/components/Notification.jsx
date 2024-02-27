const Notification = ({ message, kind }) => {
  if (message === null) {
    return null;
  }

  return <div className={kind}>{message}</div>;
};

export default Notification;
