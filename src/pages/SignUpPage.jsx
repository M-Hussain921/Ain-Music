import { useState } from "react";
import { AuthForm } from "../components/AuthForm.jsx";

export const SignUpPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="mt-12 mx-2.5 flex py-3 text-text-primary">
      <div className="w-1/2 flex flex-col justify-center px-16">
        <h1 className="text-4xl font-bold mb-4">Join Our Platform</h1>
        <p className="text-brand-primary text-lg mb-6">
         You can be one of the <span className="text-text-primary">members</span> of our platform by just adding some necessarily information. if you already have an account on our website, you can just hit the Login button.
        </p>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <AuthForm isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </div>
  );
};
