export default async (parent, args, { models }) => {
  return await models.User.find();
};
