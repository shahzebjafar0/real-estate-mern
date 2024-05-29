import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, `Please provide a username`],
      match: [/^[a-zA-Z0-9]+$/, "Please provide a valid username"],
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Please provide an email address"],
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Please provide a password"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.checkPassword = async function (
  userSignInPass,
  userOriginalPass
) {
  return await bcrypt.compare(userSignInPass, userOriginalPass);
};

export const User = mongoose.model("User", userSchema);
