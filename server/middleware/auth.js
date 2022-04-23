import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    //get the user token from the frontend
    const token = req.headers.authorization.split(" ")[1];
    /*
    check whether this is a token from a Google account
    or a token of a manually registered user.

    if token.length < 500 == manual user else google account
    */
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      //if it is a manual user, then system gives username and id of specific person
      decodedData = jwt.verify(token, "test");
      //get users id
      req.userId = decodedData?.id;
    } else {
      //work with Google oAuth token
      decodedData = jwt.decode(token);
      //get google users id
      req.userId = decodedData?.sub;
    }
    //next used to start action
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
