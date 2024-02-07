export const responeData = (statusCode: number, message: string, content?: any) => {
  return {
    statusCode,
    message,
    content,
    dateTime: new Date().toISOString(),
  };
};

export const responseArray = (
  statusCode: number,
  message: string,
  total: number,
  content?: any,
) => {
  return {
    statusCode,
    message,
    total,
    content,
    dateTime: new Date().toISOString(),
  };
};
