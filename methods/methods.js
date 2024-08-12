import User from '../model/model.js';
import user2 from '../model/model2.js'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import User2 from '../model/model2.js';
const jwtkey = "hello123"

export const savedata = async (req, res) => {
  const { Subject, Lecture, CourseCode, BlockNo, Faculty, Time, Day } = req.body;
  try {
    const existingUser = await User.findOne({ CourseCode });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newuser = new User({
      Subject,
      Lecture,
      CourseCode,
      BlockNo,
      Faculty,
      Time,
      Day

    });
    await newuser.save();
    jwt.sign({ newuser }, jwtkey, { expiresIn: "5d" }, (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error generating token" });
      }
      return res.status(200).json({
        message: "Data saved successfully",
        user: {
          Subject: newuser.Subject,
          Lecture: newuser.Lecture,
          CourseCode: newuser.CourseCode,
          BlockNo: newuser.BlockNo,
          Faculty: newuser.Faculty,
          Time: newuser.Time,
          Day: newuser.Day

        },
        auth: token
      });
    })
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Error saving data" });
  }
};


export const fetchdata = async (req, res) => {
  const { Day } = req.body;
  try {
    const credential = await User.find({ Day });

    if (!credential) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    jwt.sign({ credential }, jwtkey, { expiresIn: "5d" }, (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error generating token" });
      }

     

      return res.status(200).json({
        message: "Successfully fetched data",
        credential,
        auth: token,
      });
    });

  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

export const login = async (req, res) => {
  const { key } = req.body;
  try {

    const user = await User2.findOne({ key });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    jwt.sign({ user }, jwtkey, { expiresIn: "5d" }, (err, token) => {
      if (err) {
        res.status(500).json({ message: 'Error Login', error: err.message });
      }

      res.status(201).json({
        user :{

        
        message: 'Logged in successfully',


        key: user.key,
        password: user.password,

        token: token
        }

      });

    })

  } catch (error) {
    console.error(error)

  }

}

