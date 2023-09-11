import { Inter } from "next/font/google";
import Image from "next/image";
import AuthForm from "./Components/AuthForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px6 lg:px8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="messeger logo"
          height={48}
          width={48}
          src={"/images/logo.png"}
          className="mx-auto w-auto"
        ></Image>
        <h2 className="mt-6 text-center font-bold text-black ">Sign In</h2>
      </div>
      <AuthForm />
    </div>
  );
}
