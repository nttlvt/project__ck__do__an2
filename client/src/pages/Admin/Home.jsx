import Layout from "../../components/Admin/Layout";
import { getUserProfileFromLocalStorage } from "../../utils/auth";

export default function Home() {
  const user = getUserProfileFromLocalStorage();
  return (
    <Layout>
      <div className="flex items-center flex-col">
      <div className="text-blue-900 flex justify-between my-5">
        <h2 className="text-xl">Hello, {user.name}</h2>
      </div>
      <div className="flex">
        <img src="https://bit.ly/imageWelcome" alt="" />
      </div>
      </div>
    </Layout>
  );
}
