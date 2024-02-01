import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fileUploader from "../utils/fileUploader.js";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const fileBuffer = req.file.buffer;
    const newFile = await fileUploader(fileBuffer, picturePath);
    const newPicturePath = `v${newFile.version}/${newFile.public_id}`;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: newPicturePath,
      friends,
      location,
      occupation,
      viewedProfile: 0,
      impressions: 0,
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      throw Error("User Registration Failed");
    }
    res.status(201).json(savedUser);
  } catch (err) {
    if (err.message.includes("duplicate")) {
      res.status(400).json({ error: "Email Already Registered" });
    } else {
      // Other types of errors (e.g., server error)
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
