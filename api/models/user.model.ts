import mongoose from "mongoose";
import bcrypt, { compare } from "bcryptjs";

export interface UserDoc {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePasswords(candidatePassword: string): Promise<boolean>;
  photoURL: string;
  signedInWithGoogle: boolean;
  signedInWithEmail: boolean;
  role: "admin" | "user";
}

const userSchema = new mongoose.Schema<UserDoc>(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: String,
    signedInWithEmail: Boolean,
    signedInWithGoogle: Boolean,
    role: {
      default: "user",
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    methods: {
      async comparePasswords(candidatePassword: string) {
        return await compare(candidatePassword, this.password);
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }
  user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));

  return next();
});

const User = mongoose.model("User", userSchema);

export default User;
