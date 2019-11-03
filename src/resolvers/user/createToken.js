import jwt from 'jsonwebtoken';

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role, unitNo, dateTurnedOver } = user;
  return await jwt.sign({ id, email, username, role, unitNo, dateTurnedOver }, secret, {
    expiresIn,
  });
};

export default createToken;
