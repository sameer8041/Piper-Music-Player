import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import { publishToQueue } from "../broker/broker.js";

export async function register(req, res) {
  const {
    email,
    password,
    fullname: { firstname, lastname },
    role = "user"
  } = req.body;

  const userAlreadyExist = await userModel.findOne({ email });

  if (userAlreadyExist) {
    return res.status(409).json({
      message: "user already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const users = await userModel.create({
    email,
    password: hashedPassword,
    fullname: {
      firstname,
      lastname,
    },
    role
  });

  const token = jwt.sign(
    { id: users._id, role: users.role, fullname: users.fullname },
    config.JWT_SECRET_KEY,
    { expiresIn: "2d" },
  );

  await publishToQueue("User_Created", {
    id: users._id,
    email: users.email,
    role: users.role,
    fullname: users.fullname
  })


  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.status(201).json({
    message: "User Created Succefully",
    user: {
      email: users.email,
      id: users._id,
      role: users.role,
      fullname: {
        firstname: users.fullname.firstname,
        lastname: users.fullname.lastname,
      },
    },
  });
}

export async function GoogleAuth(req, res) {

  const user = req.user;

  const userAlreadyExist = await userModel.findOne({
    $or: [{ email: user.emails[0].value }, { googleId: user.id }],
  });


  if (userAlreadyExist) {
    const token = jwt.sign(
      { id: userAlreadyExist._id, role: userAlreadyExist.role, fullname: userAlreadyExist.fullname },
      config.JWT_SECRET_KEY,
      { expiresIn: "2d" },
    );


    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });


    return res.redirect("http://localhost:5173");
  }


  const newUser = await userModel.create({
    googleId: user.id,
    email: user.emails[0].value,
    fullname: {
      firstname: user.displayName.split(" ")[0],
      lastname: user.displayName.split(" ")[1],
    },
  });

  const token = jwt.sign(
    { id: newUser._id, role: newUser.role, fullname: newUser.fullname },
    config.JWT_SECRET_KEY,
    { expiresIn: "2d" },
  );

  await publishToQueue("User_Created", {
    id: newUser._id,
    email: newUser.email,
    role: newUser.role,
    fullname: newUser.fullname
  })



  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.redirect("http://localhost:5173")
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email })
  if (!user) {
    return res.status(404).json({
      message: "user not found"
    })
  }
  const isMatch = await bcrypt.compare(password, user.password || "");
  if (!isMatch) {
    return res.status(401).json({
      message: "invalid credentials"
    })

  }

  const token = jwt.sign({ id: user._id, role: user.role, fullname: user.fullname }, config.JWT_SECRET_KEY, { expiresIn: "2d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24
  }

  )
  7
  res.status(200).json({
    message: "user login successfully",
    user: {
      email: user.email,
      id: user._id,
      role: user.role,

    }
  })
}
