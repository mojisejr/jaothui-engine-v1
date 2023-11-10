export const bearerParser = (bearer: `Bearer ${string}`) => {
  return bearer.split('Bearer ')[1];
};
