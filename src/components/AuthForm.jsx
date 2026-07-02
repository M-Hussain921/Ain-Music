import {useState} from "react";

export const AuthForm = ({ isLogin, setIsLogin }) => {
  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Data:", form);

    alert(isLogin ? "Login Success (Dummy)" : "Signup Success (Dummy)");
  };

  return (
    <div className="bg-linear-to-b from-brand-dark to-brand-darkest p-8 rounded-xl w-87.5 shadow-lg">
      
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "font-bold text-white" : "text-gray-300"}
        >
          Sign Up
        </button>
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? "font-bold text-white" : "text-gray-300"}
        >
          Login
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="input"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter Your Number"
              className="input"
              onChange={(e) => setForm({ ...form, number: e.target.value })}
            />
          </>
        )}

        <input
          type="email"
          placeholder="Enter Your Email"
          className="input"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <button className="w-full bg-brand-primary py-2 rounded-lg font-semibold hover:bg-brand-dark transition-all text-white ">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <div className="text-center my-4 text-sm text-gray-300">Or</div>

      <button className="w-full border py-2 rounded-lg hover:bg-white/10">
        Sign Up With Google
      </button>
    </div>
  );
};